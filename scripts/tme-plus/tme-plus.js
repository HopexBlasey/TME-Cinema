/*
 * TME+ shell injector for Jellyfin 12 Modern UI.
 *
 * Load this file with a JavaScript Injector after the TME+ stylesheet. It does
 * not create replacement navigation, routes, playback controls, or data. On
 * desktop it re-parents Jellyfin's existing header navigation into the TME+
 * rail; on smaller screens it returns the same controls to their native header.
 */
(() => {
  'use strict';

  const RAIL_ID = 'tme-navigation-rail';
  const DESKTOP_QUERY = '(min-width: 64rem)';
  const root = document.documentElement;
  const desktop = window.matchMedia(DESKTOP_QUERY);
  let rail;
  let mountedNavigation;
  let originalParent;
  let originalNextSibling;
  let queued = false;

  const findModernNavigation = () => document.querySelector(
    'header.MuiAppBar-root > .MuiToolbar-root > .MuiStack-root:first-of-type'
  );

  const ensureRail = () => {
    if (rail?.isConnected) return rail;

    rail = document.getElementById(RAIL_ID);
    if (rail) return rail;

    rail = document.createElement('aside');
    rail.id = RAIL_ID;
    rail.setAttribute('aria-label', 'TME+ navigation');
    rail.innerHTML = [
      '<div class="tme-wordmark" role="img" aria-label="TME+ — Your World. Your Entertainment.">',
      '  <span class="tme-wordmark-name">TME</span><span class="tme-wordmark-plus">+</span>',
      '</div>',
      '<div class="tme-rail-divider" aria-hidden="true"></div>',
      '<nav class="tme-navigation-slot" aria-label="Jellyfin navigation"></nav>'
    ].join('');
    document.body.append(rail);
    return rail;
  };

  const restoreNavigation = () => {
    if (mountedNavigation?.isConnected && originalParent?.isConnected) {
      const anchor = originalNextSibling?.parentNode === originalParent
        ? originalNextSibling
        : null;
      originalParent.insertBefore(mountedNavigation, anchor);
    }

    mountedNavigation = undefined;
    originalParent = undefined;
    originalNextSibling = undefined;
    root.classList.remove('tme-plus-modern-navigation');
  };

  const mountNavigation = () => {
    if (!desktop.matches) {
      restoreNavigation();
      return;
    }

    const navigation = findModernNavigation();
    if (!navigation) return;

    const slot = ensureRail().querySelector('.tme-navigation-slot');
    if (!slot) return;

    if (mountedNavigation !== navigation) {
      restoreNavigation();
      mountedNavigation = navigation;
      originalParent = navigation.parentElement;
      originalNextSibling = navigation.nextSibling;
    }

    if (navigation.parentElement !== slot) slot.append(navigation);
    navigation.classList.add('tme-native-navigation');
    root.classList.add('tme-plus-modern-navigation');
  };

  const reconcile = () => {
    queued = false;
    mountNavigation();
  };

  const scheduleReconcile = () => {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(reconcile);
  };

  const start = () => {
    if (window.__tmePlusInjector) {
      window.__tmePlusInjector.reconcile();
      return;
    }

    window.__tmePlusInjector = { reconcile: scheduleReconcile };
    desktop.addEventListener('change', scheduleReconcile);
    new MutationObserver(scheduleReconcile).observe(document.body, {
      childList: true,
      subtree: true
    });
    scheduleReconcile();
  };

  if (document.body) start();
  else document.addEventListener('DOMContentLoaded', start, { once: true });
})();

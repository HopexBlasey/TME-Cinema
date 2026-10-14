<div align="center">

# TME+ for Jellyfin

**Your World. Your Entertainment.**

TME+ is a premium CSS-first Jellyfin theme with the original **Cinematic
Obsidian** design system: layered graphite surfaces, a restrained violet
accent, compact media chrome, and artwork-led discovery.

Built on the selector architecture of [Abyss for Jellyfin](https://github.com/AumGupta/abyss-jellyfin).

</div>

> [!IMPORTANT]
> TME+ is a visual theme. It does not change Jellyfin server configuration,
> Docker/Unraid setup, authentication, plugins, playback, transcoding, GPU
> mapping, or media data.

## TME+ installation

### Before publishing this branch

This redesign currently lives on `feature/tme-plus-redesign`. Commit and push
the branch, then merge it to the branch you intend to deploy before using a
remote import. Until that happens, use a local Custom CSS import or paste the
contents of `abyss.css`; do not point Jellyfin at the upstream Abyss URL.

### Jellyfin Custom CSS

In **Dashboard > Branding > Custom CSS**, import the entry file from this fork
after the redesign has been published to `main`:

```css
@import url('https://cdn.jsdelivr.net/gh/HopexBlasey/TME-Cinema@main/abyss.css');
```

Set Jellyfin to its Dark theme. TME+ supports both the Jellyfin 12 Modern UI
and the Desktop (Legacy) UI selector layers inherited from Abyss. The original
project lists Jellyfin 12.1.x and 10.11.x as tested upstream; this fork has
**not** yet been visually verified against a running server, so treat those as
compatibility targets rather than a TME+ certification.

### Existing UI enhancements

TME+ includes optional, version-specific visual integrations. Add these below
the base TME+ import only when the matching enhancement is installed:

```css
/* Jellyfin Enhanced v11.3.0.0 */
@import url('https://cdn.jsdelivr.net/gh/HopexBlasey/TME-Cinema@main/styles/abyss-je.css');

/* Media Bar Enhanced v1.9.0.0 */
@import url('https://cdn.jsdelivr.net/gh/HopexBlasey/TME-Cinema@main/styles/abyss-mbe.css');
```

The integration sheets now cover the verified selector vocabulary supplied from
your Jellyfin environment: Media Bar's hero/backdrop, compact mobile, settings,
and progress hooks, plus Jellyfin Enhanced's panel, recommendation, download,
request, and issue-page hooks. They preserve plugin functionality and do not
invent data sources. Plugin updates may rename markup, so re-check the styling
after updating either plugin.

### Modern side rail with JavaScript Injector

For the full TME+ application shell on Jellyfin 12 Modern UI, load the optional
vanilla script below through your existing JavaScript Injector plugin **after**
the TME+ CSS has loaded:

```text
https://raw.githubusercontent.com/HopexBlasey/TME-Cinema/main/scripts/tme-plus/tme-plus.js
```

The injector does not supply new routes, menus, playback controls, or data. On
desktop it places Jellyfin's existing Modern header navigation controls in the
TME+ Obsidian side rail; below `64rem` it returns those same elements to their
native header. This makes the layout substantially different without relying
on guessed Jellyfin URLs or duplicate navigation actions. If the Modern UI
changes its documented MUI structure, disable the script and the standard TME+
CSS theme will continue to work.

### Customization

Place overrides after the imports. TME+ tokens are centralized at the end of
`abyss.css` so a violet, corner, or surface change does not require scattered
selector edits:

```css
:root {
  --tme-violet: 156 118 231;
  --tme-violet-strong: 183 154 255;
  --tme-radius-md: 14px;
  --tme-obsidian: 12 13 18;
}
```

### Updating and rollback

To update, pull the reviewed TME+ revision, verify the CSS import still points
to that revision, and refresh the Jellyfin web client. For a reversible
rollback, remove the TME+ import(s) from Custom CSS and save, or switch the
base import to a previously reviewed commit. No server, database, Docker, or
media changes are needed to undo the theme.

### Known limitations and manual checks

- This checkout has automated CSS and documentation checks but no live Jellyfin
  instance or installed plugin sources. Desktop, tablet, mobile portrait, and
  mobile landscape require visual verification in the target Jellyfin client.
- TME+ includes the supplied Media Bar layout selectors, including
  `#slides-container`, `.homeSectionsContainer`, `media-bar-mobile-16-9`, and
  `media-bar-mobile-4-3`. Their placement still needs verification against your
  installed Media Bar version and device layouts.
- CSS can provide the legacy-shell TME+ wordmark treatment, but it does not
  replace the Modern client's accessible logo asset without the optional
  injector.
- The optional `styles/abyss-lite.css` was inherited from Abyss and has not yet
  been retuned or validated for the TME+ layer.

## Design system

**Cinematic Obsidian** uses an obsidian base, graphite surfaces, soft-white
type, low-opacity neutral borders, and violet reserved for active navigation,
primary actions, progress, selected state, and focus. Cards elevate subtly on
pointer devices, detail pages prioritize backdrop and title hierarchy, and
`prefers-reduced-motion` removes nonessential motion. The theme deliberately
avoids global neon borders, opaque hero panels, and a blur-only visual identity.

## Inherited upstream material

The preview assets, installer scripts, Spotlight material, and legacy sections
below are inherited from Abyss. They describe upstream behavior and imagery,
not a validated TME+ release. In particular, do not use the upstream installer
or its URLs to deploy this fork; follow the TME+ Custom CSS instructions above.

## Demo Video
[![Abyss Demo](docs/assets/images/demo-thumbnail.png)](https://youtu.be/CAjI7qgvJzo)

## Preview

<a href="https://youtu.be/CAjI7qgvJzo">
  <img src="docs/assets/images/preview.png" style="width:100%;"/>
</a>

<details>

<summary><h2>See full preview</h2></summary>

<a href="https://youtu.be/CAjI7qgvJzo">
  <img src="docs/assets/images/preview-full.png" style="width:100%;"/>
</a>

</details>

---

## Features

- **One-click installer**: `abyss-setup-vX.X.X.exe` (Windows) and `abyss-setup-vX.X.X.sh` (Linux) configure your entire Jellyfin instance, CSS, client and dashboard themes, home section order, and Spotlight, all automatically. The theme selectors are intentionally locked to Dark after installation.
- **Jellyfin 12 support**: styles both the Modern React/MUI interface and the Desktop (Legacy) interface using stable component classes and Jellyfin theme variables.
- **Spotlight home banner**: a cinematic banner on your home screen showing your current Continue Watching item, complete with backdrop image, metadata pills (rating, runtime, score), and a resume play button.
- **Frosted glass UI**: header, drawer, dialogs, toasts, and footer all use `backdrop-filter` blur for a layered, depth-rich interface
- **Refined typography**: *Google Sans* throughout, with consistent weight and spacing
- **Smooth transitions and animations**: every interaction uses carefully tuned `cubic-bezier` easing. Home sections animate in with a staggered fade-up entrance on load. The favourite (heart) button has a spring pop animation.
- **Floating sidebar**: pill-shaped drawer with rounded corners and a snappy slide animation
- **Pill tab bar**: active tab highlighted with a filled pill indicator
- **Every element targeted**: styling covers cards, indicators, sliders, checkboxes, form inputs, the media player OSD, now playing bar, chapter thumbnails, search page, cast thumbnails (9 responsive breakpoints), login page, detail pages, metadata manager, and the admin dashboard
- **Responsive**: mobile layout tweaks, ultrawide support, and cast thumbnail scaling across all breakpoints
- **Customisable**: CSS variables let you retheme without touching the rest of the file



## Installation

### Linux & MacOS

Download the latest **`abyss-setup-vX.X.X.sh`** from the [Releases](https://github.com/AumGupta/abyss-jellyfin/releases/latest) page and run it:

```bash
chmod +x abyss-setup-vX.X.X.sh
sudo ./abyss-setup-vX.X.X.sh
```

> [!NOTE]
> Requires `curl` and `python3`, which are available by default on most Linux distributions.

For detailed steps go to the [Setup Guide](SETUP.md).

### Windows

Download the latest **`abyss-setup-vX.X.X.exe`** from the [Releases](https://github.com/AumGupta/abyss-jellyfin/releases/latest) page and run it. The installer will:

- Apply the Abyss CSS to your Jellyfin server automatically
- Set the client and dashboard themes to Dark
- Configure your home screen sections in the correct order
- Install the Spotlight add-on (cinematic home banner)
- Restart Jellyfin when done

For detailed steps go to the [Setup Guide](SETUP.md).


---

> [!NOTE]
> If you are on Windows.
> **Windows SmartScreen may show a warning!** It is completely normal, the setup is 100% safe. Click **More info** then **Run anyway**. This happens because the installer is new and hasn't yet built a download reputation with Microsoft.
>
> <details>
> <summary><em>Why is this safe to run?</em></summary>
>
> <br>
>
> The installer (`abyss-setup.exe`) is automatically compiled from [`setup.ps1`](setup.ps1) via [GitHub Actions](.github/workflows/build-installer.yml) on every release. You can read every line of `setup.ps1` before running, it is plain PowerShell with no obfuscation.
>
> The installer will ask for your Jellyfin **server URL**, **admin username**, and **admin password**. These are sent directly to your own local Jellyfin server using the standard Jellyfin API, the same API your browser uses when you log in. Nothing is sent to any external server. The credentials are used only to authenticate and apply theme settings, and are never stored anywhere.
>
> The build process is fully transparent and auditable, click through to the [Actions log](https://github.com/AumGupta/abyss-jellyfin/actions) to see exactly which commit produced the exe you downloaded.
>
> </details>

### Docker Install

The steps to install Abyss inside a docker container can be found in the detailed [SETUP](SETUP.md) guide.

### Manual Install

The steps to apply Abyss entirely manually can be found in the detailed [SETUP](SETUP.md) guide.

> Quick Preview: 
> ```css
> @import url('https://cdn.jsdelivr.net/gh/AumGupta/abyss-jellyfin@main/abyss.css');
>```
> Copy and Paste in the branding section in your jellyfin dashboard.

> [!NOTE]
> The quick preview import given above is useful only to have a look at how the theme looks, but to actually get the full feel of Abyss, follow all the steps in the SETUP guide.

### Plugin Support

If you use additional plugins, like *Jellyfin Enhanced*, *Media Bar Enhanced*, etc, then you can follow the [Plugin Support](SETUP.md) steps in the SETUP.md guide.

<details>

<summary><h2>Customisation</h2></summary>

Override any of these variables at the top of your **Custom CSS** field, after the `@import` line:

```css
@import url('https://cdn.jsdelivr.net/gh/AumGupta/abyss-jellyfin@main/abyss.css');

:root {
    /* Accent colour: R, G, B only, no rgb() wrapper */
    --abyss-accent: 245, 245, 247;   /* default: near-white */
    /* Same colour, space-separated for Jellyfin 12 / MUI */
    --abyss-accent-channel: 245 245 247;

    /* Corner rounding applied globally */
    --abyss-radius: 24px;            /* default: 24px */

    /* Episode count / indicator pill background */
    --abyss-indicator: 55, 55, 55;   /* default: dark grey */
}
```

### Example accent colours

| Look | Value |
|---|---|
| Default (near-white) | `245, 245, 247` |
| Warm white | `255, 250, 240` |
| Soft blue | `100, 160, 255` |
| Teal | `50, 200, 180` |
| Rose | `255, 100, 120` |

### Lite mode

For lower-power mobile, TV, and embedded clients, import the optional Lite override after the main theme:

```css
@import url('https://cdn.jsdelivr.net/gh/AumGupta/abyss-jellyfin@main/abyss.css');
@import url('https://cdn.jsdelivr.net/gh/AumGupta/abyss-jellyfin@main/styles/abyss-lite.css');
```

Lite mode keeps the same colours, typography, spacing, and component styling while reducing blur, shadows, and entrance motion.

> NOTE:
> 
> You can also change the font by adding a *Google Fonts* (or any other source) `@import` and overriding the `body` font-family after your theme import. For example, to use [Inter](https://fonts.google.com/specimen/Inter):
> ```css
> @import url('https://cdn.jsdelivr.net/gh/AumGupta/abyss-jellyfin@main/abyss.css');
> @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
>
> body {
>     font-family: "Inter", sans-serif;
>     font-optical-sizing: auto;
>     font-style: normal;
>     font-variation-settings: "GRAD" 0;
> }
> ```
> Browse fonts at [fonts.google.com](https://fonts.google.com) and replace `"Inter"` with any family name you pick.

</details>

---

## Compatibility

| Jellyfin version | Status |
|---|---|
| 12.1.x | Tested (Modern and Legacy web UI) |
| 10.11.x | Tested |
| 10.10.x | Should work |
| Earlier | Untested |

> [!NOTE] 
> Jellyfin 12 features a new Material UI (MUI), implemented by *default* via `Settings`>`Display`>`Display Mode`>`Auto`. Since, this is a new interface, changes to Abyss are being constantly made to keep it at par with changes in Jellyfin versions. In case you want to keep the previous look of jellyfin (before versoin 12), they have provide a way to do so by `Settings`>`Display`>`Display Mode`>`Desktop (Legacy)`. Changes will take effect after manually reloading the web client.

> [!IMPORTANT]
> Abyss is built and tested for the **Jellyfin web client** accessed via a desktop browser. The mobile web experience includes layout tweaks but is not the primary focus. The Jellyfin desktop app (Jellyfin Media Player) and TV clients may work but are not specifically targeted and results may vary.

<details>
<summary>Notes</summary>

- The **Jellyfin admin dashboard** (`/dashboard`) is a separate React app and does not load Custom CSS. Abyss styles the main client only (home, libraries, detail pages, player).
- Backdrop blur requires `backdrop-filter` support: Chrome, Edge, Safari, and Firefox 103+.
- The installer selects the Dark base theme for the client and dashboard. Abyss requires Dark to display correctly, so the corresponding theme selectors in both Modern and Legacy web UI are intentionally shown as locked while Dark is active. Selecting another base theme is unsupported.

</details>

## Contributing

Pull requests are welcome. For suggestions, feature requests, or bug reports, open an issue on the [Issues](https://github.com/AumGupta/abyss-jellyfin/issues) page. Please include your Jellyfin version and a screenshot where relevant.

## License

Abyss is licensed under the [MIT License](https://github.com/AumGupta/abyss-jellyfin?tab=MIT-1-ov-file).

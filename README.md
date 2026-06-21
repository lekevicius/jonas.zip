# jonas.zip

Small Astro site for a personal profile/link page. Page content comes from `data.json`; the build outputs a static site to `dist/`.

You can totally fork this to build your own. Shouldn't take more than a couple of minutes.

## Update Content

Edit `data.json`.

Top-level values:

- `url`: canonical site URL used in metadata.
- `title`: display name and page title - probably your name!
- `description`: short bio shown under the name and used for share text.
- `image`: profile image URL, 160x160 is a good size.
- `fields`: optional small profile facts. Current supported values are `occupation` and `location`.
- `theme.color`: brand color for light mode.
- `theme.colorDark`: brand color for dark mode.
- `theme.favicon`: favicon image URL.
- `theme.shareImage`: social preview image URL.
- `theme.headerDecoration`: show or hide the angled header background.
- `theme.monogramElement`: inline SVG shown next to the title, don't set width/height in the inline SVG.
- `build.trackingScript`: optional raw tracking script injected into the page head.
- `blocks`: ordered page sections.

Block values:

- `service-links`: a row of social/contact icons. Services usually use `username`; `email` uses `email`; `signal`, `mastodon`, and `discord` use a full `link`.
- `newsletter`: signup form with `action`, `title`, and `description`.
- `link`: a link card with `url`, optional `title`, optional `description`, and either `image` or `icon`.

Supported service/icon names:

`bluesky`, `discord`, `dribbble`, `email`, `facebook`, `github`, `instagram`, `letterboxd`, `linkedin`, `mastodon`, `medium`, `messenger`, `pinterest`, `reddit`, `signal`, `speakerdeck`, `substack`, `telegram`, `threads`, `tiktok`, `twitch`, `twitter`, `x`, `youtube`.

## Alternate Data

`data.json` is the default. Build with another JSON file when needed:

```sh
pnpm build -- --site-data=data-simple.json
```

The same picker also accepts `--data=...` or `SITE_DATA=...`.

## Build

Install dependencies:

```sh
pnpm install
```

Run locally:

```sh
pnpm dev
```

Build production files:

```sh
pnpm build
```

Preview the built site:

```sh
pnpm preview
```

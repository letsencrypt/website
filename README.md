# Let's Encrypt Website

This is the repository for the main [Let's Encrypt website].

This site is built with [Hugo]. It's entirely static, no server-side code/scripting.

To see your changes, [install Hugo Extended], then run it with:

```sh
hugo server -F
```

And open [http://localhost:1313/] in your browser. Note that the `-F` flag will
show items to be published in the future (like blog posts with dates in the
future).

If you update javascript, css or layouts, you can run tests with:

```sh
npm install && npm run build && npm test
```

Contributions welcome.

# Troubleshooting with Hugo

If you see the error:

> Failed to load translations in file "en.toml": unsupported file extension .toml

Your version of Hugo is probably too old. Please use the version specified in [netlify.toml]

# Translations - internationalization (i18n)

To help with translation, please see [TRANSLATION.md].

[Let's Encrypt website]: https://letsencrypt.org/
[Hugo]: https://gohugo.io/
[install Hugo Extended]: https://gohugo.io/getting-started/installing
[http://localhost:1313/]: http://localhost:1313/
[TRANSLATION.md]: https://github.com/letsencrypt/website/blob/main/TRANSLATION.md
[netlify.toml]: https://github.com/letsencrypt/website/blob/main/netlify.toml

# Creating new pages

When creating new pages you'll need to add a translation stub for each language.
You can use the `new-page.sh` script to create these automatically:

```sh
Usage: ./new-page.sh <page-path> <page title>
Examples:
./new-page.sh my-page "My Page Title"
./new-page.sh post/my-post "My Post Title"
```

```sh
$ ./new-page.sh docs/new-page "My New Page"
Created page: ./content/vi/docs/new-page.md
Created page: ./content/sv/docs/new-page.md
Created page: ./content/he/docs/new-page.md
Created page: ./content/ja/docs/new-page.md
Created page: ./content/base-l10n/docs/new-page.md
Created page: ./content/it/docs/new-page.md
Created page: ./content/ru/docs/new-page.md
Created page: ./content/zh-cn/docs/new-page.md
Created page: ./content/uk/docs/new-page.md
Created page: ./content/sr/docs/new-page.md
Created page: ./content/zh-tw/docs/new-page.md
Created page: ./content/pt-br/docs/new-page.md
Created page: ./content/de/docs/new-page.md
Created page: ./content/ko/docs/new-page.md
Created page: ./content/id/docs/new-page.md
Created page: ./content/fr/docs/new-page.md
Created page: ./content/es/docs/new-page.md
Created page: ./content/en/docs/new-page.md
```

## Site banner

`layouts/partials/site-banner.html` shows a dismissible banner below the navigation on English pages. All of its settings go in the site config under `[params]`:

```toml
site_banner_enabled = true
site_banner_text = "Message"
site_banner_href = "https://example.org/"  # optional link
site_banner_label = "Button text"          # optional; without it the message is the link
```

For messages with dates, add `[[params.site_banner_schedule]]` entries with `start`, `end` and `text`, plus optional `href`, `label` and `id`. Times are ISO 8601 with an offset; an entry without `href` or `label` uses the ones above. While a scheduled message is active, it replaces the simple banner. Colors are in `static/site-banner/theme.css`. Closing the banner is remembered in the browser's `localStorage` (no cookies).

On Netlify previews and local builds, `?banner-time=<ISO 8601 time>` (for example `?banner-time=2026-12-01T18:00:00Z`) or `?banner=<id>` previews the schedule. The live site ignores both.

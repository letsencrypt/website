GET Ready to Encrypt Website
=====================

This is the repository for the main [Let's Encrypt website].

This site is built with [Hugo]. It is entirely static and  no server-side code/scripting is written.

To see your changes, [install Hugo Extended], then run it with:

```sh
hugo server -F
```

And open [http://localhost:1313/] in your browser. Note that the `-F` flag will
show items to be published in the future (like blog posts with dates in the
future).

If you update javascript, css or layouts, you can run tests with the help of these commands:-

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
[TRANSLATION.md]: https://github.com/letsencrypt/website/blob/master/TRANSLATION.md
[netlify.toml]: https://github.com/letsencrypt/website/blob/master/netlify.toml

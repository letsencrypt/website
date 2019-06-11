Let's Encrypt Website
=====================

This is the repository for the main [Let's Encrypt website].

This site is built with [Hugo]. It's entirely static, no server-side code/scripting.

To see your changes, [install Hugo], then run it with:

```sh
hugo server -F
```

And open [http://localhost:1313/] in your browser. Note that the `-F` flag will
show items to be published in the future (like blog posts with dates in the
future).

Contributions welcome.

# Troubleshooting with Hugo

If you see the error:

> Failed to load translations in file "en.toml": unsupported file extension .toml

Your version of Hugo is probably too old.

# Translations - internationalization (i18n)

To help with translation, please see [TRANSLATION.md].

[Let's Encrypt website]: https://letsencrypt.org/
[Hugo]: https://gohugo.io/
[install Hugo]: https://gohugo.io/getting-started/installing
[http://localhost:1313/]: http://localhost:1313/
[TRANSLATION.md]: https://github.com/letsencrypt/website/blob/master/TRANSLATION.md


Let's Encrypt Website
=====================

This is the repository for the main [Let's Encrypt website](https://letsencrypt.org/).

This site is built with [Hugo](https://gohugo.io/). It's entirely static, no server-side code/scripting.

To see your changes, [install
Hugo](https://gohugo.io/getting-started/installing), then run it with:

```
hugo server -F
```

And open <a href="http://localhost:1313/">http://localhost:1313/</a> in your
browser. Note that the -F flag will show items to be published in the future
(like blog posts with dates in the future).

Contributions welcome.

# Troubleshooting with hugo

If you see the error:

> Failed to load translations in file "en.toml": unsupported file extension .toml

Your version of hugo is probably too old

# Translations - internationalization (i18n)

To help with translation, please see [TRANSLATION.md](https://github.com/letsencrypt/website/blob/master/TRANSLATION.md)

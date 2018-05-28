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

## How to add a new language

1. In `config.toml`, copy the commented section, replace XX in [[languages.XX.*]] by your language code and translate the strings
2. In `i18n\` copy `en.toml` into `XX.toml` (where XX is your language code) and translate the strings
3. In `content\XX\` (where XX is your language code), you can add your translations of `content\en\`

* The subscriber agreement should **not** be translated 
* The privacy policy (`privacy.md`) may be translated, but with a note on top saying that the English version is canonical.
* Paths should stay in English: `/en/about` becomes `/XX/about` in every languages.
* When a file is not translated, it will not appear in the menu.
* sponsors.html, client-options.md and cert-compat.md are not ready to be translated

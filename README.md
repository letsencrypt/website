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
4.  `content\XX\about.md` (`about/`), `content\XX\howitworks.md` (`getting-started/`), `content\XX\donate.html` (`donate/`) and `content\XX\sponsors.html` (`sponsors/`) must be translated and included in the first pull-request
5. Docs index (`/content/en/docs/_index.md`) should be included, at least to point users to the English documentation.
6. After the first pull-request, more files from `content\XX\` may be translated

* The pull-request of a translated file must update links on other files pointing to it.
* The subscriber agreement should **not** be translated 
* The *privacy policy* (`privacy.md`) and the *Non-Discrimination Statement and Policy* (`nondiscrimination.md`) may be translated, but with a note on top saying that the English version is canonical.
* Paths should stay in English: `/en/about` becomes `/XX/about` in every languages.
* When a file is not translated, it will not appear in the menu.
* client-options.md and cert-compat.md are not ready to be translated
* Blog posts (`content\XX\post\`) and docs (`content\XX\docs\`) are not ready to be translated
* Images are not ready to be translated ([#314](https://github.com/letsencrypt/website/issues/314))
* Graphs content are not ready to be translated ([#344](https://github.com/letsencrypt/website/issues/344))

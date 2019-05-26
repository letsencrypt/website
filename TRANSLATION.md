
# Translations - internationalization (i18n)

## How to add a new language

1. In `config.toml`, copy the commented section, replace XX in [[languages.XX.*]] with your language code and translate the strings.
2. In `i18n\` copy `en.toml` into `XX.toml` (where XX is your language code) and translate the strings.
3. In `content\XX\` (where XX is your language code), you can add your translations of `content\en\`.
4. `content\XX\about.md` (`about/`), `content\XX\howitworks.md` (`getting-started/`), `content\XX\donate.html` (`donate/`) and `content\XX\sponsors.html` (`sponsors/`) must be translated and included in the first pull-request.
5. Docs index (`/content/en/docs/_index.md`) should be included, at least to point users to the English documentation.
6. After the first pull-request, more files from `content\XX\` may be translated.

* The pull-request of a translated file must update links on other files pointing to it.
* The *subscriber agreement* should **not** be translated.
* The *privacy policy* (`privacy.md`) and the *Non-Discrimination Statement and Policy* (`nondiscrimination.md`) may be translated, but with a note on top saying that the English version is canonical.
* `jobs.md` should either not be present or just contain a link to the english version.
* Paths should stay in English: `/about` becomes `/XX/about` in every language.
* When a file is not translated, it will not appear in the menu.
* `cert-compat.md` and `repository.md` are not ready to be translated.
* Blog posts (`content\XX\post\`) are not ready to be translated.
* Images are not ready to be translated ([#314](https://github.com/letsencrypt/website/issues/314)).
* Graphs content is not ready to be translated ([#344](https://github.com/letsencrypt/website/issues/344)).
* The "aliases:" field in the Hugo header should not be copied. This leads to
  inconsistent redirects.


# Localization - internationalization (l10n/i18n)

## Don't duplicate work!

Check [existing translation pull-requests](https://github.com/letsencrypt/website/pulls?q=is%3Apr+is%3Aopen+label%3Atranslation) to see if someone else is already working on it.

## How to add a new language

### First pull-request

1. In `config\_default\`, copy `config\_default\languages.en.toml` into `config\_default\languages.XX.toml` (where XX is your language code) and update it following indications given in comments (lines starting with `#`)
2. In `config\_default\`, copy `config\_default\menu.en.toml` into `config\_default\menu.XX.toml` (where XX is your language code), translate `name =` and prefix urls with `/XX/`.
3. In `i18n\` copy `en.toml` into `XX.toml` (where XX is your language code) and translate the strings.
4. Add your language in `netlify.toml` and `layouts\_partial\langs.html`.
5. Copy `content\base-l10n\` into `content\XX\` (where XX is your language code)

### After the first pull-request

You can start translating the files that are inside `content\XX\`:

* Copy the English version of the file you wish to translate into `content\XX\`
* If the header of the file contains "`aliases:`", **you must remove the line with "`aliases:`"**
* Do **not** change `date` or `lastmod` : they must correspond to the the English version (and not when the translation occured: it's used to detect when a translation is out-of-sync)
* If your translation takes time, please open early a draft pull-request so others know you are working on it

You can check the translation status using https://letsencrypt.org/i18n/

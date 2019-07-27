
# Localization - internationalization (l10n/i18n)

## How to add a new language

### First pull-request

1. In `config.toml`, copy the English section (`[languages.en]`,`[languages.en.*]`), and replace `en` with your language code and translate the strings.
2. In `i18n\` copy `en.toml` into `XX.toml` (where XX is your language code) and translate the strings.
3. In `layouts\_default\single.html` copy the `{{ if eq .Language.Lang "fr" }}...{{ end }}` and replace `"fr"` by `"XX"` (where XX is your language code) and "Voir en Français" by the translation of "See in [your language]"
4. Copy `content\base-l10n\` into `content\XX\` (where XX is your language code)

### After the first pull-request

You can start translating the files that are inside `content\XX\`:

* Copy the English version of the file you wish to translate into `content\XX\`
* If the header of the file contains "`aliases:`", **you must remove the line with "`aliases:`"**
* Do **not** change `date` or `lastmod` : they must correspond to the the English version (and not when the translation occured: it's used to detect when a translation is out-of-sync)

You can check the translation status using https://letsencrypt.org/i18n/

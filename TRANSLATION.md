
# Localization - internationalization (l10n/i18n)

## Don't duplicate work!

Check [existing translation pull-requests](https://github.com/letsencrypt/website/pulls?q=is%3Apr+is%3Aopen+label%3Atranslation) to see if someone else is already working on it.

## Translate new pages, update or improve translation

You can help with the translation work on https://crowdin.com/project/lets-encrypt-website

How to use Crowdin: https://support.crowdin.com/online-editor/

## How to add a new language

If you are interested to add a new language, please open an issue with the information requested in:
- `languageName`, `languageCode`, `beforeColon`, `description` and `numberFormat` in https://github.com/letsencrypt/website/blob/master/config/_default/languages.en.toml
- `name` entries in https://github.com/letsencrypt/website/blob/master/config/_default/menu.en.toml


Someone from Let's Encrypt will add the language to Crowdin so you can start translating on https://crowdin.com/project/lets-encrypt-website

The first files that needs to be translated on Crowdin are:
- `en.toml`
- `content/about.md`
- `content/getting-started.md`

It's also preferable to translated first:
- `content/client-options.md`
- `content/how-it-works.md`
- `content/faq.md`

When enough pages are translated on Crowdin, someone from Let's Encrypt will create the first pull request:

### First pull-request

1. In `config\_default\`, copy `config\_default\languages.en.toml` into `config\_default\languages.XX.toml` (where XX is your language code) and update it following indications given in comments (lines starting with `#`)
2. In `config\_default\`, copy `config\_default\menu.en.toml` into `config\_default\menu.XX.toml` (where XX is your language code), translate `name =` and prefix urls with `/XX/`.
3. In `i18n\` copy `en.toml` into `XX.toml` (where XX is your language code) and translate the strings.
4. Add your language in `netlify.toml` and `layouts\_partial\langs.html`.
5. Copy `content\base-l10n\` into `content\XX\` (where XX is your language code)

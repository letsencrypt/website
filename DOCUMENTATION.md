
# Pages parameters


The code handling these parameters is in `layouts/_default/single.html`

## `untranslated: 1`

When the website is built, a page with this parameter will:
- Have its content replaced by the English version
- Links pointing to English pages that can be translated will be rewritten to points to the translation instead
- The top of the page will have a message to encourage new translators


## `do_not_translate: 1`

A page with this attribute will still have one version per language.

That attribute has two functions:
- It informs translators that this page should not be translated
- The top of the page will **NOT** have a message to encourage new translators

## `english_is_canonical: 1`

A translation with this attribute will display a warning on the top to indicate that the English version is canonical.

## `date` and `lastmod`

Most pages displays the `lastmod` (or `date`) on the top. But the most important usage is to help synchronize translations: the `lastmod` of a translation must be equal to the `lastmod` of the translated page. So when a page is updated and need it's translations to be also updated, updating the `lastmod` helps to detect that automatically (on https://letsencrypt.org/i18n)

Also, if the `lastmod` of the translation differs from the `lastmod` of the English version, a message will appear on the top of the translated page, to inform the user that the English version is newer (with a link to see it)

# Translations

## Dates

The `lastmod` is localized using javascript (see `i18n.js`)

## How to inform visitors about the translations

On the top of each English pages with translations (pages really translated, not with the `untranslated` attribute), for each languages a messages says "See this page in XXX". The javascript (`i18n.js`) only displays the languages relevant for the visitor (see `layouts/_default/single.html`).

# Glossary

`glossary.js` adds titles on links between terms.

`shortcodes/def.html` contains the documentation

# Plotly

`shortcodes/plotly.html` contains the code and an html tag with the necessary translations (There is no other way to access Hugo translation from the javascript).

Translations of plotly functions are in `static/js/plotly-locale-XX.js`, uploaded from https://github.com/plotly/plotly.js/tree/master/dist (some languages have only partial translations)

# Hugo errors

To detect some errors, the code does a few checks, and when it fails, to trigger a build fail and detect invalid pull-requests, it calls an nonexistent function, with a meaningful name (calling a nonexistent function in Hugo breaks the build). Example: `Translations_must_not_have_aliases` in `shortcodes/i18n_status.html`

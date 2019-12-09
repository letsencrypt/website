
# {{ i18n "overview" }}

* {{ template "link" (dict "context" . "page" "/getting-started") }}
* {{ template "link" (dict "context" . "page" "/how-it-works") }}
* {{ template "link" (dict "context" . "page" "/docs/faq") }}
* {{ template "link" (dict "context" . "page" "/docs/glossary") }}

# {{ i18n "subscriber_information" }}

* {{ template "link" (dict "context" . "page" "/docs/client-options") }}
* {{ template "link" (dict "context" . "page" "/docs/rate-limits") }}
* {{ template "link" (dict "context" . "page" "/docs/expiration-emails") }}

# {{ i18n "advanced_subscriber_information" }}

* {{ template "link" (dict "context" . "page" "/docs/staging-environment") }}
* {{ template "link" (dict "context" . "page" "/docs/cert-compat") }}
* {{ template "link" (dict "context" . "page" "/certificates") }}
* {{ template "link" (dict "context" . "page" "/upcoming-features") }}
* {{ template "link" (dict "context" . "page" "/docs/revoking") }}
* {{ template "link" (dict "context" . "page" "/docs/caa") }}
* {{ template "link" (dict "context" . "page" "/docs/certificates-for-localhost") }}
* {{ template "link" (dict "context" . "page" "/docs/allow-port-80") }}
* {{ template "link" (dict "context" . "page" "/docs/challenge-types") }}
* {{ template "link" (dict "context" . "page" "/docs/ct-logs") }}
* {{ template "link" (dict "context" . "page" "/docs/godaddy") }}
* [{{ i18n "onboarding_customers" }}](/2019/10/09/onboarding-your-customers-with-lets-encrypt-and-acme)

# {{ i18n "client_developer_information" }}

* {{ template "link" (dict "context" . "page" "/docs/integration-guide") }}
* {{ template "link" (dict "context" . "page" "/docs/acme-protocol-updates") }}
* [{{ i18n "acme_divergences_rfc" }}](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md)
* {{ template "link" (dict "context" . "page" "/docs/account-id") }}

{{- define "link" -}}
{{- $page := .context.Site.GetPage .page }}
{{- if or (not $page) (not $page.RelPermalink) }}{{ errorf "Missing page %q in lang %q" .page .context.Page.Lang }}{{ end }}
{{- $tmp := newScratch }}
{{- if .title }}
{{- $tmp.Set "title" .title }}
{{- else if $page.LinkTitle }}
{{- $tmp.Set "title" $page.LinkTitle }}
{{- else if $page.Title }}
{{- $tmp.Set "title" $page.Title }}
{{- else }}{{/* search the English name of an untranslated page */}}
    {{- range first 1 (where $page.Translations "Lang" "eq" "en") }}
        {{- if .LinkTitle}}
            {{- $tmp.Set "title" .LinkTitle }}
        {{- else }}
            {{- $tmp.Set "title" .Title }}
        {{- end }}
    {{- end }}
{{- end }}
[{{$tmp.Get "title"}}]({{ $page.RelPermalink }})
{{- end }}

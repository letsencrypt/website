---
title: Připravované funkce
slug: upcoming-features
lastmod: 2026-02-11
show_lastmod: 1
---

Oznámení o nadcházejících změnách najdete [v mailing listu Technické aktualizace](https://letsencrypt.org/opt-in/) nebo v kategorii [Oznámení API](https://community.letsencrypt.org/c/api-announcements/18) na komunitním fóru Let's Encrypt.

# Připravované funkce

## Odstranění EKU ověřování klienta TLS

11. února 2026 <a href=„https://letsencrypt.org/2025/05/14/ending-tls-client-authentication/“>jsme odstranili z našeho výchozího profilu certifikátu rozšířené použití klíče (EKU) „TLS Client Authentication“</a>. Jako dočasné provizorní řešení pro klienty, kteří potřebují více času na migraci, máme k dispozici profil [tlsclient](https://letsencrypt.org/docs/profiles/#tlsclient), který bude platný do 13. května 2026.

## Zkrácení platnosti certifikátů na 45 dní

Abychom vyhověli změnám základních požadavků CA/Browser Forum,[zkrácujeme platnost certifikátů na 45 dní](https://letsencrypt.org/2025/12/02/from-90-to-45). Nejprve se sníží na 64 dní 10. února 2027 a poté na 45 dní 16. února 2028. Zkracujeme také dobu opakovaného použití autorizace na 10 dní, poté na 7 hodin.

# Dokončené funkce

## Vypnutí e-mailů o vypršení platnosti

4. června 2025 jsme [vypnuli naši službu upozornění na vypršení platnosti e-mailů](https://letsencrypt.org/2025/01/22/ending-expiration-emails/) a odstranili všechny e-mailové adresy spojené s účty ACME z naší produkční databáze.

## Odstranění OCSP adres

Spuštěno: [7. května 2025](https://letsencrypt.org/2024/12/05/ending-ocsp/).

Naše certifikáty již neobsahují adresu URL protokolu OCSP (Online Certificate Status Protocol) pro přístup k informacím o certifikační autoritě (AIA). Místo toho obsahují adresu URL distribučního bodu seznamu odvolaných certifikátů (CRLDP). Spoléhající se strany mohou získat informace o stavu odvolání prostřednictvím seznamů CRL a klienti ACME mohou získat informace o obnovení prostřednictvím ARI (viz níže).

## Profily ACME

Spuštěno: [9. ledna 2025](https://letsencrypt.org/2025/01/09/acme-profiles/).

Klienti, kteří podporují rozšíření [profily ACME](https://www.ietf.org/archive/id/draft-aaron-acme-profiles-01.html), mohou nyní požádat, aby jejich certifikát odpovídal [některému z našich podporovaných profilů](https://letsencrypt.org/docs/profiles/).

## Statické CT logy

Spuštěno: [14. března 2024](https://letsencrypt.org/2024/03/14/introducing-sunlight/)

Nyní provozujeme protokoly Certificate Transparency (CT), které odpovídají nové specifikaci [Static CT API Spec](https://c2sp.org/static-ct-api), se softwarem [Sunlight](https://github.com/FiloSottile/sunlight). Tyto záznamy lze nyní použít ke splnění požadavků prohlížeče na CT. [Dokumentace záznamů CT](https://letsencrypt.org/docs/ct-logs/) obsahuje seznam našich aktuálních záznamů.

## Informace o obnově ACME (ARI)

Spuštěno: [23. března 2023](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari/).

Nyní poskytujeme doporučené termíny pro obnovení všech vydaných certifikátů, které mohou klienti vyhledat pomocí [rozšíření ACME ARI](https://www.rfc-editor.org/rfc/rfc9773.html).

## Krátkodobé certifikáty

Klient může [požádat o „krátkodobý“ (shortlived) certifikát](https://letsencrypt.org/2025/02/20/first-short-lived-cert-issued/) pomocí profilů ACME. Tyto certifikáty jsou platné po tak krátkou dobu, že není vůbec nutné, aby obsahovaly informace o zrušení.

## Certifikáty IP adresy

Krátkodobé certifikáty (viz výše) mohou požadovat, aby certifikát [obsahoval IP adresy](https://letsencrypt.org/2025/02/20/first-short-lived-cert-issued/) ve svých alternativních názvech subjektu (SAN). Tyto adresy budou [ověřovány podobným způsobem jako dnes DNS jména](https://www.rfc-editor.org/rfc/rfc8738.html).


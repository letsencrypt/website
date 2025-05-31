---
title: Připravované funkce
slug: upcoming-features
lastmod: 2025-05-13
show_lastmod: 1
---

Oznámení o nadcházejících změnách najdete [v mailing listu Technické aktualizace](https://letsencrypt.org/opt-in/) nebo v kategorii [Oznámení API](https://community.letsencrypt.org/c/api-announcements/18) na komunitním fóru Let's Encrypt.

# Připravované funkce

## Vypnutí e-mailů o vypršení platnosti

Dne 4. června 2025 máme v úmyslu [vypnout naši službu e-mailových oznámení o vypršení platnosti](https://letsencrypt.org/2025/01/22/ending-expiration-emails/) a odstranit všechny e-mailové adresy spojené s účty ACME z naší produkční databáze.

## Krátkodobé certifikáty

Kolem konce roku 2025 hodláme umožnit všem klientům, kteří podporují profily ACME (viz níže), [požádat o „krátkodobý“ certifikát](https://letsencrypt.org/2025/02/20/first-short-lived-cert-issued/). Tyto certifikáty jsou platné po tak krátkou dobu, že není nutné, aby obsahovaly informace o zrušení (například OCSP, viz níže).

## Certifikáty IP adresy

Kolem konce roku 2025 hodláme umožnit všem klientům, kteří požádají o krátkodobý certifikát (viz výše), aby mohli také požádat o to, aby certifikát [obsahoval IP adresy](https://letsencrypt.org/2025/02/20/first-short-lived-cert-issued/) v alternativních názvech subjektu. Tyto adresy budou [ověřovány podobným způsobem jako dnes DNS jména](https://www.rfc-editor.org/rfc/rfc8738.html).

## Odstranění EKU ověřování klienta TLS

11. února 2026 hodláme <a href=„https://letsencrypt.org/2025/05/14/ending-tls-client-authentication/“>odstranit z našeho výchozího profilu certifikátu rozšířené použití klíče (EKU) „TLS Client Authentication“</a>. Před tímto datem nabídneme alternativní profil, který bude stále obsahovat tuto jednotku EKU, ale upozorňujeme, že se bude jednat o dočasné provizorium pro klienty, kteří potřebují více času na migraci, aby ji nepotřebovali: tento alternativní profil zanikne 13. května 2026.

# Dokončené funkce

## Odstranění OCSP adres

Spuštěno: [7. května 2025](https://letsencrypt.org/2024/12/05/ending-ocsp/).

Naše certifikáty již neobsahují adresu URL protokolu OCSP (Online Certificate Status Protocol) pro přístup k informacím o certifikační autoritě (AIA). Místo toho obsahují adresu URL distribučního bodu seznamu odvolaných certifikátů (CRLDP). Spoléhající se strany mohou získat informace o stavu odvolání prostřednictvím seznamů CRL a klienti ACME mohou získat informace o obnovení prostřednictvím ARI (viz níže).

## Profily ACME

Spuštěno: [9. ledna 2025](https://letsencrypt.org/2025/01/09/acme-profiles/).

Klienti, kteří podporují rozšíření [profily ACME](https://www.ietf.org/archive/id/draft-aaron-acme-profiles-01.html), mohou nyní požádat, aby jejich certifikát odpovídal [některému z našich podporovaných profilů](https://letsencrypt.org/docs/profiles/).

## Statické CT logy

Spuštěno: [14. března 2024](https://letsencrypt.org/2024/03/14/introducing-sunlight/)

Nyní provozujeme protokoly Certificate Transparency (CT), které odpovídají nové specifikaci [Static CT API Spec](https://c2sp.org/static-ct-api), se softwarem [Sunlight](https://github.com/FiloSottile/sunlight). Vzhledem k tomu, že různé programy CT protokolů aktualizovaly své zásady tak, aby tento nový druh protokolů přijímaly, hodláme brzy předložit naše protokoly k zařazení do těchto programů.

## Informace o obnově ACME (ARI)

Spuštěno: [23. března 2023](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari/).

Nyní poskytujeme doporučené termíny pro obnovení všech vydaných certifikátů, které mohou klienti vyhledat pomocí rozšíření [ACME ARI](https://www.ietf.org/archive/id/draft-ietf-acme-ari-08.html).

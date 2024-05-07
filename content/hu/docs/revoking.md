---
title: Tanúsítványok visszavonása
slug: revoking
date: 2017-06-08
lastmod: 2021-08-03
show_lastmod: 1
---


Ha egy tanúsítványhoz tartozó privát kulcs már nem biztonságos, akkor a tanúsítványt vissza kell vonni. Ennek több oka is lehet. Például előfordulhat, hogy véletlenül megosztja a privát kulcsot egy nyilvános weboldalon; a hackerek lemásolhatják a privát kulcsot a szervereiről; vagy a hackerek ideiglenesen átvehetik az irányítást a szerverei vagy a DNS-konfiguráció felett, és ezt felhasználhatják egy olyan tanúsítvány érvényesítésére és kiadására, amelyhez ők rendelkeznek a privát kulccsal.

Amikor Ön visszavonja a Let's Encrypt tanúsítványt, a Let's Encrypt közzéteszi a visszavonási információt az [Online Certificate Status Protocol (OCSP)](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol) protokollon keresztül, egyes böngészők pedig ellenőrzik az OCSP-t, hogy megállapítsák, meg kell-e bízniuk a tanúsítványban. Vegye figyelembe, hogy az OCSP-nek [van néhány alapvető problémája](https://www.imperialviolet.org/2011/03/18/revocation.html), ezért nem minden böngésző végzi el ezt az ellenőrzést. Ennek ellenére a veszélyeztetett privát kulcsokhoz tartozó tanúsítványok visszavonása fontos gyakorlat, és a Let's Encrypt [előfizetői megállapodása](/repository) előírja.

A tanúsítvány visszavonásához a Let's Encrypt segítségével használja a [ACME API](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md)-t, egy ACME kliensen keresztül, mint amilyen például [Certbot](https://certbot.eff.org/). Bizonyítania szükséges a Let's Encrypt számára, hogy jogosult a tanúsítvány visszavonására. Ennek háromféle módja van:

# A tanúsítványt kiállító fiókból

Ha eredetileg Ön állította ki a tanúsítványt, és még mindig Ön rendelkezik a tanúsítvány kiállításához használt fiók felett, akkor a fiók hitelesítő adatainak használatával visszavonhatja azt. A Certbot alapértelmezés szerint megkísérli ezt. Például:

```bash
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem --reason keycompromise
```

# A tanúsítvány privát kulcsának használatával

Ha eredetileg nem Ön állította ki a tanúsítványt, de rendelkezik a megfelelő privát kulcs másolatával, akkor a visszavonási kérelem aláírásához ezt a privát kulcsot használva visszavonhatja a tanúsítványt. Például, ha azt látja, hogy egy privát kulcsot véletlenül nyilvánosságra hoztak, ezzel a módszerrel visszavonhatja az adott privát kulcsot használó tanúsítványokat, még akkor is, ha nem Ön az a személy, aki eredetileg kiállította ezeket a tanúsítványokat.

A módszer használatához először le kell töltenie a visszavonandó tanúsítványt. A Let's Encrypt minden tanúsítványt naplóz a [Certificate Transparency](https://www.certificate-transparency.org/) naplókba, így a tanúsítványok megtalálhatók és letölthetők egy olyan naplófigyelőből, mint a [crt.sh](https://crt.sh/).

Szüksége lesz a privát kulcs egy PEM formátumú másolatára is. Ha ezek megvannak, a következőképpen vonhatja vissza a tanúsítványt:

```bash
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/key.pem --reason keycompromise
```

# Másik engedélyezett fiók használatával

Ha valaki tanúsítványt állított ki, miután veszélyeztette a tárhelyét vagy a DNS-ét, akkor a tanúsítványt vissza kell vonnia, amint visszanyerte a tárhely vagy DNS fölötti rendelkezését. A tanúsítvány visszavonásához a Let's Encryptnek biztosítania kell, hogy a tanúsítványban szereplő domain nevek felett Ön rendelkezik (különben az emberek engedély nélkül visszavonhatják egymás tanúsítványait)! Az Ön domain feletti rendelkezésének validálásához a Let's Encrypt ugyanazokat a módszereket használja, mint amit a tanúsítvány kibocsátásakor használ: elhelyezhet egy [értéket egy DNS TXT rekordban](https://tools.ietf.org/html/rfc8555#section-8.4) vagy egy [fájlt egy HTTP-szerveren](https://tools.ietf.org/html/rfc8555#section-8.3). Általában az ACME kliens kezeli ezeket az Ön számára. Vegye figyelembe, hogy a legtöbb ACME kliens kombinálja az validálást és a kiadást, így a validálás kérésének egyetlen módja a kiadási kísérlet. Ezután visszavonhatja a kapott tanúsítványt, ha nincs rá szüksége, vagy egyszerűen megsemmisítheti a privát kulcsot. Ha egyáltalán nem szeretne tanúsítványt kiállítani, akkor a parancssorban megadhat egy nem létező domain nevet, ami a tanúsítvány kiállításának sikertelenségét eredményezi, miközben a többi, létező domain nevet továbbra is validálja. Ehhez futtassa a következőt:

```bash
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```

Kövesse az utasításokat. Ha a DNS helyett inkább a HTTP-t szeretné használni a validáláshoz, akkor a `--preferred-challenges` flaget helyettesítse `--preferred-challenges=http` flaggel.

Miután validálta a visszavonni kívánt tanúsítványban szereplő összes domain név ellenőrzését, letöltheti a tanúsítványt a [crt.sh](https://crt.sh/) segítségével, majd folytassa a tanúsítvány visszavonását, mintha Ön állította volna ki:

```bash
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem --reason keycompromise
```

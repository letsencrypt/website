---
title: GYIK
linkTitle: Gyakran Ismételt Kérdések (GYIK)
slug: faq
lastmod: 2020-04-23
menu:
  main:
    weight: 30
    parent: about
show_lastmod: 1
---


Ez a GYIK a következő részekre tagolódik:

* [Általános kérdések](#general)
* [Technikai kérdések](#technical)

# <a id="general">Általános kérdések</a>

## Milyen szolgáltatásokat kínál a Let's Encrypt?

A Let's Encrypt egy globális tanúsító hatóság (CA). Az SSL/TLS tanúsítványok beszerzését, megújítását és kezelését világszerte lehetővé tesszük az emberek és szervezetek számára. Tanúsítványainkat webhelyek használhatják a biztonságos HTTPS-kapcsolatok engedélyezéséhez.

A Let's Encrypt Domain Validation (DV) tanúsítványokat kínál. Organization Validation-t (OV) vagy Extended Validation-t (EV) elsősorban azért nem kínálunk, mert nem tudjuk automatizálni az ilyen típusú tanúsítványok kiállítását.

A Let's Encrypt használatának megkezdéséhez látogasson el a [Getting Started](/getting-started) oldalra.

## Mennyibe kerül a Let's Encrypt használata? Valóban ingyenes?

Tanúsítványainkért nem számítunk fel díjat. A Let's Encrypt egy nonprofit szervezet, amelynek küldetése egy biztonságosabb és az adatvédelmet tiszteletben tartó web létrehozása a HTTPS széles körű elterjesztésével. Szolgáltatásaink ingyenesek és könnyen használhatóak, így minden weboldal be tudja vezetni a HTTPS-t.

Nagylelkű szponzorok, támogatók és magánszemélyek támogatására van szükségünk ahhoz, hogy szolgáltatásainkat világszerte ingyenesen nyújthassuk. Ha támogatni szeretne minket, kérjük, fontolja meg az [adományozás](/donate) vagy a [szponzorálás](https://www.abetterinternet.org/sponsor/) lehetőségét.

Egyes esetekben az integrátorok (pl. tárhelyszolgáltatók) névleges díjat számítanak fel, amely tükrözi a Let's Encrypt tanúsítványok biztosításával járó adminisztratív és kezelési költségeiket.

## Milyen támogatást nyújtanak?

A Let's Encryptet egy kis csapat működteti, és a költségek alacsonyan tartása érdekében az automatizálásra támaszkodik. Emiatt nem tudunk közvetlen támogatást nyújtani előfizetőinknek. Van azonban néhány nagyszerű megoldásunk a támogatásra:

1. Rendkívül jól használható [dokumentációval](/docs) rendelkezünk.
2. Nagyon aktív és segítőkész [közösségi támogató fórumaink vannak](https://community.letsencrypt.org/). Közösségünk tagjai nagyszerű munkát végeznek a kérdések megválaszolásában, és a leggyakoribb kérdések közül sok már megválaszolásra került.

Íme egy [általunk kedvelt videó](https://www.youtube.com/watch?v=Xe1TZaElTAs) a közösségi támogatás erejéről.

## A Let's Encryptet használó weboldal Phishing/Malware/Scam/... , mit tegyek?

Javasoljuk, hogy az ilyen oldalakat jelentse a Google Safe Browsing és a Microsoft Smart Screen programnak, amelyek hatékonyabban tudják megvédeni a felhasználókat. Itt vannak az URL-ek, ahol ezeket jelezni lehet:

* [https://safebrowsing.google.com/safebrowsing/report_badware/](https://safebrowsing.google.com/safebrowsing/report_badware/)
* [https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site-guest](https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site-guest)

Ha többet szeretne olvasni az irányelveinkről és az indoklásról, itt megteheti:

https://letsencrypt.org/2015/10/29/phishing-and-malware.html

# <a id="technical">Technikai kérdések</a>

## A Let's Encrypt tanúsítványait megbízhatónak ítéli a böngészőm?

A legtöbb böngésző és operációs rendszer esetében igen. További részletekért lásd a [kompatibilitási listát](/docs/cert-compat).

## A Let's Encrypt állít ki más tanúsítványokat is a az SSL/TLS-en kívül?

A Let's Encrypt tanúsítványok szabványos Domain Validation tanúsítványok, így bármilyen domainnevet használó szerverhez használhatja őket, például webszerverekhez, levelezőszerverekhez, FTP-kiszolgálókhoz és még sok máshoz.

Az e-mail titkosítás és a kódaláírás más típusú tanúsítványt igényel, amelyet a Let's Encrypt nem állít ki.

## A Let's Encrypt generálja vagy tárolja a tanúsítványaim privát kulcsait a Let's Encrypt szerverein?

Nem. Soha.

A privát kulcs minden esetben az Ön saját szerverein van generálva és kezelve, nem pedig a Let's Encrypt tanúsító hatóság által.

## Mekkora a Let's Encrypt tanúsítványok élettartama? Meddig érvényesek?

Tanúsítványaink 90 napig érvényesek. Hogy miért, arról [itt](/2015/11/09/why-90-days.html) olvashat.

Ezen nem lehet módosítani, nincsenek kivételes esetek. Javasoljuk, hogy a tanúsítványokat 60 naponként automatikusan újítsa meg.

## Fog a Let's Encrypt Organization Validation (OV) vagy Extended Validation (EV) tanúsítványokat kiadni?

Nem tervezzük OV vagy EV tanúsítványok kibocsátását.

## Kaphatok tanúsítványt több domain névhez (SAN tanúsítvány vagy UCC tanúsítvány)?

Igen, ugyanaz a tanúsítvány több különböző nevet is tartalmazhat a SAN (Subject Alternative Name) mechanizmus segítségével.

## A Let's Encrypt kiállít "wildcard" tanúsítványokat?

Igen. A wildcard alapú tanúsítvány kibocsátásnak ACMEv2-n keresztül kell történnie a DNS-01 kihívás használatával. További technikai információkért lásd [ez a bejegyzés](https://community.letsencrypt.org/t/acme-v2-production-environment-wildcards/55578).

## Van Let's Encrypt (ACME) kliens az operációs rendszeremhez?

Számos [ACME kliens](/docs/client-options) áll rendelkezésre. Valószínűleg van olyan, ami jól működik az Ön operációs rendszerén. Javasoljuk, hogy kezdje a [Certbot](https://certbot.eff.org/) használatával.

## Használhatok meglévő privát kulcsot vagy tanúsítványaláírási kérelmet (CSR)?

Igen, de nem minden kliens támogatja ezt a funkciót. A [Certbot](https://certbot.eff.org/) igen.

## Milyen IP címeket használ a Let's Encrypt a webszerverem validálásához?

Az validáláshoz használt IP címek listáját nem tesszük közzé, és ezek az IP címek bármikor változhatnak. Vegye figyelembe, hogy mostantól [több IP címről is validálunk](https://letsencrypt.org/2020/02/19/multi-perspective-validation.html).

## Sikeresen megújítottam egy tanúsítványt, de a validálás ezúttal nem történt meg - hogyan lehetséges ez?

Ha sikeresen teljesítette a kihívásokat egy domainre vonatkozóan, az így kapott engedélyezés gyorsítótárba kerül, hogy fiókja később is használhassa. A gyorsítótárazott engedélyek a validálástól számított 30 napig érvényesek. Ha a kért tanúsítvány rendelkezik az összes szükséges jogosultsággal a gyorsítótárban, akkor a validálás nem történik meg újra, amíg a gyorsítótárban tárolt jogosultságok le nem járnak.

---
title: Hogyan működik
linkTitle: Hogyan működik a Let's Encrypt
slug: how-it-works
top_graphic: 3
lastmod: 2019-10-18
show_lastmod: 1
---


A Let's&nbsp;Encrypt és az [ACME protokoll](https://tools.ietf.org/html/rfc8555) célja, hogy lehetővé tegye egy HTTPS-kiszolgáló beállítását, és azt, hogy az automatikusan, emberi beavatkozás nélkül kapjon egy böngésző által megbízhatónak ítélt tanúsítványt.  Ehhez a webszerveren egy tanúsítványkezelő agentet kell futtatni.

A technológia működésének megértéséhez menjünk végig a `https://example.com/` beállításának folyamatán egy Let's&nbsp;Encryptet támogató tanúsítványkezelő agent segítségével.

Ez a folyamat két lépésből áll.  Először az agent biztosítja a tanúsító hatóságot arról, hogy egy domain a webszerver irányítása alá tartozik.  Ezután az ügynök kérvényezhet, megújíthat és visszavonhat tanúsítványokat az adott domainhez.

## Domain validálás

A Let's&nbsp;Encrypt a publikus kulcs alapján azonosítja a szerveradminisztrátort.  Amikor az agent először lép kapcsolatba a Let's&nbsp;Encrypttel, új kulcspárt generál, és bizonyítja a Let's&nbsp;Encrypt tanúsító hatóságnak, hogy a szerver egy vagy több domain felett rendelkezik.  Ez hasonló a hagyományos tanúsító hatóság folyamatához, amelynek során fiókot hoz létre és domaineket ad hozzá a fiókhoz.

A folyamat elindításához az agent megkérdezi a Let's Encrypt tanúsító hatóságot, hogy mit kell tennie annak érdekében, hogy bizonyítsa az `example.com` felett való rendelkezését.  A Let's Encrypt tanúsító hatóság megvizsgálja a kért domainnevet, és egy vagy több feladatot (kihívást) bocsát ki.   Ezek különböző módjai annak, hogy az agent bizonyíthassa a domain felett való rendelkezését.  Például, a tanúsító hatóság a következő választást ajánlhatja fel az agent számára:

* DNS rekord létrehozása a `example.com` alatt, vagy
* HTTP erőforrás létrehozása egy jól ismert URI alatt az `http://example.com/` címen

A Let's Encrypt tanúsító hatóság a kihívásokkal egyidejűleg egy nonce-t is kibocsát, amelyet az ügynöknek alá kell írnia a privát kulcspárjával, ezzel bizonyítva, hogy ő rendelkezik a kulcspárral.

<div class="howitworks-figure">
<img alt="Requesting challenges to validate example.com"
     src="/images/howitworks_challenge.png"/>
</div>

Az agent teljesíti a megadott kihívások egyikét.   Tegyük fel, hogy teljesíti a fent említett második feladatot: létrehoz egy fájlt egy megadott elérési útvonalon a `http://example.com` oldalon.  Az agent a privát kulcsával is aláírja a megadott nonce-t.  Miután az agent elvégezte ezeket a lépéseket, értesíti a tanúsító hatóságot, hogy készen áll a validálás befejezésére.

Ezután a tanúsító hatóság feladata, hogy ellenőrizze, hogy a kibocsátott feladatok teljesültek-e.  A tanúsító hatóság ellenőrzi a nonce aláírását, majd megpróbálja letölteni a fájlt a webszerverről, és meggyőződik arról, hogy az az elvárt tartalommal rendelkezik.

<div class="howitworks-figure">
<img alt="Requesting authorization to act for example.com"
     src="/images/howitworks_authorization.png"/>
</div>

Ha a nonce aláírása érvényes, és a feladatok ellenőrizve vannak, akkor a publikus kulcs által azonosított agent jogosult a `example.com` tanúsítványkezelésére.  Az agent által használt kulcspárt "engedélyezett kulcspárnak" (authorized key pair-nek) nevezzük a `example.com` számára.


## Tanúsítvány kiállítása és visszavonása

Miután az agent már rendelkezik egy engedélyezett kulcspárral, a tanúsítványok igénylése, megújítása és visszavonása egyszerű - csak tanúsítványkezelési üzeneteket kell küldeni, és azokat az engedélyezett kulcspárral aláírni.

A domain tanúsítványának megszerzéséhez az agent létrehoz egy PKCS#10 [Tanúsítvány-aláírási kérelmet](https://tools.ietf.org/html/rfc2986), amely arra kéri a Let's&nbsp;Encrypt tanúsító hatóságot, hogy állítson ki egy tanúsítványt az `example.com` számára egy megadott publikus kulccsal.  A CSR a szokásos módon tartalmazza a CSR-ben szereplő publikus kulcshoz tartozó privát kulccsal történő aláírást.  Az agent a teljes CSR-t is aláírja a `example.com` engedélyezett kulcsával, hogy a Let's&nbsp;Encrypt tanúsító hatóság tudja, hogy az engedélyezett.

Amikor a Let's&nbsp;Encrypt tanúsító hatóság megkapja a kérelmet, mindkét aláírást ellenőrzi.  Ha minden rendben van, kiállít egy tanúsítványt a `example.com` számára a CSR nyilvános kulcsával, és visszaküldi azt az agentnek.

<div class="howitworks-figure">
<img alt="Requesting a certificate for example.com"
     src="/images/howitworks_certificate.png"/>
</div>

A visszavonás hasonló módon működik.  Az agent aláír egy visszavonási kérelmet a `example.com` számára engedélyezett kulcspárral, és a Let's&nbsp;Encrypt tanúsító hatóság ellenőrzi, hogy a kérelem engedélyezett.  Ha igen, akkor a visszavonási információkat közzéteszi a szokásos visszavonási csatornákon (pl. OCSP), hogy az erre hagyatkozó felek, például a böngészők tudhassák, hogy nem szabad elfogadniuk a visszavont tanúsítványt.

<div class="howitworks-figure">
<img alt="Requesting revocation of a certificate for example.com"
     src="/images/howitworks_revocation.png"/>
</div>




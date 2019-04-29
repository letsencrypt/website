---
title: Hasi Zaitez
slug: getting-started
top_graphic: 3
aliases : [/howitworks]
---

Zure web orrialdean HTTPS gaitatzeko ziurtagiri bat (fitxategi mota bat) beharko
duzu Ziurtagiri Aginte (CA) batetik. Let's Encrypt CA bat da. Zure
orrialdearentzako ziurtagiri bat lortzeko, zure domeinua zurea dela frogatu
behar duzu. Horretarako Let's Encrypted
[ACME protokoloa](https://ietf-wg-acme.github.io/acme/) erabiltzen duen
softwarea erabiltzen du. Software hori zure zerbitzarian exekutatzen da.

Zuretzako metodo egokiena hautatzeko zure zerbitzariari
[shell sarbidea](https://en.wikipedia.org/wiki/Shell_account) (SSH) daukazun
jakitea beharrezkoa da. Zure web orrialdea [cPanel](https://cpanel.com/),
[Plesk](https://www.plesk.com/), edo [WordPress](https://wordpress.org/)
administratzen baduzu, erraza da SSH-rik ez izatea. Zure hornitzailearekin
hitz egin ziurtatzeko.

# Shell Sarbidearekin

[Certbot] ACME bezeroa erabiltzea gomendatzen dugu. Ziurtagiria lortzea eta
instalazioa automatizatu dezake. Modu aurreratua dauka konfigurazio automatikoa
nahi ez duen jendearentzat. Erraz erabiltzen da, sistema eragile askotan dabil
eta ondo dokumentatua dago. [Cerbot orrialdea bisitatu][Cerbot] zure
web zerbitzari eta sistema eragileari buruzko jarraibideak ikusteko.

[Cerbot]ek zure beharrak ez baditu betetzen,
[ACME bezero gehiago daude](/docs/client-options/). ACME bezeroa aukeratu
ondoren bezero horren dokumentazioa jarraitu.

ACME bezeroekin frogak egiten dituzun bitartean gure
[staging ingurunea](/docs/staging-environment/) erabili
[eskaera mugak](/docs/rate-limits/) saihesteko.

[Certbot]: https://certbot.eff.org/  "Certbot"

# Shell Sarbide Barik

Shell Sarbide Barik Let's Encrypt erabiltzeko modurik egokiena hornitzaileen
sostengu natiboa da. Zure web zerbitzari hornitzaileak Let's Encrypt-i
eskatu diezake ziurtagiria kasu horretan. Horrez gain hornitzaileak instalatu
eta berritu dezake automatikoki. Hornitzaile batzuek automatikoki eskatu
eta instalatu egiten dituzte ziurtagiriak, beste batzuek aukera hori eskaintzen
dute.

[Hornitzaile zerrenda irakurri](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920)
zure hornitzaileari hor dagoen ikusteko. Zerrendan badago, haien dokumentazioa
jarraitu.

Zure hornitzaileak ez badu Let's Encrypt sostengatzen, bera kontaktatu
dezakezu sostengua eskatzeko. Ahal duguna egiten dugu hori ahal eta erresena
izateko, eta hornitzaileak bezeroen proposamenak pozik entzuten dituzte askotan!

Zure hornitzaileak ez badu Let's Encrypt sostengatu nahi baina ziurtagirien
ezarpen manuala onartzen badu, Certbot zure ordenagailuan instalatu dezakezu,
[modu manualarekin](https://certbot.eff.org/docs/using.html#manual) ziurtagiriak
sortu eta zerbitzarira mugitu ditzakezu. Metodo hau saihestea gomendatzen dugu
nahiko zaila delako. Horretaz gain urtero behin baino gehiagotan errepikatu
behar da. Normalean aukerarik hoberena sostengua eskatzea edo hornitzailea
aldatzea da.

# Laguntza Lortzen

ACME bezero bat aukeratzeko edo erabiltzeko zalantzarik baduzu, edo Let's
Encrypt-i buruzko zalantzetarako,
[komunitate foroak](https://community.letsencrypt.org/) bisitatu.

---
title: "Certifikáty Let's Encrypt na hostingu GoDaddy"
slug: godaddy
lastmod: 2025-08-11
show_lastmod: 1
---

Často dostáváme dotazy, jak používat Let's Encrypt u GoDaddy. GoDaddy nepodporuje [protokol ACME](https://tools.ietf.org/html/rfc8555) pro automatizované vydávání a obnovování certifikátů. Místo toho GoDaddy nabízí automatické obnovování vlastních certifikátů jako [placenou doplňkovou službu](https://www.godaddy.com/web-security/ssl-certificate).

Používání našich certifikátů u GoDaddy v současnosti nedoporučujeme, protože je obtížné a celý postup nelze automatizovat. Automatické obnovování považujeme za důležitou součást správy certifikátů. Automatizace obnovování pomocí softwaru výrazně snižuje riziko, že platnost certifikátu skončí, aniž by byl nahrazen novým.

Pokud přesto chcete certifikáty Let's Encrypt vyzkoušet na sdíleném hostingu GoDaddy, můžete využít některou z následujících možností:

1. Použijte službu [CertSage](https://certsage.com/) od Griffin Software. Jiným uživatelům Let's Encrypt u GoDaddy se její použití osvědčilo.
2. GoDaddy [nabízí vlastní návod](https://www.godaddy.com/help/install-a-lets-encrypt-certificate-on-your-cpanel-hosting-account-28023). Za jeho přesnost ani správnost však nemůžeme ručit. Mějte na paměti, že tento postup je časově náročný a musíte jej pravidelně opakovat před skončením platnosti každého certifikátu.

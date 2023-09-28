---
title: Varmenneyhteensopivuus
slug: certificate-compatibility
top_graphic: 1
lastmod: 2021-05-12
show_lastmod: 1
---


Tärkein ratkaiseva tekijä sille, voiko alusta vahvistaa Let's Encrypt -varmenteet on se, luotaako se ISRG:n "ISRG Root X1" -varmenteeseen. Jotkin alustat voivat vahvistaa varmenteemme, vaikka ne eivät sisälläkään ISRG Root X1:htä, koska ne luottavat IdenTrustin "DST Root CA X3" -varmenteeseen. Syyskuun 2021 jälkeen vain ne alustat, jotka luottavat ISRG Root X1:een jatkavat Let's Encrypt-varmenteiden vahvistamista ([lukuun ottamatta Android](/2020/12/21/extending-android-compatibility.html)).

Jos varmenteesi vahvistuu joillakin "Tunnettu yhteensopiva" -alustoilla, mutta ei toisilla, ongelma voi olla verkkopalvelimen kokoonpanovirhe. Jos sinulla on ongelmia nykyaikaisten alustojen kanssa, yleisin syy on epäonnistuminen oikean varmenneketjun toimittamisessa. Testaa sivustosi [SSL Labsin palvelintestillä](https://www.ssllabs.com/ssltest/). Jos tämä ei tunnista ongelmaa, pyydä apua [Yhteisön foorumeilla](https://community.letsencrypt.org/).

# Alustat, jotka luottavat ISRG:n Root X1:een

* Windows >= XP SP3 ([olettaen, että automaattinen juurivarmenteen päivitys ei ole manuaalisesti pois käytöstä](https://docs.microsoft.com/fi-fi/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/))
* [macOS >= 10.12.1](https://twitter.com/letsencrypt/status/790960929504497665?lang=en)
* [iOS >= 10](https://support.apple.com/fi-fi/HT207177) ([iOS 9 ei sisällä sitä](https://support.apple.com/fi-fi/HT205205))
* [iPhone 5 ja sitä ennen voi päivittää iOS 10](https://fi.wikipedia.org/wiki/IPhone_5) ja siten luottaa ISRG Root X1
* [Android >= 7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15) (mutta Android >= 2.3.6 toimii oletuksena [erityisen ristiallekirjoituksemme vuoksi](https://letsencrypt.org/2020/12/21/extending-android-compatibility.html))
* [Mozilla Firefox >= 50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* [Ubuntu >= xenial / 16.04](https://packages.ubuntu.com/xenial/all/ca-certificates/filelist) (päivitysten kanssa)
* [Debian >= jessie / 8](https://packages.debian.org/jessie/all/ca-certificates/filelist) (päivitysten kanssa)
* [Java 8 >= 8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html)
* [Java 7 >= 7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html)
* [NSS >= 3.26](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS/NSS_3.26_release_notes)

Selaimet (Chrome, Safari, Opera, Edge) luottavat yleensä samoihin juuri-varmenteisiin kuin käyttöjärjestelmä, jota ne käyttävät. Firefox on poikkeus: sillä on oma juurikauppa. Pian Chromen uusilla versioilla [on myös oma juurikauppansa](https://www.chromium.org/Home/chromium-security/root-ca-policy).

# Alustat, jotka hyväksyvät DST Root CA X3: n

* Windows >= XP SP3
* macOS (suurin osa versioista)
* iOS (suurin osa versioista)
* [Android >= v2.3.6](https://twitter.com/Tutancagamon/status/600783165087752192)
* Mozilla Firefox >= v2.0
* Ubuntu >= precise / 12.04
* [Debian >= squeeze / 6](https://twitter.com/TokenScandi/status/600806080684359680)
* Java 8 >= 8u101
* Java 7 >= 7u111
* NSS >= v3.11.9
* Amazon FireOS (verkkoselain Silk)
* Cyanogen > v10
* Jolla Sailfish OS > v1.1.2.16
* Kindle > v3.4.1
* Blackberry >= 10.3.3
* PS4-pelikonsoli laiteohjelmistolla >= 5.00

Voit halutessasi käydä [tässä 2015-2017 yhteisöfoorumikeskustelussa](https://community. letsencrypt. org/t/which-browsers-and-operating-systems-support-lets-encrypt/) saadaksesi lisätietoja yhteensopivuudesta.

# Tiedetty yhteensopimattomaksi

* Blackberry < v10.3.3
* Android < v2.3.6
* Nintendo 3DS
* Windows XP ennen SP3:a
  * SHA-2 allekirjoitettuja varmenteita ei voi käsitellä
* Java 7 < 7u111
* Java 8 < 8u101
* Windows Live Mail (2012 sähköpostiohjelma, ei webmail)
  * ei voi käsitellä varmenteita ilman CRL:ta
* PS3-pelikonsoli
* PS4-pelikonsoli laiteohjelmistolla < 5.00

# ISRG Root X2 (uusi ECDSA-juuri) - tulossa pian
Olemme toimittaneet ISRG Root X2:n Googlen, Mozillan, Applen, Microsoftin ja Oraclen juuriohjelmiin sisällytettäväksi. ISRG Root X2:een luotetaan jo laajalti ISRG Root X1:n ristiallekirjoituksen kautta. Lisätietoja katsomalla meidän [yhteisöfoorumin viestimme](https://community.letsencrypt.org/t/isrg-root-x2-submitted-to-root-programs/149385).



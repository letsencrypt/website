---
title: Compatibilità del certificato
slug: certificate-compatibility
lastmod: 2021-10-31
show_lastmod: 1
---


Il fattore determinante principale se una piattaforma possa convalidare i certificati di Let's Encrypt è se quella piattaforma si affida al certificato "ISRG Root X1" di ISRG. Prima di Settembre 2021, alcune piattaforme potevano validare i nostri certificati pur non includendo ISRG Root X1, poiché si affidavano al certificato "DST Root CA X3" di IdenTrust. Da ottobre 2021, solo le piattaforme che si affidano a ISRG Root X1 convalideranno i certificati di Let's Encrypt ([con l'eccezione di Android](/2020/12/21/extending-android-compatibility.html)).

Se il certificato si convalida su alcune delle piattaforme "Compatibili note" ma non su altre, il problema potrebbe essere una configurazione errata del server web. Se stai avendo un problema con piattaforme moderne, la causa più comune è il mancanza della corretta catena di certificati. Testa il tuo sito con [SSL Labs' Server Test](https://www.ssllabs.com/ssltest/). Se questo non identifica il problema, chiedi aiuto nei nostri [Forum della Community](https://community.letsencrypt.org/).

# Piattaforme che si affidano a ISRG Root X1

* Windows >= XP SP3 ([supponendo che l'Aggiornamento Automatico dei Certificati di Root non sia disabilitato manualmente](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/))
* [macOS >= 10.12.1](https://twitter.com/letsencrypt/status/790960929504497665?lang=en)
* [iOS >= 10](https://support.apple.com/en-us/HT207177) ([iOS 9 non lo include](https://support.apple.com/en-us/HT205205))
* [iPhone 5 e superiori possono aggiornarsi a iOS 10](https://en.wikipedia.org/wiki/IPhone_5) e possono dunque affidarsi a ISRG Root X1
* [Android >= 7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15) (ma Android >= 2.3.6 fnzionerà di default [grazie alla nostra multi-firma speciale](https://letsencrypt.org/2020/12/21/extending-android-compatibility.html))
* [Mozilla Firefox >= 50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* Ubuntu >= Precise Pangolin / 12.04 (con gli aggiornamenti applicati)
* [Debian >= jessie / 8](https://packages.debian.org/jessie/all/ca-certificates/filelist) (con gli aggiornamenti applicati)
* [Java 8 >= 8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html)
* [Java 7 >= 7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html)
* [NSS >= 3.26](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS/NSS_3.26_release_notes)

I browser (Chrome, Safari, Edge, Opera) si affidano generalmente agli stessi certificati di root del sistema operativo su cui operano. Firefox è l'eccezione: ha il proprio archivio principale. Presto, anche le nuove versioni di Chrome [avranno il proprio archivio di root](https://www.chromium.org/Home/chromium-security/root-ca-policy).

# Piattaforme che si affidano a DST Root CA X3 ma non a ISRG Root X1

Queste piattaforme avrebbero funzionato fino a settembre 2021, ma non convalidano più i certificati di Let's Encrypt.

* macOS < 10.12.1
* iOS < 10
* Mozilla Firefox < 50
* Ubuntu >= intrepid / 8.10
* [Debian >= squeeze / 6](https://twitter.com/TokenScandi/status/600806080684359680) and < jessie /8
* Java 8 >= 8u101 e < 8u141
* Java 7 >= 7u111 e < 7u151
* NSS >= v3.11.9 e < 3.26
* Amazon FireOS (Silk Browser) (intervallo delle versioni sconosciuto)
* Cyanogen > v10 (versione che ha aggiunto ISRG Root X1 sconosciuta)
* Jolla Sailfish OS > v1.1.2.16 (versione che ha aggiunto ISRG Root X1 sconosciuta)
* Kindle > v3.4.1 (versione che ha aggiunto ISRG Root X1 sconosciuta)
* Blackberry >= 10.3.3 (versione che ha aggiunto ISRG Root X1 sconosciuta)
* Console di gioco PS4 con firmware >= 5.00 (versione che ha aggiunto ISRG Root X1 sconosciuta)

# Incompatibili noti

* Blackberry < v10.3.3
* Android < v2.3.6
* Nintendo 3DS
* Windows XP senza SP3
  * non è possibile gestire i certificati firmati SHA-2
* Java 7 < 7u111
* Java 8 < 8u101
* Windows Live Mail (client di posta del 2012, non webmail)
  * non è possibile gestire i certificati senza un CRL
* Console di gioco PS3
* PS4 console di gioco con firmware < 5.00

# ISRG Root X2 (nuovo root ECDSA) - in arrivo

Abbiamo inviato ISRG Root X2 ai programmi di root di Microsoft, Apple, Google, Mozilla e Oracle per l'inclusione. ISRG Root X2 è già ampiamente ritenuto affidabile tramite una multi-firma dal nostro ISRG Root X1. Per ulteriori informazioni, dai un'occhiata al nostro [post del forum della community](https://community.letsencrypt.org/t/isrg-root-x2-submitted-to-root-programs/149385).

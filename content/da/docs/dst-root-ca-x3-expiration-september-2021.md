---
title: DST Root CA X3 Udløb (september 2021)
slug: dst-root-ca-x3-expiration-september-2021
lastmod: 2024-02-05
show_lastmod: 1
---

> **Opdatering 05. feb 2024** Det har været to år, og Android kompatibilitet krydsunderskrivningen nævnt under er tæt på at udløbe. Se [vores nylige blog indlæg](https://letsencrypt.org/2023/07/10/cross-sign-expiration) for en detaljeret forklaring af de ændringer, der kommer i løbet af 2024.

> **Opdatering 30. september, 2021** Som planlagt er DST Root CA X3 cross-sign udløbet og vi bruger nu vores egen ISRG Root X1 for tillid på næsten alle enheder. For flere detaljer om planen, fortsæt læsning! Vi har også opdateret vores Production Chain Changes tråd på vores community forum - [vores team og fællesskab er her og klar til at hjælpe](https://community.letsencrypt.org/t/production-chain-changes/150739/4) med eventuelle spørgsmål, du måtte have om dette udløb.

Den 30. september 2021 vil der være en lille ændring i, hvordan ældre browsere og enheder stoler på Let's Encrypt certifikater. Hvis du besøger en typisk hjemmeside, du vil ikke bemærke en forskel - langt de fleste af dine besøgende vil stadig acceptere dit Let's Encrypt certifikat. Hvis du leverer en API eller er nødt til at støtte IoT-enheder, kan du måske være nødt til at være lidt mere opmærksom på ændringen.

Let's Encrypt har et "[root-certifikat][]" kaldet [ISRG Root X1][]. Moderne browsere og enheder stoler på Let's Encrypt certifikatet installeret på din hjemmeside, fordi de inkluderer ISRG Root X1 i deres liste over rodcertifikater. For at sikre, at de certifikater, vi udsteder, er betroede på ældre enheder, vi har også en "cross-signatur" fra et ældre rodcertifikat: DST Root CA X3.

Da vi kom i gang, hjalp et ældre rodcertifikat (DST Root CA X3) os med at få ud af jorden og være betroet af næsten alle enheder straks. Det nyere root- certifikat (ISRG Root X1) har nu stor tillid til - men nogle ældre enheder vil aldrig stole på det, fordi de ikke får softwareopdateringer (for eksempel en iPhone 4 eller en HTC Dream). [Klik her for en liste over hvilke platforme stoler ISRG Root X1][compatibility].

DST Root CA X3 udløber den 30. september 2021. Det betyder, at de ældre enheder, der ikke stoler på ISRG Root X1 vil begynde at få certifikatadvarsler, når besøger websteder, der bruger Let's Encrypt certifikater. Der er en vigtig undtagelse: ældre Android-enheder, der ikke stoler på ISRG Root X1 vil fortsætte med at fungere med Let's Encrypt, [takket være et særligt krydssignatur fra DST Root CA X3][cross-sign], der strækker sig forbi root's udløb. Denne undtagelse virker kun på Android.

Hvad skal du gøre? For de fleste mennesker er der slet ikke noget! Vi har oprettet vores certifikatudstedelse, så dit websted vil gøre det rigtige i de fleste tilfælde, favorisere bred kompatibilitet. Hvis du angiver en API eller er nødt til at støtte IoT enheder, du skal sørge for to ting: (1) alle kunder i din API skal stole på ISRG Root X1 (ikke kun DST Root CA X3), og (2) hvis klienter på din API bruger OpenSSL, [de skal bruge version 1..0 eller senere][openssl]. I OpenSSL 1.0., en quirk i certifikatverifikation betyder, at selv klienter, der stoler på ISRG Root X1 vil mislykkes, når de præsenteres for det Android-kompatible certifikat kæde, vi anbefaler som standard.

Hvis du ønsker yderligere oplysninger om vores løbende ændringer i produktionskæden, [så tjek venligst denne tråd i vores community][production].

Hvis du har spørgsmål om den kommende udløb, [så skriv venligst til denne tråd på vores forum.][forum]

[root-certifikat]: /docs/glossary/#def-root
[ISRG Root X1]: /certificates/
[cross-sign]: /2020/12/21/extending-android-compatibility.html
[openssl]: https://community.letsencrypt.org/t/openssl-client-compatibility-changes-for-let-s-encrypt-certificates/143816
[forum]: https://community.letsencrypt.org/t/help-thread-for-dst-root-ca-x3-expiration-september-2021/149190
[compatibility]: /docs/cert-compat/
[production]: https://community.letsencrypt.org/t/production-chain-changes/150739

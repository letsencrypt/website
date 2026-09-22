---
title: DST Root CA X3 Utgång (september 2021)
slug: dst-root-ca-x3-expiration-september-2021
lastmod: 2024-02-05
show_lastmod: 1
---

> **Uppdatering 05 februari 2024** Det har gått två år, och kompatibilitetskorssigneringen för Android som nämns nedan är nära att gå ut. Se [vårt senaste blogginlägg](https://letsencrypt.org/2023/07/10/cross-sign-expiration) för en detaljerad förklaring av de förändringar som kommer under 2024.

> **Uppdatering 30 september 2021** Som planerat har DST Root CA X3:s korssignering gått ut, och vi använder nu vår egen ISRG Root X1 för förtroende på nästan alla enheter. För mer detaljer om planen, fortsätt läsa! Vi har också uppdaterat vår tråd om ändringar i produktionskedjan på vårt communityforum - [vårt team och community finns här och är redo att hjälpa](https://community.letsencrypt.org/t/production-chain-changes/150739/4) med alla frågor du kan ha om detta utgångsdatum.

Den 30 september 2021 kommer det att bli en liten förändring i hur äldre webbläsare och enheter litar på Let's Encrypt-certifikat. Om du driver en typisk webbplats kommer du inte att märka någon skillnad - de allra flesta av dina besökare kommer fortfarande att acceptera ditt Let's Encrypt-certifikat. Om du tillhandahåller ett API eller måste stödja IoT-enheter, kan du behöva vara lite mer uppmärksam på förändringen.

Let's Encrypt har ett "[rotcertifikat][]" som kallas [ISRG Root X1][]. Moderna webbläsare och enheter litar på Let's Encrypt-certifikatet som är installerat på din webbplats eftersom de inkluderar ISRG Root X1 i sin lista över rotcertifikat. För att säkerställa att de certifikat vi utfärdar litas på på äldre enheter, har vi också en "cross-signatur" från ett äldre rotcertifikat: DST Root CA X3.

När vi började, hjälpte det äldre rotcertifikatet (DST Root CA X3) oss att komma igång och bli betrodd av nästan alla enheter omedelbart. Det nyare rotcertifikatet (ISRG Root X1) är nu också allmänt betrott - men vissa äldre enheter kommer aldrig att lita på det eftersom de inte får mjukvaruuppdateringar (till exempel en iPhone 4 eller en HTC Dream). [Klicka här för en lista över vilka plattformar som litar på ISRG Root X1][compatibility].

DST Root CA X3 kommer att upphöra att gälla den 30 september 2021. Det betyder att de äldre enheterna som inte litar på ISRG Root X1 kommer att börja få certifikatvarningar när de besöker webbplatser som använder Let's Encrypt-certifikat. Det finns ett viktigt undantag: äldre Android-enheter som inte litar på ISRG Root X1 kommer fortsätta att fungera med Let's Encrypt, [tack vare en speciell cross-sign från DST Root CA X3][cross-sign] som sträcker sig bortom det rotcertifikatets utgångsdatum. Detta undantag fungerar bara för Android.

Vad ska du göra? För de flesta, inget alls! Vi har konfigurerat vår certifikatutfärdande så att din webbplats gör rätt sak i de flesta fall, med fördel för bred kompatibilitet. Om du tillhandahåller ett API eller måste stödja IoT-enheter, måste du säkerställa två saker: (1) alla klienter av ditt API måste lita på ISRG Root X1 (inte bara DST Root CA X3), och (2) om klienter av ditt API använder OpenSSL, [måste de använda version 1.1.0 eller senare][openssl]. I OpenSSL 1.0.x betyder en egendomlighet i certifikatverifiering att även klienter som litar på ISRG Root X1 kommer att misslyckas när de presenteras med den Android-kompatibla certifikatkedja vi standardmässigt rekommenderar.

Om du vill ha ytterligare information om våra pågående produktionskedjeförändringar, [vänligen kolla denna tråd i vår community][production].

Om du har några frågor om den kommande utgången, [vänligen posta i denna tråd på vårt forum.][forum]

[rotcertifikat]: /docs/glossary/#def-root
[ISRG Root X1]: /certificates/
[cross-sign]: /2020/12/21/extending-android-compatibility.html
[openssl]: https://community.letsencrypt.org/t/openssl-client-compatibility-changes-for-let-s-encrypt-certificates/143816
[forum]: https://community.letsencrypt.org/t/help-thread-for-dst-root-ca-x3-expiration-september-2021/149190
[compatibility]: /docs/cert-compat/
[production]: https://community.letsencrypt.org/t/production-chain-changes/150739

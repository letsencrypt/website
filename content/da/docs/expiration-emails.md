---
title: Udløbs E-Mail
slug: expiration-emails
top_graphic: 1
date: 2016-07-02
lastmod: 2020-10-28
show_lastmod: 1
---


# Abonnér

Hvis du angiver en e-mailadresse til Let's Encrypt når du opretter din konto, vil vi automatisk sende dig udløbs varsler, når dit certifikat snart skal fornyes. Vi sender den første besked 20 dage før dit certifikat udløber, og flere beskeder ved 10 dage og 1 dag før det udløber.

# Når du får en udløbs e-mail

Hvis dit certifikat allerede er fornyet, sender vi ikke en udløbsbesked. Vi anser et certifikat for at blive fornyet, hvis der er et nyere certifikat med det nøjagtige samme sæt navne, uanset hvilken konto der har oprettet den. Hvis du har udstedt et nyt certifikat, der tilføjer eller fjerner et navn i forhold til dit gamle certifikat, vil du få udløbs-e-mail om dit gamle certifikat. Hvis du tjekker certifikatet, der aktuelt kører på din hjemmeside, og det viser den korrekte dato, er der ikke behov for yderligere handling.

# Afmeld abonnement

E-mailen har et link til at afmelde fra fremtidige meddelelser. Hvis du klikkede dette link, vil du ikke få nogen udløbsmeddelelser for det kommende år. Listen over "hvem er afmeldt" er uafhængig af beskeder om staging afmeldinger og produktions afmeldinger, så du kan være velkommen til at afmelde dig fra staging uden at påvirke din produktionsstatus.

Bemærk, at din afmelding kun er gyldig i et år, så du bliver nødt til at forny den hvert år.

Der er findes endnu ikke en måde for os til effektivt at genabonnere dig, hvis du afmelder. Vores e-mail-udbyder, Mandrill, [har en manuel mekanisme, som vi stadig har brug for at automatisere](https://mandrill.zendesk.com/hc/en-us/articles/360039299913).

Men du kan ændre e-mailadressen på din konto, som effektivt gentilmelder dig. Mange almindelige e-mail-tjenester behandler `yourname+1@example.com` som det samme som `yourname@example.com`. Så hvis du opdaterer din e-mailadresse til `dit navn+1@example.com`, kan du begynde at få udløbsmail igen. Med Certbot, brug:

`certbot update_account --email yourname+1@example.com`

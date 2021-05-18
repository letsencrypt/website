---
title: E-postpåminnelser om utgång
slug: expiration-emails
top_graphic: 1
date: 2016-07-02
lastmod: 2019-04-18
show_lastmod: 1
---


# Prenumeration

Om du anger en e-postadress när du skapar ditt Let's Encrypt-konto kommer vi
automatiskt skicka e-postpåminnelser om utgång när dina certifikat behöver
förnyas. Vi skickar den första notisen 20 dagar innan ditt certifikat går ut
och fler påminnelser tio dagar och en dag innan det går ut.

# När du får en e-postpåminnelse om utgång

Om ditt certifikat redan förnyats så skickar vi inte en notis om utgång. Vi
anser ett certifikat vara förnyat om det finns ett nyare certifikat med samma
lista med domännamn oavsett vilket konto som skapade det. Om du utfärdat ett
nytt certifikat som lägger till eller tar bort ett domännamn jämfört med ditt
gamla certifikat så kommer du att få en e-postpåminnelse om utgång av ditt
gamla certifikat. Om du kontrollerar certifikatet som för tillfället
presenteras av din webbplats och det har korrekt datum behöver du inte göra
något.

# Avprenumeration

E-postmeddelandet har en länk för att avprenumerera från framtida notiser. Om
du klickar på den länken kommer du inte att få några notiser om utgång på ett
år. Listan på vilka som sagt upp sin prenumeration är olika mellan testmiljön
och produktionsmiljön, så du kan avprenumerera från testmiljön utan att påverka
notiser från produktionsmiljön.

Observera att din avprenumeration bara gäller ett år så du måste avprenumerera
varje år.

Än så länge finns det inte någon effektiv möjlighet för oss att återprenumerera
när du väl avprenumererat. Vår e-postleverantör Mandrill [har en manuell
mekanism som vi fortfarande behöver
automatisera](https://mandrill.zendesk.com/hc/en-us/articles/205582947-About-Unsubscribes).

Du kan däremot ändra e-postadress på ditt konto vilket kommer innebära att en ny
prenumeration startar. Många vanliga e-posttjänster betraktar
`dittnamn+1@example.com` som detsamma som `dittnamn@example.com`. Det innebär
att om du ändrar din e-postadress till `dittnamn+1@example.com` så kommer du
börja få e-postpåminnelser om utgång igen. Med Certbot, använd:

`certbot update_account --email dittnamn+1@example.com`

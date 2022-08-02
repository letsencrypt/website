---
title: "Let's Encrypt certifikater på GoDaddy Hosting"
slug: godaddy
top_graphic: 1
date: 2019-12-02
lastmod: 2019-12-02
show_lastmod: 1
---


Vi får en masse spørgsmål om, hvordan man bruger Let's Encrypt sammen med GoDaddy. Hvis du anvender GoDaddy webhosting, er det i øjeblikket meget svært at installere et Let's Encrypt certifikat, så vi anbefaler ikke i øjeblikket at bruge vores certifikater med GoDaddy. Dette skyldes, at GoDaddy ikke understøtter [ACME-protokollen](https://tools.ietf.org/html/rfc8555) til automatiseret certifikatudstedelse og fornyelse. GoDaddy tilbyder i stedet automatiseret fornyelse med deres egne certifikater, som en [tilkøbt funktion](https://www.godaddy.com/web-security/ssl-certificate).

Vi anbefaler ikke at anvende Let's Encrypt certifikater på hosting-udbydere, som ikke direkte implementerer ACME-protokollen, da det betyder, at du ikke fuldt ud kan automatisere fornyelser. Vi mener, at automatiserede fornyelser er en meget vigtig del af det at anvende certifikater. Brug af software til at automatisere fornyelse gør det meget mindre sandsynligt, at dit certifikat vil udløbe uden at blive erstattet. Hvis dit certifikat udløber, er det meget frustrerende for dine brugere, fordi de ikke kan få adgang til dit websted.

Fordi vi tror så stærkt på automatiseret fornyelse, designer vi vores certifikater til at blive brugt med ACME-automatik. Et Let's Encrypt certifikat er beregnet til at blive fornyet automatisk efter 60 dage, og stopper med at arbejde efter 90 dage, hvis det ikke er blevet fornyet.

Hvis du efter gennemgang af ovenstående problemer, du besluttede, at du gerne vil prøve at opretholde et Lets' Encrypt certifikat på GoDaddy delt hosting, har GoDaddy [instruktioner](https://www.godaddy.com/help/install-a-lets-encrypt-certificate-on-your-cpanel-hosting-account-28023) om hvordan det gøres. Husk at følge disse instruktioner er tidskrævende og noget du forventes at gøre det hver 60 dage (ikke hver 90 dage som beskrevet på siden, der er linket til).

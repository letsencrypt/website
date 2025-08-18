---
title: "Let's Encrypt certifikater på GoDaddy Hosting"
slug: godaddy
lastmod: 2025-08-11
show_lastmod: 1
---

Vi får en masse spørgsmål om, hvordan man bruger Let's Encrypt sammen med GoDaddy. Dette skyldes, at GoDaddy ikke understøtter [ACME-protokollen](https://tools.ietf.org/html/rfc8555) til automatiseret certifikatudstedelse og fornyelse. GoDaddy tilbyder i stedet automatiseret fornyelse med deres egne certifikater, som en [tilkøbt funktion](https://www.godaddy.com/web-security/ssl-certificate).

Vi anbefaler ikke i øjeblikket at bruge vores certifikater med GoDaddy, fordi det er svært, og processen kan ikke automatiseres. Vi mener, at automatiserede fornyelser er en vigtig del af certifikat forvaltningen. Brug af software til at automatisere fornyelse gør det meget mindre sandsynligt, at dit certifikat vil udløbe uden at blive erstattet.

Hvis du stadig gerne vil prøve at bruge Let's Encrypt certifikater med GoDaddy delt hosting, kan du prøve en af følgende muligheder:

1. Brug [CertSage](https://certsage.com/) fra Griffin Software. Andre Let's Encrypt brugere på GoDaddy har haft succes med det.
2. GoDaddy [giver instruktioner](https://www.godaddy.com/help/install-a-lets-encrypt-certificate-on-your-cpanel-hosting-account-28023). Vi kan ikke bekræfte deres nøjagtighed eller korrekthed. Husk, at følge disse instruktioner er tidskrævende og du forventes at gøre det regelmæssigt, før hvert certifikat udløber.

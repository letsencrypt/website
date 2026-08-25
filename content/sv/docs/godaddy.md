---
title: "Let's Encrypt certifikat på GoDaddy Hosting"
slug: godaddy
lastmod: 2025-08-11
show_lastmod: 1
---

Vi får många frågor om hur man använder Let’s Encrypt på GoDaddy. GoDaddy stöder inte [ACME-protokollet](https://tools.ietf.org/html/rfc8555) för automatiserad utfärdande och förnyelse av certifikat. Istället erbjuder GoDaddy automatisk förnyelse med sina egna certifikat, vilket är en [extra kostnadsfunktion](https://www.godaddy.com/web-security/ssl-certificate).

Vi rekommenderar för närvarande inte att använda våra certifikat med GoDaddy eftersom det är svårt och processen inte kan automatiseras. Vi anser att automatiska förnyelser är en viktig del av certifikathantering. Att använda programvara för att automatisera förnyelsen gör det mycket mindre sannolikt att ditt certifikat går ut utan att ersättas.

Om du ändå vill prova att använda Let’s Encrypt-certifikat med GoDaddy delad hosting kan du undersöka ett av följande alternativ:

1. Använd [CertSage](https://certsage.com/) från Griffin Software. Andra Let's Encrypt-användare på GoDaddy har haft framgång med det.
2. GoDaddy [ger instruktioner](https://www.godaddy.com/help/install-a-lets-encrypt-certificate-on-your-cpanel-hosting-account-28023). Vi kan inte garantera deras noggrannhet eller korrekthet. Kom ihåg att det är tidskrävande att följa dessa instruktioner och du förväntas göra det regelbundet, innan varje certifikat går ut.

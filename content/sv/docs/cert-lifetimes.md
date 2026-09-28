---
title: Certifikatets livslängd – motivering och planer
slug: cert-lifetimes
lastmod: 2026-07-22
show_lastmod: 1
---

## Nuvarande livslängder

Sedan vår första lansering 2015 har Let's Encrypt erbjudit certifikat med 90 dagars livslängd. Detta förblir standardlivslängden, och de allra flesta certifikat vi utfärdar har 90 dagars livslängd.

Kortlivade certifikat med 6 dagars livslängd finns som ett val till alla våra prenumeranter.

Se vår [dokumentation om certifikatsprofiler](/docs/profiles/) för mer information.

## Framtida planer

[Branschregler](https://cabforum.org/working-groups/server/baseline-requirements/documents/) kommer att begränsa certifikatens livslängd till maximalt 47 dagar från och med 15 mars 2029. Därför kommer vi att [minska den maximala livslängden för våra certifikat till 45 dagar i februari 2028](/2025/12/02/from-90-to-45.html).

## Varför kortare livslängder?

Vi får ibland frågan varför vi bara erbjuder certifikat med 90 dagars livslängd, eller varför vi introducerar ännu kortare livslängder.

Det finns två huvudsakliga fördelar med kortare certifikatslivslängder:

- De begränsar skador från felaktig utfärdelse och komprometterade nycklar. Felaktigt utfärdade certifikat, och certifikat med nycklar som komprometterats före eller efter utfärdande, är giltiga under en kortare period.
- De uppmuntrar automatisering, vilket är absolut nödvändigt för användarvänlighet och tillförlitlighet. När certifikathantering väl är automatiserad, är kortare livslängder inte mindre bekväma än längre.

Vi valde 90 dagars livslängd för vårt initiala erbjudande eftersom nittio dagar var tillräckligt kort för att starkt uppmuntra automation, men tillräckligt lång för att möjliggöra manuella åtgärder. Även om vi ville uppmuntra automation, var detta mål underordnat att göra det möjligt för alla att aktivera HTTPS. Vid den tiden var automation inte lika vanlig som idag, delvis eftersom ekosystemet av verktyg som möjliggör det (t.ex. ACME-klienter) var ungt. Idag är situationen mycket annorlunda - automation är mycket vanligare och ekosystemet av verktyg som möjliggör det är mycket mer moget. Därför känner vi oss nu mer bekväma med erbjudanden kortare än nittio dagar än vi gjorde då.

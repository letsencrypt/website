---
title: Certifikatets levetids rationale og planer
slug: cert-lifetimes
lastmod: 2026-07-22
show_lastmod: 1
---

## Aktuelle Livstider

Siden vores første lancering i 2015 har Let's Encrypt tilbudt certifikater med 90-dages levetid. Dette er fortsat standard levetid, og langt størstedelen af de certifikater, vi udsteder, har 90-dages levetid.

Kortlivede certifikater med 6-dages levetid er valgfri tilgængelige for alle vores abonnenter.

Se vores [certifikat profiler dokumentation](/docs/profiles/) for mere information.

## Fremtidige planer

[Industriregler](https://cabforum.org/working-groups/server/baseline-requirements/documents/) vil begrænse certifikatets levetid til højst 47 dage fra den 15. marts 2029. Som sådan, vil vi [reducere den maksimale levetid af vores certifikater til 45 dage i februar 2028](/2025/12/02/from-90-to-45.html).

## Hvorfor kortere levetid?

Vi bliver undertiden spurgt om, hvorfor vi kun tilbyder certifikater med 90 dages levetid, eller hvorfor vi introducerer endnu kortere levetid.

Der er to primære fordele ved kortere certifikatlivstider:

- De begrænser skaderne som følge af fejludstedelse og nøglekompromiser. Misudstedte certifikater og certifikater med kompromitterede nøgler enten før eller efter udstedelsen er gyldige i en kortere periode.
- De tilskynder til automatisering, som er absolut nødvendig for at lette brugen og pålideligheden. Når certifikatstyring er automatiseret, kortere levetider er ikke mindre bekvemme end længere.

Vi valgte 90-dages levetid for vores oprindelige tilbud, fordi halvfems dage var korte nok til kraftigt at tilskynde til automatisering, men længe nok til at gøre det muligt at gøre tingene manuelt. Mens vi ønskede at tilskynde til automatisering, dette var underliggende mål at gøre det muligt for alle at aktivere HTTPS. På det tidspunkt, automatisering var ikke så almindelig, som det er i dag, til dels fordi økosystemet af værktøjer til at aktivere det (f. eks.. ACME-klienter) var ny. I dag er tingene meget forskellige - automatisering er langt mere almindelig, og økosystemet af værktøjer, der gør det muligt at gøre det langt mere modent. Som sådan er vi mere komfortable med tilbud kortere end halvfems dage nu, end vi var dengang.

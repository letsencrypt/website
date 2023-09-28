---
title: Tilbagekaldelse Årsag Koder
slug: revocation-reason-codes
top_graphic: 1
date: 2022-06-23
lastmod: 2022-07-06
show_lastmod: 1
---

Når du tilbagekalder et certifikat, bør Let's Encrypt abonnenter vælge en af følgende årsagskode:

* Ingen grund angivet eller `uspecificeret` (RFC 5280 CRLReason #0)
  - Hvis nedenstående årsagskoder ikke gælder for tilbagekaldelsesanmodningen, må abonnenten ikke angive en anden årsagskodekode end "uspecificeret".
* `keyCompromise` (RFC 5280 CRLReason #1)
  - Certifikatabonnenten skal vælge "keyCompromise" tilbagekaldelsesårsagen, når de har grund til at tro, at den private nøgle i deres certifikat er blevet kompromitteret, f.eks. en uautoriseret person har haft adgang til den private nøgle til deres certifikat.
  - Hvis tilbagekaldelsesanmodningen er underskrevet ved hjælp af certifikatets private nøgle, i stedet for en privatnøgle til abonnentkonto, så kan Let's Encrypt vælge at ignorere tilbagekaldelsesårsagen i forespørgslen og angive årsagen til "keyCompromise".
* `superseded` (RFC 5280 CRLReason #4)
  - Certifikatabonnenten bør vælge den "superseeded" (erstatttet) tilbagekaldelsesårsag, når de anmoder om et nyt certifikat til erstatning for deres eksisterende certifikat.
* `cessationOfOperation` (RFC 5280 CRLReason #5)
  - Certifikatabonnenten bør vælge "cessationOfOperation" (ophørsbegrænsning) tilbagekaldelsesårsagen, når de ikke længere ejer alle domænenavne i certifikatet, eller når de ikke længere vil bruge certifikatet, fordi de ophører deres websted.
  - Hvis tilbagekaldelsesanmodningen er fra en abonnentkonto, som ikke bestilte det pågældende certifikat, men har påvist kontrol med alle identifikatorer i certifikatet Let's Encrypt kan ignorere tilbagekaldelsesårsagen i forespørgslen og angive årsagen til "cessationOfOperation" (ophørshandling).

Tilbagekaldelsesanmodninger, der angiver en anden årsagskode, end de ovenfor beskrevne vil blive afvist.

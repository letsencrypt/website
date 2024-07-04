---
title: ACME Protokoll Uppdateringar
slug: acme-protocol-updates
lastmod: 2019-10-07
show_lastmod: 1
---

[IETF-standardiseringen](https://letsencrypt.org/2019/03/11/acme-protocol-ietf-standard.html) av ACME protokollet, [RFC 8555](https://datatracker.ietf.org/doc/rfc8555/), är grundstenen till hur Let's Encrypt fungerar.

# API-slutpunkter

Vi har för närvarande följande API-slutpunkter. Se [våran avvikelser dokumentation](https://github.com/letsencrypt/boulder/blob/main/docs/acme-divergences.md) för att jämföra deras genomförande med ACME-specifikationen.

## ACME v2 (RFC 8555)

* [Production] `https://acme-v02.api.letsencrypt.org/directory`
* [Staging] `https://acme-v02.api.letsencrypt.org/directory`

## ACME v1 (Föråldrad)

* [Production] `https://acme-v01.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging.api.letsencrypt.org/directory`

# Nya bakåtkompatibla ACME-funktioner

Ibland kan Let's Encrypt implementera nya bakåtkompatibla funktioner för befintliga API-slutpunkter. Vanligtvis introduceras nya bakåtkompatibla funktioner eftersom vi har beslutat att implementera en del av ACME-spec som vi inte hade implementerat tidigare.

När nya funktioner införs till befintliga API-slutpunkter funktionerna kommer alltid att vara tydligt specificerade i en offentlig ACME-specifikation och kommer inte att bryta korrekt implementerade kunder.

# Nya versioner av ACME med brytningsändringar

Vi planerar inte att göra brytningsförändringar till vårt ACME-stöd, men om vi känner att det är viktigt att göra det så kommer vi att arbeta för att möjliggöra en smidig övergång över tillräckligt lång tid och kommunicera så långt i förväg som möjligt. Systemadministratörer bör behålla möjligheten att distribuera uppdateringar i tid till sina ACME-klienter i händelse av att en brytningsförändring är nödvändig.

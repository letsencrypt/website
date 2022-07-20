---
title: Aggiornamenti del protocollo ACME
slug: acme-protocol-updates
top_graphic: 1
lastmod: 2019-10-07
show_lastmod: 1
---

Il protocollo [IETF-standardizzato](https://letsencrypt.org/2019/03/11/acme-protocol-ietf-standard.html) ACME, [RFC 8555](https://datatracker.ietf.org/doc/rfc8555/), è il fondamento su cui funziona Let's Encrypt.

# API Endpoints

Al momento abbiamo i seguenti endpoint API. Si prega di consultare [la nostra documentazione sulle divergenze](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) per confrontare la loro implementazione con la specifica ACME.

## ACME v2 (RFC 8555)

* [Production] `https://acme-v02.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging-v02.api.letsencrypt.org/directory`

## ACME v1 (Deprecato)

* [Production]`https://acme-v01.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging.api.letsencrypt.org/directory`

# Nuove funzionalità ACME retrocompatibili

Ogni tanto Let's Encrypt può implementare nuove funzionalità retrocompatibili per gli endpoint API esistenti. In genere vengono introdotte nuove funzionalità retrocompatibili perché abbiamo deciso di implementare una parte della specifica ACME che era stata implementata prima.

Quando vengono introdotte nuove funzionalità agli endpoint API esistenti, le caratteristiche sono sempre specificate chiaramente in una specifica ACME pubblica e non bloccherà i client correttamente implementati.

# Nuove versioni di ACME con Breaking Changes

Non abbiamo intenzione di apportare modifiche importanti al nostro supporto ACME, ma se riterremo importante farlo lavoreremo per consentire una transizione fluida con tempistiche sufficienti e lo comunicheremo con più anticipo possibile. Gli amministratori dei sistemi dovrebbero mantenere la capacità di distribuire aggiornamenti tempestivi ai loro client ACME nel caso in cui sia necessario un cambiamento di rottura.

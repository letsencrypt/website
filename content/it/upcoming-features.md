---
title: Funzionalità in arrivo
slug: upcoming-features
top_graphic: 1
lastmod: 2021-09-16
show_lastmod: 1
---

## Informazioni di Rinnovo ACME (ARI)

Stiamo lavorando su un sistema che ci permetterà di notificare gli abbonati tramite API quando hanno bisogno di rinnovare. Questo sistema ci permetterà di segnalare agli abbonati che hanno bisogno di rinnovare prima, ad esempio, un evento di revoca.

## Root ECDSA e Intermediati

Stiamo emettendo i certificati dal nostro mediatore di produzione ECDSA ai [profili consentiti](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679). Non è prevista alcuna data per rimuovere la lista di permessi.

# Funzionalità completate

## Convalida multi-prospettiva

* Disponibile: 19 Febbraio 2020

Ora convalidiamo il controllo del dominio da [prospettive di rete multiple](https://letsencrypt.org/2020/02/19/multi-perspective-validation.html).

## Certificate Transparency Log

* Disponibile: 15 Maggio 2019

Ora gestiamo un [Certificate Transparency log](/docs/ct-logs).

## TLS ALPN Challenge Support

* Disponibile: 12 Luglio 2018

Abbiamo specificato e implementato una [sostituzione](https://tools.ietf.org/html/rfc8737) per il metodo di convalida TLS-SNI, che è stato [sospeso per motivi di sicurezza](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811). L'introduzione di una sostituzione era importante per gli abbonati che vogliono solo utilizzare la porta 443 per la validazione.

## Wildcard Certificates

* Disponibile: 13 Marzo 2018

## ACME v2 API

* Disponibile: 13 Marzo 2018

## Pieno support al IPv6

* Disponibile: 26 Luglio 2016

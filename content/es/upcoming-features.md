---
title: Próximas Funcionalidades
slug: upcoming-features
top_graphic: 1
---

## Certificate Transparency Log

* ETA: Q1 2019

Estamos planificando operar un "[certificate transparency log](http://www.certificate-transparency.org/how-ct-works)".

## Validaci&oacute;n de Multi-Perspectiva

* ETA: Q2 2019

Actualmente Let's Encrypt hace validaci&oacute;nes desde una sola perspectiva de red. Estamos planificando empezar a validar desde multiples perspectivas de red.

## Ra&iacute;z e Intermedios ECDSA

* ETA: Q3 2019

Actualmente Let's Encrypt solamente firma certificados *end-entity* con intermedios RSA. Let's Encrypt generar&aacute; una ra&iacute;z ECDSA e intermedios que se pueden usar para firmar certificados *end-entity*.

# Funcionalidades Completadas

## Soporte para reto TLS ALPN

* Habilitado: 12 de julio del 2018

Hemos especificado e implementado un [reemplazo](https://datatracker.ietf.org/doc/draft-ietf-acme-tls-alpn/) para el m&eacute;todo de validaci&oacute;n TLS-SNI, el cual fue [discontinuado por razones de seguridad](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811). Introducir un reemplazo fue importante para subscriptores que solo quieren usar el puerto 443 para validaci&oacute;n.

## Inserci&oacute;n de recibos SCT en certificados

* Habilitado: 29 de marzo del 2018

## Certificados Wildcard

* Habilitado: 13 de marzo del 2018

## v2 ACME API 

* Habilitado: 13 de marzo del 2018

## Soporte IDN

* Habilitado: 20 de octubre del 2016

Let's Encrypt ahora soporta emitici&oacute;n para *Internationalized Domain Names* (IDNs, por sus siglas en ingl&eacute;s).

## Soporta completo para IPv6

* Habilitado: 26 de julio del 2016

Inicialmente, solo partes de la infraestructura del API de Let's Encrypt se podia comunicar mediante IPv6. Esto evitaba que sistemas solo IPV6 pudieran interacturar completamente con Let's Encrypt. Esto ha sido resuelto - soporte para IPV6 ha sido habilitado para toda funcionalidad.

## Compatibilidad de Certificado en Windows XP

* Habilitado: 25 de marzo del 2016

Se resolvi&oacute; un problema con nuestra cadena de certificados que preven&iacute;a certificados Let's Encrypt  de ser aceptados por navegadores en Windows XP.

## Soporte para firmar ECDSA

* Habilitado: 10 de febrero del 2016

Se agreg&oacute; la habilidad para Let's Encypt firmar llaves ECDSA con intermedios RSA de Let's Encrypt. Soporte para firmar llaves ECDSA con una cadena completa de certificados ECDSA ser&aacute; a&ntilde;dido despu&eacute;s.

## Soporte para reto ACME DNS

* Habilitado: 20 de enero del 2016

Let's Encrypt permite validaci&oacute;n mediante registros DNS asi definidos en la especificaci&oacute;n ACME.

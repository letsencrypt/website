---
title: Próximas Funcionalidades
slug: upcoming-features
top_graphic: 1
lastmod: 2019-07-03
show_lastmod: 1
---


## Validación de Multi-Perspectiva

Actualmente Let's Encrypt hace validaciónes desde una sola perspectiva de red. Estamos planificando empezar a validar desde multiples perspectivas de red.

## Raíz e Intermedios ECDSA

Actualmente Let's Encrypt solamente firma certificados *end-entity* con intermedios RSA. Let's Encrypt generará una raíz ECDSA e intermedios que se pueden usar para firmar certificados *end-entity*.

# Funcionalidades Completadas

## Certificate Transparency Log

* Habilitado: 15 de mayo del 2019

Estamos empezando a operar un [Certificate Transparency log](/docs/ct-logs).

## Soporte para reto TLS ALPN

* Habilitado: 12 de julio del 2018

Hemos especificado e implementado un [reemplazo](https://tools.ietf.org/html/rfc8737) para el método de validación TLS-SNI, el cual fue [discontinuado por razones de seguridad](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811). Introducir un reemplazo fue importante para subscriptores que solo quieren usar el puerto 443 para validación.

## Inserción de recibos SCT en certificados

* Habilitado: 29 de marzo del 2018

## Certificados Wildcard

* Habilitado: 13 de marzo del 2018

## v2 ACME API 

* Habilitado: 13 de marzo del 2018

## Soporte IDN

* Habilitado: 20 de octubre del 2016

Let's Encrypt ahora soporta emitición para *Internationalized Domain Names* (IDNs, por sus siglas en inglés).

## Soporta completo para IPv6

* Habilitado: 26 de julio del 2016

Inicialmente, solo partes de la infraestructura del API de Let's Encrypt se podia comunicar mediante IPv6. Esto evitaba que sistemas solo IPV6 pudieran interacturar completamente con Let's Encrypt. Esto ha sido resuelto - soporte para IPV6 ha sido habilitado para toda funcionalidad.

## Compatibilidad de Certificado en Windows XP

* Habilitado: 25 de marzo del 2016

Se resolvió un problema con nuestra cadena de certificados que prevenía certificados Let's Encrypt  de ser aceptados por navegadores en Windows XP.

## Soporte para firmar ECDSA

* Habilitado: 10 de febrero del 2016

Se agregó la habilidad para Let's Encypt firmar llaves ECDSA con intermedios RSA de Let's Encrypt. Soporte para firmar llaves ECDSA con una cadena completa de certificados ECDSA será añdido después.

## Soporte para reto ACME DNS

* Habilitado: 20 de enero del 2016

Let's Encrypt permite validación mediante registros DNS asi definidos en la especificación ACME.

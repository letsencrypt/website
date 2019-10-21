---
title: FAQ
linkTitle: Preguntas Frecuentes (FAQ)
slug: faq
top_graphic: 1
date: 2017-07-06
lastmod: 2017-07-06
menu:
  main:
    weight: 30
    parent: about
---

{{< lastmod >}}

Este FAQ está dividido en las siguientes secciones:

* [Preguntas Generales](#general)
* [Preguntas Técnicas](#technical)

# <a name="general">Preguntas Generales</a>

## ¿Qué servicios ofrece Let's Encrypt?

Let's Encrypt es una Autoridad de Certificación (AC, or CA por sus siglas en inglés) global. Dejamos que personas y organizaciones alrededor del mundo obtengan, renueven, y manegen certificados SSL/TLS. Nuestros certificados pueden ser usados para sitios de web para habilitar conexiones HTTPS aseguradas.

Let's Encrypt ofrece certificados de Validación de Dominio (DV por sus siglas en inglés). No ofrecemos Validaciones Extendidas o de Organización principalmente porque no podemos automatizar la emisión de esos tipos de certificados.

Para comenzar a usar Let's Encrypt, por favor visita nuestra página [Comenzando]({{< relref "/getting-started.md" >}}).

## ¿Cuánto cuesta usar Let's Encrypt? ¿Verdaderamente es gratis?

No cobramos tarifas por nuestros certificados. Let's Encrypt es una organización sin fines de lucro, nuestra misión es crear un Web más seguro y respetador de la privacidad promoviendo el uso generalizado de HTTPS. Nuestros servicios son gratuitos y fáciles de usar para que cada sitio web pueda implementar HTTPS.

Requerimos apoyo de nuestros generosos auspociadores, becarios, e individuos para propocionar nuestros servicios de forma gratuita en todo el mundo. Si estás interesado en apoyarnos por favor considere [donar]({{< relref "/donate.html" >}}) ó [convertirse en un patrocinador]({{< relref "/become-a-sponsor.html" >}}).

En algunos casos, integradores (por ejemplo, proveedores de hospedaje) cobrarán una tarifa nominal que refleja los costos administrativos y de gestión incurridos por la proporción de certificados Let's Encrypt.

## ¿Qué tipo de apoyo ofrecen?

Let's Encrypt está dirigido por un pequeño equipo y se basa de la automatización para mantener los costos bajos. Siendo ese el caso, no podemos ofrecer apoyo directo a nuestros subscriptores. Sin embargo, tenemos algunas grandes opciones de apoyo: 

1. Tenemos [documentación](/es/docs/) realmente útil.
2. Tenemos [foros de apoyo comunitario](https://community.letsencrypt.org/) muy activos y útiles. Miembros de nuestra comunidad hacen un gran trabajo contestando preguntas, y muchas de las preguntas más frecuentes ya han sido contestadas.

Aqu&iacute un [video que nos gusta](https://www.youtube.com/watch?v=Xe1TZaElTAs) sobre el poder de un gran apoyo comunitario.

## Un sitio web usando Let's Encrypt está involucrado en *Phishing/Malware/Scam/...* , ¿qué debo hacer?

Recomendamos reportar dichos sitios a Google Safe Browsing y el programa Microsoft Smart Screen, que pueden proteger a los usuarios de una manera más efectiva. Aquí está el URL de informes de Google:

https://www.google.com/safebrowsing/report_badware/

Si desea leer más sobre nuestras políticas y nuestra justificación, puede hacerlo aquí:

https://letsencrypt.org/2015/10/29/phishing-and-malware.html

# <a name="technical">Preguntas Técnicas</a>

## ¿Los certificados de Let's Encrypt son confiados por mi navegador?

Para la mayoría de los navegadores y sistemas operativos, sí. Ve la [lista de compatibilidad]({{< relref "/docs/cert-compat.md" >}}) para más detalles.

## ¿Let's Encrypt emite certificados para cualquier otra cosa que no sea SSL/TLS para sitios web?

Certificados Let’s Encrypt son certificados de Validación de Dominio estándar, así que puedes usarlo para cualquier servidor que use un nombre de dominio, como servidores web, servidores de correo, servidores FTP, y muchos más.

Encripción de email y firma de código requieren otro tipo de certificado que Let's Encrypt no emite.

## ¿ Let's Encrypt genera o guarda las llaves privadas para mis certificados en los servidores de Let's Encrypt?

No. Nunca.

La llave privada siempre es generada y gestionada en tu propio servidor, no por la autoridad de certificación Let's Encrypt.

## ¿Cuál es el tiempo de vida de un certificado Let's Encrypt? ¿Por cuánto tiempo son válidos?

Nuestros certificados son válidos por 90 días. Puedes leer acerca de por qué [aquí](/2015/11/09/why-90-days.html).

No hay forma de ajustar esto, no hay excepciones. Recomendamos renovar tus certificados automáticamente cada 60 días.

## ¿Let’s Encrypt emitirá certificados de Validación de Organización (OV) o Validación Extendida (EV)?

No tenemos planes de emitir certificados OV ó EV.

## ¿Puedo obtener un certificado que tiene varios nombres de dominio (certificados SAN o UCC)?

Sí, el mismo certificado puede contener diferentes nombres de dominio usando el mecanismo de Nombre Alternativo de Sujeto (SAN por sus siglas en inglés).

## ¿Let’s Encrypt emite certificados wildcard?

Sí. Emisión wildcard se debe realizar a través de ACMEv2 usando el reto DNS-01. Ve [este post](https://community.letsencrypt.org/t/acme-v2-production-environment-wildcards/55578) para más información técnica.

## ¿Hay un cliente Let's Encrypt (ACME para mi sistema operativo?

Hay una gran cantidad de [clientes ACME]({{< relref "/docs/client-options.md" >}}) disponibles. Es probable que algo funcione bien en tu sistema operativo. Recomendamos comenzar con [Certbot](https://certbot.eff.org/).

## ¿Puedo utilizar una llave privada o Certificate Signing Request (CSR) existente?

Sí, pero no todos los clientes soportan esta funcionalidad. [Certbot](https://certbot.eff.org/) la tiene.

## ¿Cuáles direcciones de IP usa Let's Encrypt para validar mi servidor de web?

No publicamos una lista de las direcciones IP que usamos para validación, porque pueden cambiar en cualquier momento. En el futuro podremos validar desde múltiples direcciones IP a la vez.

## Renové con éxito un certificado, pero esta vez no se realizó la validación. ¿Cómo es posible?

Una vez hayas completado los retos para el dominio exitosamente, la autorización resultanda es almacenada para tu cuenta para usarla luego nuevamente. Autorizaciones almacenadas duran 30 dias desde el momento de validación.
Si el certificado que solicitaste tiene todas las autorizaciones necesarias almacenadas la validació no volverá a realizarse hasta que caduquen las autorizaciones correspondientes almacenadas.

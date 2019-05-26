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

Este FAQ est&aacute; dividido en las siguientes secciones:

* [Preguntas Generales](#general)
* [Preguntas T&eacute;cnicas](#technical)

# <a name="general">Preguntas Generales</a>

## &iquest;Qu&eacute; servicios ofrece Let's Encrypt?

Let's Encrypt es una Autoridad de Certificaci&oacute;n (AC, or CA por sus siglas en ingl&eacute;s) global. Dejamos que personas y organizaciones alrededor del mundo obtengan, renueven, y manegen certificados SSL/TLS. Nuestros certificados pueden ser usados para sitios de web para habilitar conexiones HTTPS aseguradas.

Let's Encrypt ofrece certificados de Validaci&oacute;n de Dominio (DV por sus siglas en ingl&eacute;s). No ofrecemos Validaciones Extendidas o de Organizaci&oacute;n principalmente porque no podemos automatizar la emisi&oacute;n de esos tipos de certificados.

Para comenzar a usar Let's Encrypt, por favor visita nuestra p&aacute;gina [Comenzando](/es/getting-started/).

## &iquest;Cu&aacute;nto cuesta usar Let's Encrypt? &iquest;Verdaderamente es gratis?

No cobramos tarifas por nuestros certificados. Let's Encrypt es una organizaci&oacute;n sin fines de lucro, nuestra misi&oacute;n es crear un Web más seguro y respetador de la privacidad promoviendo el uso generalizado de HTTPS. Nuestros servicios son gratuitos y f&aacute;ciles de usar para que cada sitio web pueda implementar HTTPS.

Requerimos apoyo de nuestros generosos auspociadores, becarios, e individuos para propocionar nuestros servicios de forma gratuita en todo el mundo. Si est&aacute;s interesado en apoyarnos por favor considere [donar](es/donate/) &oacute; [convertirse en un patrocinador](/es/become-a-sponsor/).

En algunos casos, integradores (por ejemplo, proveedores de hospedaje) cobrar&aacute;n una tarifa nominal que refleja los costos administrativos y de gesti&oacute;n incurridos por la proporci&oacute;n de certificados Let's Encrypt.

## &iquest;Qu&eacute; tipo de apoyo ofrecen?

Let's Encrypt est&aacute; dirigido por un peque&ntilde;o equipo y se basa de la automatizaci&oacute;n para mantener los costos bajos. Siendo ese el caso, no podemos ofrecer apoyo directo a nuestros subscriptores. Sin embargo, tenemos algunas grandes opciones de apoyo: 

1. Tenemos [documentaci&oacute;n](/es/docs/) realmente &uacute;til.
2. Tenemos [foros de apoyo comunitario](https://community.letsencrypt.org/) muy activos y &uacute;tiles. Miembros de nuestra comunidad hacen un gran trabajo contestando preguntas, y muchas de las preguntas m&aacute;s frecuentes ya han sido contestadas.

Aqu&iacute un [video que nos gusta](https://www.youtube.com/watch?v=Xe1TZaElTAs) sobre el poder de un gran apoyo comunitario.

## Un sitio web usando Let's Encrypt est&aacute; involucrado en *Phishing/Malware/Scam/...* , &iquest;qu&eacute; debo hacer?

Recomendamos reportar dichos sitios a Google Safe Browsing y el programa Microsoft Smart Screen, que pueden proteger a los usuarios de una manera m&aacute;s efectiva. Aqu&iacute; est&aacute; el URL de informes de Google:

https://www.google.com/safebrowsing/report_badware/

Si desea leer m&aacute;s sobre nuestras pol&iacute;ticas y nuestra justificaci&oacute;n, puede hacerlo aqu&iacute;:

https://letsencrypt.org/2015/10/29/phishing-and-malware.html

# <a name="technical">Preguntas T&eacute;cnicas</a>

## &iquest;Los certificados de Let's Encrypt son confiados por mi navegador?

Para la mayor&iacute;a de los navegadores y sistemas operativos, s&iacute;. Ve la [lista de compatibilidad](/docs/certificate-compatibility/) para m&aacute;s detalles.

## &iquest;Let's Encrypt emite certificados para cualquier otra cosa que no sea SSL/TLS para sitios web?

Certificados Let’s Encrypt son certificados de Validaci&oacute;n de Dominio est&aacute;ndar, as&iacute; que puedes usarlo para cualquier servidor que use un nombre de dominio, como servidores web, servidores de correo, servidores FTP, y muchos m&aacute;s.

Encripci&oacute;n de email y firma de c&oacute;digo requieren otro tipo de certificado que Let's Encrypt no emite.

## &iquest; Let's Encrypt genera o guarda las llaves privadas para mis certificados en los servidores de Let's Encrypt?

No. Nunca.

La llave privada siempre es generada y gestionada en tu propio servidor, no por la autoridad de certificaci&oacute;n Let's Encrypt.

## &iquest;Cu&aacute;l es el tiempo de vida de un certificado Let's Encrypt? &iquest;Por cu&aacute;nto tiempo son v&aacute;lidos?

Nuestros certificados son v&aacute;lidos por 90 d&iacute;as. Puedes leer acerca de por qu&eacute; [aqu&iacute;](/2015/11/09/why-90-days.html).

No hay forma de ajustar esto, no hay excepciones. Recomendamos renovar tus certificados autom&aacute;ticamente cada 60 d&iacute;as.

## &iquest;Let’s Encrypt emitir&aacute; certificados de Validaci&oacute;n de Organizaci&oacute;n (OV) o Validaci&oacute;n Extendida (EV)?

No tenemos planes de emitir certificados OV &oacute; EV.

## &iquest;Puedo obtener un certificado que tiene varios nombres de dominio (certificados SAN o UCC)?

S&iacute;, el mismo certificado puede contener diferentes nombres de dominio usando el mecanismo de Nombre Alternativo de Sujeto (SAN por sus siglas en ingl&eacute;s).

## &iquest;Let’s Encrypt emite certificados wildcard?

S&iacute;. Emisi&oacute;n wildcard se debe realizar a trav&eacute;s de ACMEv2 usando el reto DNS-01. Ve [este post](https://community.letsencrypt.org/t/acme-v2-production-environment-wildcards/55578) para m&aacute;s informaci&oacute;n t&eacute;cnica.

## &iquest;Hay un cliente Let's Encrypt (ACME para mi sistema operativo?

Hay una gran cantidad de [clientes ACME](/docs/client-options/) disponibles. Es probable que algo funcione bien en tu sistema operativo. Recomendamos comenzar con [Certbot](https://certbot.eff.org/).

## &iquest;Puedo utilizar una llave privada o Certificate Signing Request (CSR) existente?

S&iacute;, pero no todos los clientes soportan esta funcionalidad. [Certbot](https://certbot.eff.org/) la tiene.

## &iquest;Cu&aacute;les direcciones de IP usa Let's Encrypt para validar mi servidor de web?

No publicamos una lista de las direcciones IP que usamos para validaci&oacute;n, porque pueden cambiar en cualquier momento. En el futuro podremos validar desde m&uacute;ltiples direcciones IP a la vez.

## Renov&eacute; con &eacute;xito un certificado, pero esta vez no se realiz&oacute; la validaci&oacute;n. &iquest;C&oacute;mo es posible?

Una vez hayas completado los retos para el dominio exitosamente, la autorizaci&oacute;n resultanda es almacenada para tu cuenta para usarla luego nuevamente. Autorizaciones almacenadas duran 30 dias desde el momento de validaci&oacute;n.
Si el certificado que solicitaste tiene todas las autorizaciones necesarias almacenadas la validaci&oacute; no volver&aacute; a realizarse hasta que caduquen las autorizaciones correspondientes almacenadas.

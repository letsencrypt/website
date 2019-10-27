---
title: Compatibilidad de Certificados
slug: certificate-compatibility
top_graphic: 1
date: 2016-12-05
lastmod: 2016-12-05
---

{{< lastmod >}}

Let's Encrypt tiene como objetivo ser compatible con la mayor cantidad de software posible sin comprometer la seguridad. El principal factor determinante para determinar si una plataforma puede validar los certificados Let's Encrypt es si esa plataforma incluye el certiciado DST Root X3 de IdenTrust en su almacén de confianza. Un factor secundario es si la plataforma admite certificados modernos [SHA-2](https://konklone.com/post/why-google-is-hurrying-the-web-to-kill-sha-1), ya que todos los certificados de Let's Encrypt utiliza SHA-2.

Si su certificado se valida en algunas plataformas con "compatibilidad conocida" pero no en otras, el problema puede ser una configuración incorrecta en el servidor web. Si tiene un problema con las plataformas modernas, la causa más común es la falta de la cadena de certificados correcta. Si tiene un problema con plataformas más antiguas como Windows XP, las causas más comunes son la falta de configuración de una versión de cifrado o TLS que sea compatible con la plataforma o que la plataforma no sea compatible con *Server Name Identification (SNI)*. Pruebe su sitio  con [la prueba de servidor de SSL Labs](https://www.ssllabs.com/ssltest/). Si eso no identifica el problema, solicite ayuda en nuestros [foro de comunidad](https://community.letsencrypt.org/).

Es posible que desees visitar [esta discusión particular del foro de comunidad](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/) para más información sobre compatibilidad.

You may want to visit [esta discusión particular del foro de comunidad](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/) for more information about compatibility.

# Compatibilidad Conocida

* Mozilla Firefox >= v2.0
* Google Chrome
* Internet Explorer en Windows XP SP3 y más alto
* Microsoft Edge
* Android OS >= v2.3.6
* Safari >= v4.0 en macOS
* Safari on iOS >= v3.1
* Debian Linux >= v6
* Ubuntu Linux >= v12.04
* NSS Library >= v3.11.9
* Amazon FireOS (Silk Browser)
* Cyanogen > v10
* Jolla Sailfish OS > v1.1.2.16
* Kindle > v3.4.1
* Java 7 >= 7u111
* Java 8 >= 8u101
* Blackberry >= 10.3.3
* Consola de juego PS4 con firmware >= 5.00

# Incompatabilidad Conocida

* Blackberry < v10.3.3
* Android < v2.3.6
* Nintendo 3DS
* Windows XP antes de SP3
  * no puede manejar certificados firmados con SHA-2
* Java 7 < 7u111
* Java 8 < 8u101
* Windows Live Mail (2012 mail client, no webmail)
  * no puede manejar certificados sin una CRL
* Consola de juegos PS3
* Consola de juegos PS4 con firmware < 5.00

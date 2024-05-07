---
title: Compatibilidad de Certificados
slug: certificate-compatibility
date: 2016-12-05
lastmod: 2016-12-05
show_lastmod: 1
---


Let's Encrypt pretende ser compatible con la mayor cantidad de software posible sin comprometer la seguridad. El principal factor determinante para determinar si una plataforma puede validar los certificados Let’s Encrypt es si esa plataforma incluye el certificado DST Root X3 de IdenTrust en su almacén de confianza. Un factor secundario es si la plataforma admite dispositivos modernos [SHA-2](https://konklone.com/post/why-google-is-hurrying-the-web-to-kill-sha-1) ya que todos los certificados Let's Encrypt usan SHA-2.

Si su certificado se valida en algunas de las plataformas "compatibles conocidas" pero no en otras, el problema puede ser una configuración incorrecta del servidor web. Si tiene un problema con las plataformas modernas, la causa más común suele ser que no se proporciona la cadena de certificados correcta. Si tiene un problema con plataformas más antiguas como Windows XP, las causas más comunes son la falta de configuración de una versión de cifrado o TLS que sea compatible con la plataforma o que la plataforma no sea compatible con la Indicación de Nombre del Servidor (SNI). Pruebe su sitio en [SSL Labs' Server Test](https://www.ssllabs.com/ssltest/). Si eso no identifica el problema, solicite ayuda en los [Foros de la Comunidad](https://community.letsencrypt.org/).

Es posible que desee visitar [esta discusión en particular en el foro de la comunidad Let's Encrypt](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/) para obtener más información sobre la compatibilidad.

# Navegadores o Dispositivos compatibles

* Mozilla Firefox >= v2.0
* Google Chrome
* Internet Explorer on Windows XP SP3 y superiores
* Microsoft Edge
* Android OS >= v2.3.6
* Safari >= v4.0 on macOS
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
* PS4 consola de juego con firmware >= 5.00

# No son compatibles

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

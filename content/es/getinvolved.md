---
title: Involúcrate
slug: getinvolved
top_graphic: 5
lastmod: 2019-01-11
menu:
  main:
    weight: 60
    parent: donate
---

## Comunidad

Siempre podemos ayudar contestando preguntas en [Apoyo Comunitario Let's Encrypt](https://community.letsencrypt.org/). Ve [esta entrada de blog](/2015/08/13/lets-encrypt-community-support.html) para ver por qué son importantes las contribuciones de apoyo comunitario.

## Código

Siempre podemos usar ayuda para el desarrollo de software. Todo nuestro código esta en [GitHub](https://github.com/letsencrypt/).

### Software Cliente

[Certbot](https://github.com/certbot/certbot) es una utilidad basada en Python que trabaja junto a tu servidor web para obtener automáticamente un certificado y convertir un sitio web a HTTPS. Certbot es el cliente que recomendamos para comenzar para la mayoría de las personas. Muchas otras [opciones de terciarios]({{< relref "/docs/client-options.md" >}}) están disponibles.

### Software AC del lado del servidor

[Boulder](https://github.com/letsencrypt/boulder) es la implementación AC de Let's Encrypt. Está basado en el protocolo [ACME](https://github.com/ietf-wg-acme/acme), y escrito primariamente en Go. Un gran lugar para comenzar es con la lista de problemas ['help wanted'](https://github.com/letsencrypt/boulder/labels/help%20wanted) y la [guía de contribuyentes](https://github.com/letsencrypt/boulder/blob/master/CONTRIBUTING.md).

### letsencrypt.org

Puedes mejorar este sitio de web y la documentación [aquí](https://github.com/letsencrypt/website) o ayudar en las [traducciones](https://github.com/letsencrypt/website/blob/master/TRANSLATION.md).

## Protocolo

La AC de Let's Encrypt habla con el software de gestión de certificados corriendo en servidores web. El protocolo para esto se llama ACME, o "Automated Certificate Management Environment". El borrador de especificaciones ACME está [disponible en GitHub](https://github.com/ietf-wg-acme/acme). El trabajo está en marcha dentro del IETF para finalizar ACME como un verdadero estándar abierto. Puedes unirte a la discusión del desarrollo del protocolo ACME en [esta lista de correo del IETF](https://www.ietf.org/mailman/listinfo/acme).

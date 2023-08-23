---
title: Contactar
slug: contact
description: Cómo contactar con nosotros
top_graphic: 1
lastmod: 2021-08-31
menu:
  main:
    weight: 90
    parent: about
---

**No proveemos apoyo mediante correo electrónico (email). Si tienes preguntas de apoyo por favor usa nuestros [foros comunitarios](https://community.letsencrypt.org/). Los correos electrónicos abajo son solamente para esos topicos especificos.**

## Preguntas de la Prensa

Email: [press@letsencrypt.org](mailto:press@letsencrypt.org)

## Patrocinaje

Email: [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## Listas de Correo

Para información sobre varias listas de correo ténicas, por favor visita nuestra página [Involúcrate](/getinvolved).

## Seguridad

**Por favor no escriba a esta dirección de correo electrónico al menos que tu mensaje se refiera a un problema de seguridad con Let's Encrypt.**

<span id="email">Email: </span>

<script>
  var parts = ["security", '@', "letsencrypt", ".", "org"];
  var anchor = document.createElement("a");
  anchor.href = "mailto:" + parts.join("");
  anchor.text = parts.join("");
  document.getElementById("email").appendChild(anchor)
</script>

### Comunicaciones Encriptadas

Para comunicarte de forma segura con el Equipo de Seguridad, por favor utiliza nuestra llave GPG. Consiste de varias subllaves firmadas por una llave "master" mantenida "offline". Cualquier versión reciente de GnuPG tendrá soporte para esta llave híbrida. La estructura actual de la llave es:

```
pub   rsa4096 2015-11-24 [CE] [expires: 2025-09-25]
      0148 3B31 D8F9 DBA2 5D41  4DAA 718E 9F6D 10EC 230B
uid           [ultimate] ISRG Security Team (letsencrypt.org) <security@letsencrypt.org>
sub   rsa4096 2015-11-24 [E] [expires: 2023-09-25]
sub   rsa4096 2015-11-24 [A] [expires: 2023-09-25]
sub   rsa4096 2015-11-24 [S] [expires: 2023-09-25]
```

Puedes decargar la [llave pública GPG](/security_letsencrypt.org-publickey.asc) aquí, o utiliza tu servidor de llave favorito.

La huella digital de la llave debe coincidir con `0148 3B31 D8F9 DBA2 5D41  4DAA 718E 9F6D 10EC 230B`.

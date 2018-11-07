---
title: Encontrando IDs de Cuentas
slug: account-id
top_graphic: 1
date: 2016-08-10
lastmod: 2016-08-10
---

{{< lastmod >}}

Cuando se reportan problemas puede ser &uacute;til proveer tu ID de cuenta Let's Encrypt.
La mayor&iacute;a de las veces, el proceso de creaci&oacute;n de una cuenta se maneja
autom&aacute;ticamente por el software de cliente ACME que utilizas para hablar con Let's Encrypt,
y es posible que tenga m&uacute;ltiples cuentas configuradas si ejecutas clientes ACME en
m&uacute;ltiples servidores.

Tu ID de cuenta es un URL de la forma `https://acme-v01.api.letsencrypt.org/acme/reg/12345678`.
Tambi&eacute;n puedes proveer solo los digitos al final del URL como un *shorthand*.

Si est&aacute;s usando Certbot, puedes encontrar tu ID de cuenta mirando el campo "uri" en `/etc/letsencrypt/accounts/acme-v01.api.letsencrypt.org/directory/*/regr.json`.

Si est&aacute;s usando otro cliente ACME, las instrucciones van a ser dependientes del cliente.
Verifica tus registros por URLs de la forma descrita arriba. Si tu cliente ACME no registra el ID de cuenta, lo puedes recuperar enviando una nueva solicitud de registraci&oacute;n usando la misma llave. Ve la [especificaci&oacute;n ACME para m&aacute;s detalles](https://github.com/ietf-wg-acme/acme/blob/master/draft-ietf-acme-acme.md#registration). Tambi&eacute;n puedes encontrar la forma numerica de tu ID en el *header* Boulder-Request en respuesta a cada POST que tu cliente ACME haga.

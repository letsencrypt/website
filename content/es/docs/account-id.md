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

If you're using another ACME client, the instructions will be client-dependent.
Check your logs for URLs of the form described above. If your ACME client does
not record the account ID, you can retrieve it by submitting a new registration
request with the same key. See the [ACME spec for more
details](https://github.com/ietf-wg-acme/acme/blob/master/draft-ietf-acme-acme.md#registration).
You can also find the numeric form of your ID in the Boulder-Requester header in
the response to each POST your ACME client makes.

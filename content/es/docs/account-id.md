---
title: Encontrando IDs de Cuentas
slug: account-id
top_graphic: 1
date: 2016-08-10
lastmod: 2019-07-30
---

{{< lastmod >}}

Cuando se reportan problemas puede ser útil proveer tu ID de cuenta Let's Encrypt.
La mayoría de las veces, el proceso de creación de una cuenta se maneja
automáticamente por el software de cliente ACME que utilizas para hablar con Let's Encrypt,
y es posible que tenga múltiples cuentas configuradas si ejecutas clientes ACME en
múltiples servidores.

Tu ID de cuenta es un URL de la forma `https://acme-v02.api.letsencrypt.org/acme/acct/12345678` o `https://acme-v01.api.letsencrypt.org/acme/reg/12345678`.

Si estás usando Certbot, puedes encontrar tu ID de cuenta mirando el campo "uri" en `/etc/letsencrypt/accounts/acme-v01.api.letsencrypt.org/directory/*/regr.json`.

Si estás usando otro cliente ACME, las instrucciones van a ser dependientes del cliente.
Verifica tus registros por URLs de la forma descrita arriba. Si tu cliente ACME no registra el ID de cuenta, lo puedes recuperar enviando una nueva solicitud de registración usando la misma llave. Ve la [especificación ACME para más detalles](https://github.com/ietf-wg-acme/acme/blob/master/draft-ietf-acme-acme.md#registration). También puedes encontrar la forma numerica de tu ID en el *header* Boulder-Request en respuesta a cada POST que tu cliente ACME haga.

---
title: Correos Electrónicos de Vencimiento
slug: expiration-emails
top_graphic: 1
date: 2016-07-02
lastmod: 2016-07-02
---

{{< lastmod >}}

# Subscribiendo

Su provees tu direcci&oacute;n de correo electr&oacute;nico a Let's Encrypt cuando creas tu cuenta,
te enviaremos autom&aacute;ticamente avisos de vencimiento/expiraci&oacute;n cuando
tu certificado est&eacute; para renovar. Enviamos el primer aviso a los 20 d&iacute;as
antes de que se venza tu certificado, y m&aacute;s avisos a los 10 d&iacute;as y 1 d&iacute;a antes de que caduque.

# Cuando Recibes Un Correo Electr&oacute;nico de Vencimiento

Si tu certificado ya est&aacute; renovado, no enviaremos un aviso de vencimiento.
Consideramos un certificado por renovar si hay un certificado nuevo con el mismo conjunto de nombres,
sin importar cu&aacute;l cuenta lo cre&oacute;. Si emitiste un nuevo certificado que a&ntilde;ade o elimina un nombre relativo a tu
certificado viejo, recibiras un correo electr&oacute;nico de vencimiento sobre tu viejo certificado. Si verificas el certificado actualmente corriendo en tu sitio web, y muestra la fecha correcta, no se necesita ninguna otra acci&oacute;n.

# Darse de baja (Unsubscribing)

El cuerpo del correo electr&oacute;nico tiene un enlace para darse de baja de futuros avisos.
Si oprimes ese enlace, no recibiras ning&uacute;n aviso de vencimiento por el pr&oacute;ximo a&ntilde;o.
La lista de "qui&eacute;n se di&oacute; de baja" es independiente para avisos de *Staging* y avisos de Producci&oacute;n,
por lo que puedes sentirte libre de darte de baja de *Staging* sin afectar tu estado en la lista de Producci&oacute;n.

Ten en cuenta que tu cancelaci&oacute;n de subscripci&oacute;n solo es v&aacute;lida por un a&ntilde;o, por lo que tendr&aacute; que renovarla cada a&ntilde;o.

A&uacute;n no hay una manera para que podamos volver a subscribirlo de manera eficiente si cancela su subscripci&oacute;n. Nuestro proveedor de correo electr&oacute;nico, Mandrill, [tiene un mecanismo manual que a&uacute;n tenemos que automatizar]((https://mandrill.zendesk.com/hc/en-us/articles/205582947-About-Unsubscribes).

Sin embargo, puedes cambiar la direcci&oacute;n del correo electr&oacute;nico en tu cuenta, lo cual efectivamente te reinscribe. Muchos servicios de correo electr&oacute;nico comunes tratan `yourname+1@example.com` igual a `yourname@example.com`. Por lo tanto, si actualizas tu direcci&oacute; de correo electr&oacute;nico a `yourname+1@example.com`, puedes comenzar a recibir el correo electr&oacute;nico de vencimiento nuevamente. Con Certbot, usa:

` ~/certbot/venv/bin/certbot  register --update-registration --email yourname+1@example.com`

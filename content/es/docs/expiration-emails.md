---
title: Correos Electrónicos de Vencimiento
slug: expiration-emails
top_graphic: 1
date: 2016-07-02
lastmod: 2020-10-28
show_lastmod: 1
---


# Subscribiendo

Su provees tu dirección de correo electrónico a Let's Encrypt cuando creas tu cuenta, te enviaremos automáticamente avisos de vencimiento/expiración cuando tu certificado esté para renovar. Enviamos el primer aviso a los 20 días antes de que se venza tu certificado, y más avisos a los 10 días y 1 día antes de que caduque.

# Cuando Recibes Un Correo Electrónico de Vencimiento

Si tu certificado ya está renovado, no enviaremos un aviso de vencimiento. Consideramos un certificado por renovar si hay un certificado nuevo con el mismo conjunto de nombres, sin importar cuál cuenta lo creó. Si emitiste un nuevo certificado que añade o elimina un nombre relativo a tu certificado viejo, recibiras un correo electrónico de vencimiento sobre tu viejo certificado. Si verificas el certificado actualmente corriendo en tu sitio web, y muestra la fecha correcta, no se necesita ninguna otra acción.

# Darse de baja (Unsubscribing)

El cuerpo del correo electrónico tiene un enlace para darse de baja de futuros avisos. Si oprimes ese enlace, no recibiras ningún aviso de vencimiento por el próximo año. La lista de "quien ha dado de baja" es independiente para los avisos de Staging y avisos de producción, para que puedas darte de baja de Staging sin que afecte tu estado de Producción.

Ten en cuenta que tu cancelación de subscripción solo es válida por un año, por lo que tendrá que renovarla cada año.

Aún no hay una manera para que podamos volver a subscribirlo de manera eficiente si cancela su subscripción. Nuestro proveedor de correo electrónico, Mandrill, [tiene un mecanismo manual que aún tenemos que automatizar](https://mandrill.zendesk.com/hc/en-us/articles/360039299913).

Sin embargo, puedes cambiar la dirección del correo electrónico en tu cuenta, lo cual efectivamente te reinscribe. Muchos servicios de correo electrónico comunes tratan `yourname+1@example.com` igual a `yourname@example.com`. Por lo tanto, si actualizas tu direcció de correo electrónico a `yourname+1@example.com`, puedes comenzar a recibir el correo electrónico de vencimiento nuevamente. Con Certbot, usa:

`certbot update_account --email yourname+1@example.com`

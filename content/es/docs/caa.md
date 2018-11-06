---
title: Autorización de la Autoridad de Certificación (CAA)
slug: caa
top_graphic: 1
date: 2017-07-27
lastmod: 2017-07-27
---

{{< lastmod >}}

CAA es un tipo de record DNS que permite propiertarios de sitios web especificar
cuales Autoridades de Certificaci&oacute;n est&aacute;n permitidas emitir certificados
conteniendo sus nombres de dominio. Fue estandarizado en el 2013 por
[RFC 6844](https://tools.ietf.org/html/rfc6844) para permitir una AC "reducir el riesgo de "

CAA is a type of DNS record that allows site owners to specify which Certificate
Authorities (CAs) are allowed to issue certificates containing their domain names. It
was standardized in 2013 by [RFC 6844](https://tools.ietf.org/html/rfc6844) to
allow a CA "reduce the risk of unintended certificate mis-issue." By default,
every public CA is allowed to issue certificates for any domain name in the
public DNS, provided they validate control of that domain name. That means that
if there's a bug in any one of the many public CAs' validation processes, every
domain name is potentially affected. CAA provides a way for domain holders to
reduce that risk.

# Usando CAA

Si no te importa CAA, generalmente no tienes que hacer nada (pero ve errores CAA abajo).
Si deseas usar CAA para restringir cuales Autoridades de Certificaci&oacute;n est&aacute;n permitidas
emitir certificados para tu dominio, necesitaran un proveedor de DNS que soporte la configuraci&oacute;n
de registros CAA. Comprueba la [p&aacute;gina sobre CAA de SSLMate](https://sslmate.com/caa/support) para una lista de tales proveedores. Si tu proveedor est&aacute; listado, puedes usar el [Generador de Registro CAA de SSLMate](https://sslmate.com/caa/) para generar un set de registros CAA listando los ACs que quieres permitir.

El dominio identificador de Let's Encrypt para CAA es `letsencrypt.org`. Esto es documentado oficialmente [en nuestro Certification Practice Statement (CPS), secci&oacute; 4.2.1](https://letsencrypt.org/repository/).

## D&oacute;nde Poner el Record

Puedes establecer registros CAA en tu dominio principal, o en cualquier profundidad de subdominio.
Por ejemplo, si tuvieras `www.community.example.com`, puedes establecer registros CAA para el nombre completo, &oacute; para `community.example.com`, o para `example.com`. ACs verificar&aacute;n cada versi&aacute;n, desde izquierda a derecha, y para tan pronto vea cualquier registro CAA. Por ejemplo, un registro CAA en `community.example.com` tomar&aacute; precedencia sobre uno en `example.com`. La mayor&iacute;a de las personas que a&ntilde;aden registros CAA queran a&ntilde;adirlos a su dominio registrado (`example.com`) para que aplique a todos los subdominios. Tambi&eacute;n nota que registros CAA para subdominios toman precedencia sobre sus dominios padre sin importar si son m&aaacute;s permisivo o m&aacute;s restrictivo. As&iacute; que un subdominio puede aflojar una restricci&oacute;n puesta en su lugar por un dominio padre.

Validaci&oacute;n CAA sigue CNAMEs, como todas las otras solicitudes de DNS. Si `www.community.example.com` es un CNAME de `web1.example.net`, el AC solicitar&aacute; registros CAA para `www.community.example.com` primero, y luego cuando vea que hay un CNAME para ese nombre de dominio en vez de un registro CAA, solicitar&aacute; registros CAA para `web1.example.net` en su lugar. Nota que si un nombre de dominio tiene un registro CNAME, no est&aacute; permitido tener cualquier otro registro de acuerdo con los est&aacute;ndares de DNS.

El [RFC CAA](https://tools.ietf.org/html/rfc6844) especifica un comportamiento adicional llamado "tree-climbing" que requiere ACs verificar el dominio padre del resultado de la resoluci&oacute;n del CNAME. Este comportamiento adicional fue eliminado por [un erratum](https://www.rfc-editor.org/errata/eid5065), as&iacute; que Let's Encrypt y otras ACs no lo implementan.

# Errores CAA

Como Let's Encrypt verifica registros CAA antes de cada certificado que emitimos, algunas veces recibimos errores hasta para dominios que no tienen registros CAA. Cuando recibimos un error, no hay manera de saber si estamos autorizados emitir para el dominio afectado, ya que puede haber registros CAA que prohiben emisi&oacute;n, pero no son visibles por el error.

Si recibes un errores relacionados con CAA, prueba un par de veces m&aacute;s en nuestro [ambiente *staging*](/docs/staging-environment/) para ver si son temporeros o permanentes. Si son permanentes, necesitar&aacute;s presentar un problema de soporte con tu proveedor de DNS, o cambiar proveedores. Si no est&aacute;s seguro que qui&eacute;n es tu proveedor DNS, preguntale a tu proveedor de hospedaje.

Algunos proveedores de DNS que no est&aacute;n familiarizados con CAA contestan inicialmente al reporte del problema con "No soportamos registros CAA." Tu proveedor de DNS no necesita soportar espec&iacute;ficamente registros CAA; solo necesita contestar con una respuesta NOERROR para tipos de consulta desconocidos (incluyendo CAA). Devolviendo otros opcodes, incluyendo NOTIMP, para qtypes desconocidos es una violaci&oacute;n de [RFC
1035](https://tools.ietf.org/html/rfc1035), y necesita ser arreglado.

# SERVFAIL

Uno de los errores m&aacute;s comunes que personas se encuentran es SERVFAIL. La mayor&iacute;a de las veces esto indica un fallo en la validaci&oacute;n DNSSEC. Si recibes un error SERVFAIL, tu primer paso debe ser usar un debugger DNSSEC como [dnsviz.net](http://dnsviz.net/). Si eso no funciona, es posible que tus nameservers generan firmas incorrectas solamente cuando la respuesta est&aacute; vac&iacute;a. Y respuestas CAA son mayormente vac&iacute;as. Por ejemplo, PowerDNS [tuvo este bug en la version 4.0.3 y abajo](https://community.letsencrypt.org/t/caa-servfail-changes/38298/2?u=jsha).

Si no tienes DNSSEC habilitado y recibes un SERVFAIL, el segundo raz&oacute;n m&aacute;s probable es que tu nameserver autoritario devolvi&oacute; NOTIMP, lo cual es descrito arriba como una violaci&oacute;n del RFC 1035; en su lugar deber&iacute;a volver NOERROR con una respuesta vac&iacute;a. Si este es el caso, presenta un error o ticket de soporte con tu proveedor de DNS.

Por &uacute;ltimo, SERVFAILs pueden ser causados por cortes de servicio en tus nameservers autoritarios. Verifica los registros NS de tus nameservers y asegura que cada servidor est&aacute; disponible.

# Timeout

Algunas veces consultas CAA pueden time out. Es decir, el nameserver autoritario nunca responde con una respuesta, incluso despu&eacute;s de varios reintentos. Com&uacute;nmente esto sucede cuando tu nameserver tiene un firewall mal configurado frente de &eacute;l que deja caer consultas de DNS con qtypes desconocidos. Presenta un ticket de soporte con tu proveedor de DNS y pregunta si tienen configurado tal firewall.

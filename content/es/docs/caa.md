---
title: Autorización de la Autoridad de Certificación (CAA)
slug: caa
top_graphic: 1
date: 2017-07-27
lastmod: 2017-07-27
---

{{< lastmod >}}

CAA es un tipo de record DNS que permite propiertarios de sitios web especificar
cuales Autoridades de Certificación están permitidas emitir certificados
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
Si deseas usar CAA para restringir cuales Autoridades de Certificación están permitidas
emitir certificados para tu dominio, necesitaran un proveedor de DNS que soporte la configuración
de registros CAA. Comprueba la [página sobre CAA de SSLMate](https://sslmate.com/caa/support) para una lista de tales proveedores. Si tu proveedor está listado, puedes usar el [Generador de Registro CAA de SSLMate](https://sslmate.com/caa/) para generar un set de registros CAA listando los ACs que quieres permitir.

El dominio identificador de Let's Encrypt para CAA es `letsencrypt.org`. Esto es documentado oficialmente [en nuestro Certification Practice Statement (CPS), secció 4.2.1](/repository/).

## Dónde Poner el Record

Puedes establecer registros CAA en tu dominio principal, o en cualquier profundidad de subdominio.
Por ejemplo, si tuvieras `www.community.example.com`, puedes establecer registros CAA para el nombre completo, ó para `community.example.com`, o para `example.com`. ACs verificarán cada versián, desde izquierda a derecha, y para tan pronto vea cualquier registro CAA. Por ejemplo, un registro CAA en `community.example.com` tomará precedencia sobre uno en `example.com`. La mayoría de las personas que añaden registros CAA queran añadirlos a su dominio registrado (`example.com`) para que aplique a todos los subdominios. También nota que registros CAA para subdominios toman precedencia sobre sus dominios padre sin importar si son más permisivo o más restrictivo. Así que un subdominio puede aflojar una restricción puesta en su lugar por un dominio padre.

Validación CAA sigue CNAMEs, como todas las otras solicitudes de DNS. Si `www.community.example.com` es un CNAME de `web1.example.net`, el AC solicitará registros CAA para `www.community.example.com` primero, y luego cuando vea que hay un CNAME para ese nombre de dominio en vez de un registro CAA, solicitará registros CAA para `web1.example.net` en su lugar. Nota que si un nombre de dominio tiene un registro CNAME, no está permitido tener cualquier otro registro de acuerdo con los estándares de DNS.

El [RFC CAA](https://tools.ietf.org/html/rfc6844) especifica un comportamiento adicional llamado "tree-climbing" que requiere ACs verificar el dominio padre del resultado de la resolución del CNAME. Este comportamiento adicional fue eliminado por [un erratum](https://www.rfc-editor.org/errata/eid5065), así que Let's Encrypt y otras ACs no lo implementan.

# Errores CAA

Como Let's Encrypt verifica registros CAA antes de cada certificado que emitimos, algunas veces recibimos errores hasta para dominios que no tienen registros CAA. Cuando recibimos un error, no hay manera de saber si estamos autorizados emitir para el dominio afectado, ya que puede haber registros CAA que prohiben emisión, pero no son visibles por el error.

Si recibes un errores relacionados con CAA, prueba un par de veces más en nuestro [ambiente *staging*](/docs/staging-environment/) para ver si son temporeros o permanentes. Si son permanentes, necesitarás presentar un problema de soporte con tu proveedor de DNS, o cambiar proveedores. Si no estás seguro que quién es tu proveedor DNS, preguntale a tu proveedor de hospedaje.

Algunos proveedores de DNS que no están familiarizados con CAA contestan inicialmente al reporte del problema con "No soportamos registros CAA." Tu proveedor de DNS no necesita soportar específicamente registros CAA; solo necesita contestar con una respuesta NOERROR para tipos de consulta desconocidos (incluyendo CAA). Devolviendo otros opcodes, incluyendo NOTIMP, para qtypes desconocidos es una violación de [RFC
1035](https://tools.ietf.org/html/rfc1035), y necesita ser arreglado.

# SERVFAIL

Uno de los errores más comunes que personas se encuentran es SERVFAIL. La mayoría de las veces esto indica un fallo en la validación DNSSEC. Si recibes un error SERVFAIL, tu primer paso debe ser usar un debugger DNSSEC como [dnsviz.net](http://dnsviz.net/). Si eso no funciona, es posible que tus nameservers generan firmas incorrectas solamente cuando la respuesta está vacía. Y respuestas CAA son mayormente vacías. Por ejemplo, PowerDNS [tuvo este bug en la version 4.0.3 y abajo](https://community.letsencrypt.org/t/caa-servfail-changes/38298/2?u=jsha).

Si no tienes DNSSEC habilitado y recibes un SERVFAIL, el segundo razón más probable es que tu nameserver autoritario devolvió NOTIMP, lo cual es descrito arriba como una violación del RFC 1035; en su lugar debería volver NOERROR con una respuesta vacía. Si este es el caso, presenta un error o ticket de soporte con tu proveedor de DNS.

Por último, SERVFAILs pueden ser causados por cortes de servicio en tus nameservers autoritarios. Verifica los registros NS de tus nameservers y asegura que cada servidor está disponible.

# Timeout

Algunas veces consultas CAA pueden time out. Es decir, el nameserver autoritario nunca responde con una respuesta, incluso después de varios reintentos. Comúnmente esto sucede cuando tu nameserver tiene un firewall mal configurado frente de él que deja caer consultas de DNS con qtypes desconocidos. Presenta un ticket de soporte con tu proveedor de DNS y pregunta si tienen configurado tal firewall.

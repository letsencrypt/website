---
title: Autorización de la Autoridad de Certificación (CAA)
slug: caa
top_graphic: 1
date: 2017-07-27
lastmod: 2017-07-27
show_lastmod: 1
---

CAA es un tipo de registro DNS que permite a los propiertarios de los sitios web especificar que Autoridades de Certificación están permitidas a emitir certificados conteniendo sus nombres de dominio. Fue estandarizado en el 2013 por [RFC 6844](https://tools.ietf.org/html/rfc6844) para permitir a una AC "reducir el riesgo de errores de emisión no intencionado de certificados". Por defecto, a toda AC pública le está permitido emitir certificados para cualquier nombre de dominio en el DNS público, siempre y cuando puedan validar el control del nombre de dominio. Eso significa que si hay algún "bug" en cualquiera de las muchas ACs en los procesos de validación todo nombre de dominio es afectado potencialmente. CAA provee una forma para titulares de dominio para reducir el riesgo.

# Usando CAA

Si no vas a usar CAA, generalmente no tienes que hacer nada (sin embargo lee los posibles errores de CAA más abajo en este documento). Si deseas usar CAA para restringir que Autoridades de Certificación están permitidas a emitir certificados para tu dominio, necesitaran un proveedor de DNS que soporte la configuración de registros CAA. Comprueba la [página sobre CAA de SSLMate](https://sslmate.com/caa/support) para una lista de tales proveedores. Si tu proveedor está listado, puedes usar el [Generador de Registro CAA de SSLMate](https://sslmate.com/caa/) para generar un set de registros CAA listando los ACs que quieres permitir.

El dominio identificador de Let's Encrypt para CAA es `letsencrypt.org`. Esto está documentado oficialmente [en nuestro Certification Practice Statement (CPS), secció 4.2.1](/repository).

## Dónde Poner el Registro CAA

Puedes establecer registros CAA en tu dominio principal, o en cualquier profundidad de subdominio. Por ejemplo, si tuvieras `www.community.example.com`, puedes establecer registros CAA para el nombre completo, ó para `community.example.com`, o para `example.com`. Las ACs verificarán cada versión, de izquierda a derecha, y tan pronto vea cualquier registro CAA. Por ejemplo, un registro CAA en `community.example.com` tendrá preferencia sobre uno en `example.com`. La mayoría de las personas que añaden registros CAA queran añadirlos a su dominio registrado (`example.com`) para que aplique a todos los subdominios. Sepa también que registros CAA para subdominios tienen preferencia sobre sus dominios padre sin importar si son más permisivos o más restrictivos. Así que un subdominio puede debilitar una restricción puesta en su lugar por un dominio padre.

La validación CAA sigue CNAMEs, como todas las otras solicitudes de DNS. Si `www.community.example.com` es un CNAME de `web1.example.net`, el AC solicitará registros CAA para `www.community.example.com` primero, y luego cuando vea que hay un CNAME para ese nombre de dominio en vez de un registro CAA, solicitará registros CAA para `web1.example.net` en su lugar. Nota: si un nombre de dominio tiene un registro CNAME, no está permitido tener cualquier otro registro de acuerdo con los estándares de DNS.

El [RFC CAA](https://tools.ietf.org/html/rfc6844) especifica un comportamiento adicional llamado "tree-climbing" que requiere a las ACs verificar el dominio padre del resultado de la resolución del CNAME. Este comportamiento adicional fue eliminado por [un erratum](https://www.rfc-editor.org/errata/eid5065), así que Let's Encrypt y otras ACs no lo implementan.

# Errores CAA

Como Let's Encrypt verifica registros CAA antes de cada certificado que emitimos, algunas veces recibimos errores hasta para dominios que no tienen registros CAA. Cuando recibimos un error, no hay manera de saber si estamos autorizados emitir para el dominio afectado, ya que puede haber registros CAA que prohiben emisión, pero no son visibles por el error.

Si recibes un error relacionado con CAA, prueba un par de veces más en nuestro [ambiente *staging*](/docs/staging-environment) para ver si son temporales o permanentes. Si son permanentes, necesitarás contactar con el equipo de soporte de tu proveedor de DNS, o cambiar de proveedore. Si no estás seguro que quién es tu proveedor DNS, preguntale a tu proveedor de hospedaje.

Algunos proveedores de DNS que no están familiarizados con CAA contestan inicialmente al reporte del problema con "No soportamos registros CAA." Tu proveedor de DNS no necesita soportar específicamente registros CAA; solo necesita contestar con una respuesta NOERROR para tipos de consulta desconocidos (incluyendo CAA). Devolviendo otros opcodes, incluyendo NOTIMP, para qtypes desconocidos es una violación de [RFC 1035](https://tools.ietf.org/html/rfc1035), y necesita ser arreglado.

# SERVFAIL

Uno de los errores más comunes que algunas personas se encuentran es SERVFAIL. La mayoría de las veces esto indica un fallo en la validación DNSSEC. Si recibes un error SERVFAIL, tu primer paso debe ser usar un debugger DNSSEC como [dnsviz.net](http://dnsviz.net/). Si eso no funciona, es posible que tus nameservers generen firmas incorrectas solamente cuando la respuesta está vacía. Y respuestas CAA son mayormente vacías.  Por ejemplo, PowerDNS [tuvo este bug en la version 4.0.3 y abajo](https://community.letsencrypt.org/t/caa-servfail-changes/38298/2?u=jsha).

Si no tienes DNSSEC habilitado y recibes un SERVFAIL, la segunda razón más probable es que tu nameserver autoritario devolvió NOTIMP, lo cual es descrito arriba como una violación del RFC 1035; en su lugar debería volver NOERROR con una respuesta vacía. Si este es el caso, presenta un error o ticket de soporte con tu proveedor de DNS.

Por último, los SERVFAILs pueden ser causados por cortes de servicio en tus nameservers autoritarios. Verifica los registros NS de tus nameservers y asegura que cada servidor está disponible.

# Timeout

Algunas veces las consultas CAA pueden dar como resultado time out. Es decir, el nameserver autoritario nunca responde con una respuesta, incluso después de varios reintentos. Comúnmente esto sucede cuando tu nameserver tiene un firewall mal configurado que impide las consultas de DNS con qtypes desconocidos. Presenta un ticket de soporte con tu proveedor de DNS y pregunta si tienen configurado tal firewall.

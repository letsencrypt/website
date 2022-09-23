---
title: Limitaciones
slug: rate-limits
top_graphic: 1
date: 2018-01-04
lastmod: 2019-06-04
show_lastmod: 1
---


Let's Encrypt proporciona límites de solicitudes para garantizar un uso justo por parte de todos los solicitantes de certificados. Creemos que estos límites de solicitud son lo suficientemente altos como para funcionar de manera predeterminada con la mayoría de las personas. También los hemos diseñado para que la renovación de un certificado casi nunca alcance un límite de solicitudes y por lo tanto las organizaciones pueden aumentar gradualmente la cantidad de certificados que pueden emitir sin requerir la intervención de Let's Encrypt.

Si está desarrollando o probando activamente un cliente Let's Encrypt, por favor utilice el [entorno de prueba](/docs/staging-environment) en lugar de la API de producción.
Si está trabajando para integrar Let's Encrypt como proveedor o con un servidor de alojamientos web, por favor [revise nuestra guía de integración](/docs/integration-guide).

El límite principal es <a id="certificates-per-registered-domain"></a> **Certificados por Dominio Registrado** (50 por semana). Un dominio registrado es, en general, la parte del dominio que compró a su registrador de nombres de dominio. Por ejemplo, en el nombre `www.example.com`, el dominio registrado es` example.com`. En `new.blog.example.co.uk` el dominio registrado es` example.co.uk`. Usamos la [Lista de sufijos públicos](https://publicsuffix.org) para calcular el dominio registrado.

Si tiene muchos subdominios, es posible que desee combinarlos en un solo certificado, hasta un límite de 100 <a id="names-per-certificate"></a>**Nombres por Certificado**. Combinado con el límite anterior, eso significa que puede emitir certificados que contienen hasta 5,000 subdominios únicos por semana. Un certificado con varios nombres a menudo se denomina certificado SAN o, a veces, un certificado UCC. Note: Por razones de rendimiento y confiabilidad, es mejor usar menos nombres por certificado siempre que pueda.

Las renovaciones se tratan especialmente: no cuentan contra su límite de **Certificados por Dominio Registrado**, pero están sujetas a un límite de **Certificados Duplicados** que es de 5 por semana. Nota: las renovaciones se usaron para contar en su Certificado por límite de Dominio registrado hasta marzo de 2019, [pero esto ya no se hace](https://community.letsencrypt.org/t/rate-limits-fixing-certs-per-name-rate-limit-order-of-operations-gotcha/88189).

Un certificado se considera una renovación (o un duplicado) de un certificado anterior si contiene exactamente el mismo conjunto de nombres de host, ignorando las mayúsculas y el orden de los nombres de host. Por ejemplo, si solicitó un certificado para los nombres
[`www.example.com`,` example.com`], puede solicitar cuatro certificados más para [`www.example.com`,` example.com`] durante una semana. Si cambia el conjunto de nombres de host agregando [`blog.example.com`], podrá solicitar certificados adicionales.

Una renovación ignora la clave pública y las extensiones solicitadas. La emisión de un certificado puede considerarse una renovación incluso si está utilizando una nueva clave.

**La revocación de certificados no restablece los límites de solicitudes**, porque los recursos utilizados para emitir esos certificados ya se han consumido.

Existe un límite de 5 <a id="failed-validations"></a> **Validaciones Fallidas** por cuenta, por hostname, por hora. Este límite es mayor en nuestro [entorno de prueba](/docs/staging-environment), por lo que puede usar ese entorno para depurar problemas de conectividad.

Los puntos finales "new-reg", "new-authz" y "new-cert" tienen un límite de 20 <a id="overall-requests"></a> **Solicitudes generales**  por segundo. El punto final "/directorio" y el directorio y subdirectorios "/acme" tienen un límite de 40 solicitudes generales por segundo.

Tenemos otros dos límites con los que es muy poco probable que te encuentres.

Puede crear un máximo de 10 <a id="accounts-per-ip-address"></a> **Cuentas por dirección IP** en un periodo de 3 horas. Usted puede
cree un máximo de 500 **Cuentas por rango de IP** dentro de un IPv6/48 en un periodo de 3 horas. Alcanzar cualquiera de los límites de la tasa de cuenta es muy raro, y recomendamos a los grandes integradores que usen un diseño [una cuenta para muchos clientes](/docs/integration-guide).

Puede tener un máximo de 300 <a id="pending-authorizations"> </a> **Autorizaciones pendientes** en su cuenta. Alcanzar este límite de velocidad es raro y ocurre con mayor frecuencia cuando se desarrollan clientes ACME. Por lo general, significa que su cliente está creando autorizaciones y no las está cumpliendo. Utilice nuestro [entorno de pruebas](/docs/staging-environment) si está desarrollando un cliente ACME.

Los usuarios de la API ACME v2, puede crear un máximo de 300 <a id="new-orders"> </a> **Nuevos pedidos** por cuenta en un período de 3 horas.

# <a id="overrides"></a>Anulaciones

Si ha alcanzado un límite de solicitudes, no tenemos forma de restablecerlo temporalmente. Tendrá que esperar hasta que el límite de la tarifa caduque después de una semana. Utilizamos una ventana deslizante, por lo que si emitió 25 certificados el lunes y 25 certificados más el viernes, podrá emitir nuevamente a partir del lunes. Puede obtener una lista de certificados emitidos para su dominio registrado al [buscar en crt.sh](https://crt.sh), que utiliza los registros públicos [Transparencia de certificado](https://www.certificate-transparency.org).

Si es un gran proveedor o proveedor de hosting que trabaja en una integración Let's Encrypt, disponemos de un 
[formulario](https://forms.gle/JVKTgfMYUm7dLjfq5) que se puede utilizar para solicitar un límite de tarifa más alto. El procesamiento de solicitudes demora algunas semanas, por lo que este formulario no es adecuado si solo necesita restablecer un límite de solicitudes más rápido del que se restablece por sí solo.

Tenga en cuenta que la mayoría de los proveedores de alojamiento no necesitan aumentos de límite de solicitudes, porque no hay límite en la cantidad de dominios registrados distintos para los que puede emitir. Mientras la mayoría de sus clientes no tengan más de 2,000 subdominios en un dominio registrado, lo más probable es que no necesite un aumento. Consulte nuestra [Guía de integración](/docs/integration-guide) para obtener más consejos.

# <a id="clearing-pending"></a>Eliminar autorizaciones pendientes

Si tiene una gran cantidad de objetos de autorización pendientes y está recibiendo un error de limite de solicitudes, puede activar un intento de validación para esos objetos de autorización enviando un POST firmado por JWS a uno de sus desafíos, como se describe en la [especificación ACME](https://tools.ietf.org/html/rfc8555#section-7.5.1).
Los objetos de autorización pendientes están representados por URL de la forma `https://acme-v02.api.letsencrypt.org/acme/authz/XYZ`, y deben aparecer en los registros de sus clientes. Tenga en cuenta que no importa si la validación tiene éxito o falla.
Cualquiera de los dos sacará la autorización del estado 'pendiente'. Si no tiene registros que contengan las URL de autorización relevantes, debe esperar a que caduque el límite de solicitudes. Como se describió anteriormente, hay una ventana deslizante, por lo que esto puede tomar menos de una semana, dependiendo de su patrón de emisión.

Tenga en cuenta que tener una gran cantidad de autorizaciones pendientes es generalmente el resultado de un cliente defectuoso. Si está alcanzando este límite de solicitudes con frecuencia, debe verificar su código de cliente.


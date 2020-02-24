---
title: Guia de Integración
slug: integration-guide
linkTitle: Client and Large Provider Integration Guide
top_graphic: 1
date: 2016-08-08
lastmod: 2019-10-18
---

{{< lastmod >}}

Si usted es un proveedor de alojamiento o un sitio web que integra Let's Encrypt o si está escribiendo software de cliente para Let's Encrypt, este documento contiene consejos que le resultarán útiles. 

# Pensando en el futuro

Tanto Let's Encrypt como Web PKI seguirán evolucionando con el tiempo. Debe asegurarse de tener la capacidad de actualizar fácilmente todos los servicios que usan Let's Encrypt. Si también está implementando clientes que dependen de los certificados Let's Encrypt, asegúrese especialmente de que esos clientes reciban actualizaciones periódicas.

En el futuro, es probable que estas cosas cambien:

  * los certificados raíz e intermedios desde los que emitimos
  * los algoritmos hash que usamos al firmar certificados
  * los tipos de claves y la fortaleza de las mismas para las cuales estamos dispuestos a firmar certificados de entidad final
  * y el protocolo ACME

Siempre trataremos de anticiparnos a dichos cambios con la mayor rapidez, aunque si se encuentra un fallo de seguridad grave en algún componente, es posible que tengamos que hacer cambios a muy corto plazo o de inmediato. Para los cambios intermedios en particular, no debe usar el intermedio para codificar, sino usar el [`Link: rel="up"`](https://tools.ietf.org/html/draft-ietf-acme-acme-03#section-6.3.1) encabezado del protocolo ACME, ya que es probable que los intermedios cambien.

Del mismo modo, es probable que cambiemos la URL de los términos de servicio (ToS) a medida que la actualizamos.
Evite codificar la URL de ToS y confíe en el [`Link: rel="terms-of-service"`](https://tools.ietf.org/html/draft-ietf-acme-acme-03#section-6.2) encabezado para determinar qué URL ToS usar.

También querrá una manera de mantener actualizada su configuración TLS a medida que se encuentren nuevos ataques en conjuntos de cifrado o versiones de protocolo.

# Obtener actualizaciones

Para recibir actualizaciones menores sobre cambios importantes como los descritos anteriormente, suscríbase a nuestro grupo
[Anuncios de API](https://community.letsencrypt.org/t/about-the-api-announcements-category/23836) .
Esto es útil tanto para desarrolladores de clientes como para proveedores de hosting.

Para actualizaciones importantes sobre mantenimientos e interrupciones, visite nuestra [página de estado](https://letsencrypt.status.io/) y presione Suscribirse en la esquina superior derecha. Esto es más útil para los proveedores de hosting.

Además, asegúrese de utilizar una dirección de correo electrónico válida para su cuenta ACME. Utilizaremos ese correo electrónico para enviarle avisos de vencimiento y comunicarnos sobre cualquier problema específico de su cuenta.

# ¿ Quién es el suscriptor ?

Nuestro {{<link "Acuerdo de CPS y Suscriptor" "/repository" >}} indica que el Suscriptor es quien posee la clave privada para un certificado. Para los proveedores de hosting, ese es el proveedor, no el cliente del proveedor. Si está escribiendo software que las personas implementan, ese es quien está implementando el software.

El correo electrónico de contacto proporcionado al crear cuentas (también conocido como registros) debe ir al Suscriptor. Le enviaremos un correo electrónico a esa dirección para advertirle de los certificados que expiran y notificarle sobre los cambios en nuestra {{<link "política de privacidad" "/privacy" >}}. Si usted es un proveedor de alojamiento, esas notificaciones deberían llegarle a usted en lugar de a un cliente. Lo ideal sería configurar una lista de correo o un alias, para que varias personas puedan responder a las notificaciones, en caso de que esté de vacaciones.

El resultado de esto es que, si usted es un proveedor de alojamiento, no necesita enviarnos las direcciones de correo electrónico de sus clientes ni hacer que acepten nuestro Acuerdo de Suscriptor. Simplemente puede emitir certificados para los dominios que controla y comenzar a usarlos.

# ¿ Una cuenta o muchas ?

En ACME, es posible crear una cuenta y usarla para todas las autorizaciones y emisiones, o crear una cuenta por cliente. Esta flexibilidad puede ser valiosa. Por ejemplo, algunos proveedores de hosting pueden querer usar una cuenta por cliente y almacenar las claves de la cuenta en diferentes contextos, de modo que una clave de la cuenta comprometida no permita la emisión de todos sus clientes.

Sin embargo, para la mayoría de los proveedores de alojamiento más grandes, recomendamos usar una sola cuenta y proteger bien la clave de cuenta correspondiente. Esto hace que sea más fácil identificar los certificados que pertenecen a la misma entidad, es más fácil mantener actualizada la información de contacto y es más fácil proporcionar ajustes de límites de tarifas si es necesario. No podremos ajustar efectivamente los límites de las tasas si se utilizan muchas cuentas diferentes.

# Certificados (SAN) Multi-dominio 

Nuestra {{<link "política de emisión" "/docs/rate-limits" >}} permite hasta 100 nombres por certificado. Depende de usted si utiliza un certificado separado para cada nombre de host o si agrupa muchos nombres de host en una pequeña cantidad de certificados.

El uso de certificados separados por nombre de host significa que se requieren menos partes móviles para agregar y eliminar dominios a medida que se aprovisionan y retiran. Los certificados separados también minimizan el tamaño del certificado, lo que puede acelerar los saludos HTTPS en redes de bajo ancho de banda.

Por otro lado, el uso de certificados grandes con muchos nombres de host le permite administrar menos certificados en general. Si necesita admitir clientes antiguos como Windows XP que no admiten la Indicación de nombre de servidor TLS ([SNI](https://en.wikipedia.org/wiki/Server_Name_Indication)), necesitará una dirección IP única para cada certificado , por lo que poner más nombres en cada certificado reduce la cantidad de direcciones IP que necesitará.

Para la mayoría de las implementaciones, ambas opciones ofrecen la misma seguridad.

# Almacenamiento y reutilización de certificados y claves

Una gran parte del valor de Let's Encrypt es que permite la emisión automática como parte del aprovisionamiento de un nuevo sitio web. Sin embargo, si tiene una infraestructura que puede crear repetidamente nuevas interfaces para el mismo sitio web, esas interfaces primero deben intentar usar un certificado y una clave privada del almacenamiento local, y solo emitir una nueva si no hay un certificado disponible, o si todos los certificados existentes han expirado.

A Let's Encrypt, esto le ayuda a proporcionar servicios de manera eficiente a la mayor cantidad de personas posible. A usted, esto le garantiza que pueda implementar su sitio web siempre que lo necesite, independientemente del estado de Let's Encrypt.

Como ejemplo, muchos sitios están comenzando a usar Docker para aprovisionar nuevas instancias frontend según sea necesario. Si configura sus contenedores Docker para que emitan certificados cuando se inician, y no almacena estos certificados y claves de forma duradera, es probable que alcance los límites de solicitudes si abre demasiadas instancias a la vez. En el peor de los casos, si tiene que destruir y volver a crear todas sus instancias a la vez, puede terminar en una situación en la que ninguna de sus instancias pueda obtener un certificado, y su sitio se rompe durante varios días hasta que el límite de solicitudes expira. Sin embargo, este tipo de problema no es exclusivo de los límites de solicitudes. Si Let's Encrypt no está disponible por algún motivo cuando necesita abrir sus interfaces, tendría el mismo problema.

Tenga en cuenta que algunas filosofías de implementación establecen que las claves criptográficas nunca deben abandonar la máquina física en la que se generaron. Este modelo puede funcionar bien con Let's Encrypt, siempre y cuando se asegure de que las máquinas y sus datos sean duraderos y administre los límites de solicitudes con cuidado.

# Elegir un tipo de desafío

Si está utilizando el desafío http-01 ACME, deberá proporcionar la respuesta del desafío a cada una de sus interfaces antes de notificar a Let's Encrypt que está listo para cumplir el desafío. Si tiene una gran cantidad de interfaces, esto puede ser un problema. En ese caso, es probable que usar el desafío dns-01 sea más fácil. Por supuesto, si tiene muchos respondedores DNS distribuidos geográficamente, debe asegurarse de que el registro TXT esté disponible en cada respondedor.

Además, cuando utilice el desafío dns-01, asegúrese de limpiar los registros TXT antiguos para que la respuesta a la consulta de Let's Encrypt no sea demasiado lenta.

Si de todos modos desea utilizar el desafío http-01, puede aprovechar las redirecciones HTTP. Puede configurar cada una de sus interfaces para redirigir /.well-known/acme-validation/XYZ a validation-server.example.com/XYZ para todo XYZ. Esto delega la responsabilidad de la emisión al servidor de validación, por lo que debe proteger bien ese servidor.

# Servidores centrales de validación

En relación con los dos puntos anteriores, puede tener sentido, si tiene muchas interfaces, usar un subconjunto más pequeño de servidores para administrar la emisión. Esto facilita el uso de redireccionamientos para la validación http-01 y proporciona un lugar para almacenar certificados y claves de forma duradera.

# Implementar OCSP Stapling

Muchos navegadores buscarán el OCSP de Let's Encrypt cuando carguen su sitio. Este es un [problema de rendimiento y privacidad](https://blog.cloudflare.com/ocsp-stapling-how-cloudflare-just-made-ssl-30/). Idealmente, las conexiones a su sitio no deberían esperar una conexión secundaria a Let's Encrypt. Además, las solicitudes de OCSP le dicen a Let's Encrypt qué sitios visitan las personas. Tenemos una buena política de privacidad y no registramos detalles de identificación individual de las solicitudes de OCSP, preferimos ni siquiera recibir los datos en primer lugar. Además, anticipamos nuestros costos de ancho de banda para servir OCSP cada vez que un navegador visita un sitio Let's Encrypt por primera vez, supone una gran parte de nuestros gastos de infraestructura.

Al activar el OCSP Stapling ( engrapado OCSP ), puede mejorar el rendimiento de su sitio web, proporcionar mejores protecciones de privacidad para sus usuarios y ayudar a Let's Encrypt a servir de manera eficiente a la mayor cantidad de personas posible.

# Configuración del cortafuegos

Para usar Let's Encrypt, debe permitir el tráfico del puerto de salida 443 desde las máquinas que ejecutan su cliente ACME. No publicamos los rangos de IP para nuestro servicio ACME, y cambiarán sin previo aviso.

Para el desafío ACME "http-01", debe permitir el tráfico entrante del puerto 80. No publicamos los rangos de IP desde los que 
realizamos la validación, y cambiarán sin previo aviso.

Nota: Recomendamos siempre permitir el acceso HTTP simple a su servidor web, con una redirección a HTTPS. Esto proporciona una mejor experiencia al usuario ante un servidor web que rechaza o deja caer las conexiones del puerto 80 y proporciona el mismo nivel de seguridad.

Para todos los desafíos, debe permitir el tráfico entrante del puerto 53 (TCP y UDP) a sus servidores DNS autorizados.

# Algoritmos de clave admitidos

Let's Encrypt acepta claves RSA de 2048 a 4096 bits de longitud, y claves ECDSA P-256 y P-384. Eso es cierto tanto para las claves de cuenta como para las claves de certificado. No puede reutilizar una clave de cuenta como clave de certificado.

Nuestra recomendación es servir una configuración de doble certificado, ofreciendo un certificado RSA por defecto y un certificado 
ECDSA (mucho más pequeño) a aquellos clientes que indiquen que lo soportan.

# HTTPS por defecto

Para los proveedores de hosting, nuestra recomendación es emitir automáticamente certificados y configurar HTTPS para todos los 
nombres de host que controle, y ofrecer una configuración configurable por el usuario para redirigir las URL HTTP a sus equivalentes HTTPS. Recomendamos que para las cuentas existentes, la configuración esté deshabilitada de manera predeterminada, pero para las 
cuentas nuevas, la configuración estará habilitada de manera predeterminada.

Razonamiento: es probable que los sitios web existentes incluyan algunos recursos secundarios HTTP (scripts, CSS e imágenes). Si esos sitios se redirigen automáticamente a sus versiones HTTPS, los navegadores bloquearán algunos de esos subrecursos debido al bloqueo de contenido mixto. Esto puede romper la funcionalidad en el sitio. Sin embargo, alguien que cree un nuevo sitio y descubra que redirige a HTTPS probablemente incluirá solo recursos secundarios HTTPS, porque si intentan incluir un recurso secundario HTTP notarán de inmediato que no funciona.

Recomendamos que los clientes establezcan un encabezado HTTP Strict-Transport-Security (HSTS) con una edad máxima predeterminada de sesenta días. Sin embargo, esta configuración debe ir acompañada de una advertencia de que si el cliente necesita pasar a un proveedor de alojamiento que no ofrece HTTPS, la configuración HSTS almacenada en caché en los navegadores hará que su sitio no esté disponible. Además, tanto el cliente como el proveedor de alojamiento deben tener en cuenta que el encabezado HSTS convertirá los errores del certificado en fallas graves. Por ejemplo, mientras que las personas generalmente pueden hacer clic a través de un navegador advirtiendo sobre una falta de coincidencia de nombre o un certificado caducado, los navegadores no permiten hacer clic para nombres de host con un encabezado HSTS activo.

# Cuando renovar

Recomendamos renovar los certificados automáticamente cuando les quede un tercio de su vida útil total. Para los certificados actuales de 90 días de Let's Encrypt, eso significa renovar 30 días antes del vencimiento.

Si está emitiendo más de 10,000 nombres de host, también recomendamos la renovación automática en pequeñas ejecuciones, en lugar de agrupar las renovaciones en grandes bloques.
Esto reduce el riesgo: si Let's Encrypt tiene una interrupción en el momento en que necesita renovar, o si hay una falla temporal en
sus sistemas de renovación, solo afectará a algunos de sus certificados, en lugar de a todos. También facilita nuestra planificación 
de capacidad.

Es posible que desee emitir certificados de forma masiva para que todos sus dominios comiencen rápidamente, lo cual está bien. Luego puede extender los tiempos de renovación haciendo un proceso único de renovación de algunos certificados 1 día antes de cuando normalmente renovaría, algunos de ellos 2 días antes, y así sucesivamente.

Si ofrece software de cliente que configura automáticamente un trabajo por lotes periódico, asegúrese de ejecutarlo a una hora y minuto aleatorizados durante el día, en lugar de hacerlo siempre a una hora específica. Esto garantiza que Let's Encrypt no reciba picos arbitrarios de tráfico en la parte superior de la hora. Dado que Let's Encrypt necesita aprovisionar capacidad para cumplir con la carga máxima, reducir los picos de tráfico puede ayudar a mantener nuestros costos bajos.

# Revisando fallos

Los fallos de renovación no debe ser tratados como un error fatal. Debe implementar una lógica de reintento elegante en sus servicios de emisión utilizando un patrón de retroceso exponencial, maximizando una vez al día por certificado. Por ejemplo, un cronograma razonable de retroceso sería: 1er reintento después de un minuto, 2º reintento después de diez minutos, tercer reintento después de 100 minutos, 4º y reintentos posteriores después de un día. Por supuesto, debe tener una forma para que los administradores puedan solicitar reintentos anticipados por dominio o globalmente.

Los retrasos en el reintento significan que su software de emisión debe realizar un seguimiento de los fallos y los éxitos, y verificar si hubo un fallo reciente antes de intentar una nueva emisión. No tiene sentido intentar la emisión cientos de veces por hora, ya que es probable que los fallos se repitan persistentemente

Todos los errores se deben enviar al administrador encargado, para ver si es necesario solucionar problemas específicos.


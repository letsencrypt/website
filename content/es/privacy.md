---
title: Política de privacidad
slug: privacy
top_graphic: 4
date: 2019-09-19
lastmod: 2019-12-05
english_is_canonical: 1
---

{{< lastmod >}}

La Política de privacidad de Let's Encrypt describe cómo recopilamos, usamos y divulgamos su información en tres contextos diferentes:

* Cuando, como parte confiable, visita un sitio web protegido con HTTPS que utiliza un certificado de Let's Encrypt,
* Cuando es un suscriptor, es decir, cuando solicita y usa certificados de Let's Encrypt,
* Cuando visite el sitio web Let’s Encrypt, el foro de discusión de la comunidad, otras páginas web en letsencrypt.org y sitios de redes sociales de terceros en los que Let’s Encrypt opera una cuenta.

## Como parte confiable

Cuando utiliza un sitio web HTTPS u otro servicio TLS con un certificado Let's Encrypt, su navegador (o cliente TLS) puede consultar a Let’ Encrypt para verificar si el certificado ha sido revocado ("solicitud OCSP"). Si su navegador realiza una solicitud de OCSP, nuestros servidores registrarán automáticamente su dirección IP, navegador y sistema operativo en archivos de registro temporal del servidor. No utilizamos datos de solicitudes de OCSP para crear perfiles o identificar personas. Los registros temporales del servidor se utilizan solo con fines operativos y normalmente se eliminan en menos de siete días. Podemos retener un subconjunto de registros del servidor por períodos más largos para investigar fallos o abusos de software. Si lo hacemos, eliminaremos los registros almacenados cuando hayamos terminado de investigar. También podemos calcular, retener y publicar información agregada de los registros del servidor, como qué certificados generan el mayor volumen de solicitudes. Siempre nos esforzaremos por garantizar que dichos conjuntos de datos no contengan información sobre las actividades de usuarios o dispositivos identificables.

## Como suscriptor

Si es un suscriptor, está solicitando un certificado de confianza de Let’s Encrypt con la intención de garantizar públicamente que controla un determinado nombre de dominio o nombres accesibles en Internet. Como parte del proceso de probar ese control, Let's Encrypt recopilará diversa información relacionada con la autenticación y administración de certificados. Esa información incluye las direcciones IP desde las cuales accede al servicio Let’s Encrypt; todas las direcciones IP resueltas para cualquier nombre de dominio solicitado, información del servidor relacionada con cualquier solicitud de validación, registros completos de todas las solicitudes entrantes HTTP / ACME, todas las solicitudes de validación salientes e información enviada o inferida de su software de cliente. Almacenaremos esta información durante un mínimo de siete años, tanto por necesidad contractual como por interés público. Necesitamos poder demostrar al público, incluidos aquellos que confían en nuestros certificados, que nuestros servicios funcionan como se espera. Como resultado, es posible que no podamos eliminar la información, incluidas las direcciones IP. Esta información puede hacerse pública de varias maneras, incluso a través de API pública, repositorios públicos y / o debates públicos.

Es posible que tenga la opción de proporcionar información de contacto, como su dirección de correo electrónico, para fines de servicio de cuenta y recuperación. Su información de contacto no se hará pública y solo se compartirá de acuerdo con el “Cumplimiento de la ley y circunstancias atenuantes”. Al proporcionar su dirección de correo electrónico, usted acepta recibir nuestros correos electrónicos relacionados con el servicio. Puede darse de baja de los correos electrónicos relacionados con el servicio en cualquier momento haciendo clic en el enlace "cancelar suscripción" en la parte inferior de nuestros correos electrónicos o contactándonos en [security@letsencrypt.org](mailto:security@letsencrypt.org). No utilizaremos su información de contacto con fines de marketing o promocionales.

Es posible que deba descargar el software del cliente desde un repositorio como los ejecutados por Debian, Ubuntu, Red Hat o Github. Su interacción con dicho repositorio de software se rige por la política de privacidad y / o los Términos de uso de dicho repositorio.

## Como Visitante

Cuando usted es un visitante que navega por el sitio web Let’s Encrypt, tiene la opción de hacer una donación. Las donaciones son procesadas por nuestros socios de pago de confianza, incluidos DonorBox, Stripe y PayPal, según el método de pago seleccionado. Recopilamos su nombre y dirección de correo electrónico cuando realiza una donación. No utilizaremos su dirección de correo electrónico para contactarlo sin su consentimiento. Sus interacciones con [DonorBox](https://donorbox.org/privacy), [Stripe](https://stripe.com/privacy/) y [PayPal](https://www.paypal.com/us/webapps/mpp/ua/privacy-full) se rigen por sus respectivas políticas de privacidad. No recopilamos ni retenemos ninguna tarjeta de crédito o información bancaria relacionada con donaciones. Si recopilamos una dirección física, solo conservaremos la información de su dirección física durante el tiempo que sea razonablemente necesario para realizar el envío que solicitó.

Tiene la opción de proporcionar su dirección de correo electrónico para recibir el boletín de Let’s Encrypt mediante un registro en este sitio web y mediante otros materiales de marketing. El boletín se entrega a través de MailChimp y sus interacciones con MailChimp se rigen por su política de privacidad. Ocasionalmente, podemos usar su dirección de correo electrónico para enviar comunicaciones personalizadas relacionadas con Let's Encrypt. No vendemos su información. Puede solicitar que se elimine su dirección de correo electrónico de nuestra lista mediante la exclusión a través de MailChimp o enviándonos un correo electrónico a [press@letsencrypt.org](mailto:press@letsencrypt.org)

Si se registra para utilizar el foro de soporte comunitario Let's Encrypt, la información personal que proporcione y sus acciones allí se regirán por la política de privacidad de nuestro proveedor de alojamiento y software para el foro, [Kit de construcción de discurso civilizado](https://www.discourse.org/privacy). No recopilamos ni mantenemos información personal a través de nuestra oferta de este foro de soporte.

Además, utilizamos Google Analytics para medir el tráfico y las páginas populares en nuestro sitio web. Como parte de ese servicio, colocamos cookies de Google Analytics en nuestro sitio. Estas cookies no contienen información personal, pero pueden identificar de forma exclusiva el software de su navegador cuando visita  nuestro sitio. Respetamos el encabezado [No rastrear](http://donottrack.us/) al limitar estrictamente la información que nuestros servicios de análisis pueden recopilar y compartir para todos los Visitantes.

## Cumplimiento de la ley y circunstancias atenuantes

En la medida en que la poseamos, podemos divulgar información de identificación personal sobre usted a terceros en circunstancias limitadas. Dichas circunstancias incluyen cuando tenemos su consentimiento o cuando creemos de buena fe que es requerido por la ley, como en virtud de una citación u otra orden judicial o administrativa. También podemos divulgar información de recuperación de cuenta cuando creamos de buena fe que es necesario para evitar la pérdida de vidas, lesiones personales, daños a la propiedad o daños financieros significativos.

Si la ley nos exige que divulguemos la información que ha enviado, intentaremos proporcionarle un aviso previo (a menos que nos lo prohíban, o sería inútil) que se haya realizado una solicitud de su información para proporcionarle una oportunidad para objetar la divulgación. Intentaremos proporcionar este aviso por cualquier medio que sea razonablemente práctico. Si no impugna la solicitud de divulgación, es posible que tengamos la obligación legal de entregar su información.

Además, nos reservamos el derecho, únicamente a nuestra discreción, de oponernos de manera independiente a ciertas solicitudes (de acceso a la información sobre los usuarios de nuestros productos y tecnologías) que consideramos inadecuadas.

## ¿Qué derechos tienen las partes confiables, suscriptores y visitantes del Espacio Económico Europeo bajo GDPR y cómo puedo ejercerlos?

Procesamos datos personales como se describe en esta política. Confiamos en su consentimiento para enviar correos electrónicos. Cuando recopilamos la dirección IP, procesamos esos datos en función de la necesidad contractual de poder demostrar que el servicio funciona como se espera. Tenga en cuenta que es posible que no podamos eliminar la información, incluidas las direcciones IP, ya que esta información es necesaria para que otros confíen en la determinación de la confiabilidad de nuestros certificados. En algunos casos, podemos procesar datos personales de conformidad con la obligación legal o para proteger sus intereses vitales o los de otra persona.

Las personas ubicadas en el Espacio Económico Europeo (EEE) tienen ciertos derechos con respecto a su información personal, incluido el derecho a acceder, corregir o eliminar los datos personales que procesamos a través de su uso del sitio. Si usted es una parte confiable, suscriptor o visitante en el EEE, puede:

* Solicite un informe de datos personales enviándonos un correo electrónico a security@letsencrypt.org. Este informe incluirá los datos personales que tenemos sobre usted, proporcionados en un formato estructurado, de uso común y portátil. Tenga en cuenta que podemos solicitarle información adicional para verificar su identidad antes de divulgar cualquier información.
* Solicite que su información sea corregida o eliminada contactando con nosotros en security@letsencrypt.org.
* Objetar a que procesemos su información. Puede solicitarnos que dejemos de usar su información, incluso cuando la usemos para enviarle correos electrónicos de servicio. Puede retirar su consentimiento para recibir correos electrónicos de servicio en cualquier momento haciendo clic en el enlace "cancelar suscripción" que se encuentra en los correos electrónicos de Let's Encrypt.
* Quejarse a un regulador. Si tiene su sede en el EEE y cree que no hemos cumplido con las leyes de protección de datos, tiene derecho a presentar una queja ante su autoridad de supervisión local.

Para obtener más información o para informar un problema de privacidad, comuníquese con: [security@letsencrypt.org](mailto:security@letsencrypt.org)

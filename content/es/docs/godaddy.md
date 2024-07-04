---
title: "Let's Encrypt certificados en GoDaddy Hosting"
slug: godaddy
date: 2019-12-02
lastmod: 2019-12-02
show_lastmod: 1
---


Recibimos muchas preguntas acerca de cómo utilizar Let’s Encrypt en GoDaddy. Si utilizas el web hosting compartido de GoDaddy, actualmente es muy difícil instalar un certificado de Let’s Encrypt, así que actualmente no recomendamos el utilizar nuestros certificados en GoDaddy. Eso es debido a que GoDaddy no soporta el [protocolo ACME ](https://tools.ietf.org/html/rfc8555) para la emisión y renovación automatizada de certificados. En su lugar, GoDaddy ofrece una renovación automatizada con sus propios certificados, que son una [característica de coste añadido](https://www.godaddy.com/web-security/ssl-certificate).

No recomendamos el uso de certificados de Let’s Encrypt en proveedores de alojamiento que no implementan directamente el protocolo ACME, porque significa que no puedes automatizar completamente las renovaciones. Creemos que las renovaciones automatizadas son una parte muy importante de utilizar certificados. Usar software para automatizar la renovación hace que sea mucho menos probable que tu certificado caduque sin ser reemplazado. Si tu certificado caduca, es muy frustrante para tus usuarios porque no pueden acceder a tu sitio.

Debido a que creemos firmemente en la renovación automatizada, diseñamos nuestros certificados para ser usados con automatización ACME. El certificado de Let’s Encrypt está pensado para que se renueve automáticamente después de 60 días y dejará de trabajar después de 90 días si no se renueva.

Si, después de revisar los problemas anteriores, decidiste que te gustaría tratar de mantener un certificado de Let’s Encrypt en el alojamiento compartido de GoDaddy, entonces GoDaddy [proporciona las instrucciones](https://www.godaddy.com/help/install-a-lets-encrypt-certificate-on-your-cpanel-hosting-account-28023). Ten en cuenta que seguir estas instrucciones consume mucho tiempo, y se espera que lo hagas cada 60 días (no cada 90 días como se describe en la página vinculada).

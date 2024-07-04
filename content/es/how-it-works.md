---
title: Cómo Funciona
linkTitle: Cómo Funciona Let's Encrypt
slug: how-it-works
lastmod: 2019-10-18
show_lastmod: 1
---


El objetivo de Let's&nbsp;Encrypt y el [protocolo ACME](https://tools.ietf.org/html/rfc8555) es hacer posible configurar un servidor HTTPS y permitir que este genere automáticamente un certificado válido para navegadores, sin ninguna intervención humana.  Esto se logra ejecutando un agente de administración de certificados en el servidor web.

Para entender cómo funciona la tecnología, veamos cómo sería el proceso para configurar `https://example.com/` con un agente de administración de certificados que soporte Let's&nbsp;Encrypt.

Hay dos paso en este proceso.  Primero, el agente le demuestra a la autoridad certificadora (CA) que el servidor controla el dominio.  Posteriormente, el agente puede solicitar, renovar y revocar certificados del dominio.

## Validación de Dominio

Let's&nbsp;Encrypt identifica al administrador del servidor mediante llave publica.  La primera vez que el software del agente interactúa con Let's&nbsp;Encrypt, genera un nuevo par de llaves y demuestra al Let's&nbsp;Encrypt CA que el servidor controla uno o más dominios.  Esto es similar al proceso tradicional de un AC de crear una cuenta y agregar dominios a esa cuenta.

Para iniciar el proceso, el agent le pregunta al Let's&nbsp;Encrypt CA lo que hay que hacer para demostrar que controla `example.com`.  El Let's Encrypt CA mirará el nombre de dominio que se solicita y emitirá uno o más conjuntos de retos.   Estas son diferentes maneras que el agente puede demostrar control sobre el dominio.  Por ejemplo, la AC puede darle al agente la opció de:

* Provisionar un record DNS record bajo `example.com`, ó
* Provisionar un recurso HTTP bajo un *well-known URI* en `http://example.com/`

Junto con los retos, el Let's Encrypt CA también provee un `nonce` que el agente debe firmar con su par de llave privada para demostrar que controla el par de llaves.

<div class="howitworks-figure">
<img alt="Solicitando retos para validar example.com"
     src="/images/howitworks_challenge.png"/>
</div>

El software de agente completa uno de los conjuntos de retos proveidos.   Digamos que es capaz de realizar la segunda tarea anterior: crea un archivo en un *path* especifico en el site `http://example.com`.  El agente también firma el `nonce` proveído con su llave privada.  Una vez el agente ha completado estos pasos, notifica la AC que está listo para completar la validación.

Luego, es el trabajo de la AC verificar los que retos han sido satisfechos.  La AC verifica la firma en el `nonce`, e intenta descargar un archivo del servidor web y hacerse seguro que recibió el contenido esperado.

<div class="howitworks-figure">
<img alt="Solicitando autorización para actuar por example.com"
     src="/images/howitworks_authorization.png"/>
</div>

Si la firma sobre el `nonce` es válida, y los retos son válidos, entonces el agente identificado por su llave pública está autorizado a realizar la gestión de certificados para `example.com`.  Llamamos el par de llaves que el agente usó un "par de llaves autorizado" para `example.com`.


## Emisión y Revocación de Certificados

Una vez el agente tenga un par de llaves autorizado, solicitando, renovando, y revocando certificados es simple---solo envia mensajes de manejamiento de certificados y firmalos con el par de llaves autorizado.

Para obtener un certificado para un dominio, el agente construye un PKCS#10 [Certificate Signing Request](https://tools.ietf.org/html/rfc2986) que le pregunta al AC Let's&nbsp;Encrypt que emita un certificado para `example.com` con una llave pública espeficificada.  Como siempre, el CSR incluye una firma por la llave privada correspondiente a la llave pública en el CSR.  El agent también firma el CSR entero con la llave autorizada para `example.com` de manera que el Let's&nbsp;Encrypt CA sepa que está autorizado.

Cuando el Let's&nbsp;Encrypt CA recibe una solicitud, verifica ambas firmas.  Si todo se ve bien, emite un certificado para `example.com` con la llave pública del CSR y lo devuelve al agente.

<div class="howitworks-figure">
<img alt="Solicitando un certificado para example.com"
     src="/images/howitworks_certificate.png"/>
</div>

Revocación funciona de una manera similar.  El agent firma una solicitud de revocación con el par de llaves autorizado para `example.com`, y el Let's&nbsp;Encrypt CA verifica que la solicitud es autorizada.  Si lo es, publica información de revocación a los canales normales de revocación (i.e. OCSP), para que los confiados tales como navegadores pueden saber que no deben aceptar el certificado recovado.

<div class="howitworks-figure">
<img alt="Solicitando revocación del certifiado para example.com"
     src="/images/howitworks_revocation.png"/>
</div>




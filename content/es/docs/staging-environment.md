---
title: Entorno de prueba
slug: staging-environment
top_graphic: 1
date: 2018-01-05
lastmod: 2019-09-16
---

{{< lastmod >}}

Recomendamos encarecidamente realizar pruebas en nuestro entorno de ensayo antes de utilizar nuestro entorno de producción. Esto le permitirá hacer las cosas bien antes de emitir certificados de confianza y reducirá la posibilidad de que se enfrente a los límites de solicitudes.

La URL ACME del [entorno de prueba ACME v2](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605) es:

`https://acme-staging-v02.api.letsencrypt.org/directory`

Si está utilizando Certbot, puede utilizar nuestro entorno de prueba con el indicador `--dry-run`. Para otros clientes de ACME, lea sus instrucciones para obtener información sobre las pruebas con nuestro entorno de prueba. Tenga en cuenta que el entorno de prueba v2 requiere un cliente ACME compatible con v2.

# Limites

El entorno de prueba usa el mismo sistema de límites descritos para el [entorno de producción](https://letsencrypt.org/es/docs/rate-limits/) con las siguientes excepciones:

* El límite de **Certificados por Dominio Registrado** es de 30,000 por semana.
* El límite de **Certificados Duplicados** es de 30,000 per semana.
* El límite de **Validaciones Fallidas** es de 60 por hora.
* El límite de **Cuentas por dirección IP** es de 50 cuentas en un periodo de 3 horas por IP.
* Para ACME v2, el límite de **Nuevas Peticiones** es de 1,500 solicitudes nuevas en un periodo de 3 horas por cuenta.

# Root Certificate

El certificado intermedio para el entorno de prueba (["Fake LE Intermediate X1"](https://letsencrypt.org/certs/fakeleintermediatex1.pem)) es emitido por un certificado raíz **que no está presente** en el almacen de certificados del navegador del cliente. Si desea modificar un cliente para confiar en el entorno de prueba con el fin de hacer tests, puede hacerlo agregando el certificado ["Fake LE Root X1"](https://letsencrypt.org/certs/fakelerootx1.pem) a su almacen de certificados de confianza. Importante: No agregue la raíz provisional o intermedia a una tienda de confianza que use para la navegación ordinaria u otras actividades, ya que no se auditan ni cumplen con los mismos estándares que nuestras raíces de producción, por lo que no es seguro usarlas para nada más que las pruebas.

# Transparencia de certificado

El entorno de prueba envía pre-certificados a Let's Encrypt [Testflume](/docs/ct-logs) y a Google [testtube](http://www.certificate-transparency.org/known-logs#TOC-Test-Logs) CT test logs e incluye SCT devueltos en los certificados emitidos.

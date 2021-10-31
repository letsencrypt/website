---
title: Ambiente de Testes
slug: staging-environment
top_graphic: 1
date: 2018-01-05
lastmod: 2018-03-12
show_lastmod: 1
---


Recomendamos fortemente que sejam feitos testes em nosso ambiente de testes antes de usar nosso ambiente de produção. Isso permite que você entenda todo o processo antes de emitir certificados confiáveis e reduz a chance de você esbarrar em nosso limites de requisições.

A URL ACME do nosso [ambiente de testes ACME v2](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605) (Inglês) é:

`https://acme-staging-v02.api.letsencrypt.org/directory`

Se você estiver usando o Certbot, pode acessar nosso ambiente de testes com o parâmetro `--dry-run`. Para outros clientes ACME consulte os respectivos manuais para obter informações sobre testes em nosso ambiente de teste. Note que o ambiente de testes v2 requer um cliente ACME v2 compatível. 

# Limites de Requisições

O ambiente de testes usa os mesmos limites [descritos para o ambiente de produção](/pt-br/docs/rate-limits/) com as seguintes exceções:

* O limite de **Certificados por Domínio Registrado** é de 30 mil por semana.
* O limite de **Certificados Duplicados** é de 30 mil por semana.
* O limite de **Falhas de Validação** é de 60 por hora.
* O limite de **Contas por Endereço IP** é de 50 contas por período de 3 horas por IP.
* Para o protocolo ACME v2, o limite de **Novas Ordens** é de 1500 novas ordens por período de 3 horas por conta.

# Certificado Raiz

O certificado intermediário do ambiente de testes (["(STAGING) Artificial Apricot R3"](/certs/staging/letsencrypt-stg-int-r3.pem)) é emitido por um certificado raiz **que não está presente** nos trust stores de navegadores/clientes. Se você quiser modificar um cliente exclusivo para testes para que ele confie no ambiente de testes você pode adicionar o certificado ["(STAGING) Pretend Pear X1"](/certs/staging/letsencrypt-stg-root-x1.pem) ao trust store do seu cliente. Importante: Não adicione os certificados raiz e intermediários do ambiente de testes em navegadores que você usa para navegação comum da web, porque eles não são auditados nem mantêm o mesmo padrão de segurança que nossas raízes de produção, portanto não são seguros para uso em nada além de testes.

# Transparência de Certificado

O ambiente de testes envia os pré-certificados para os registros TC do Google [testtube](http://www.certificate-transparency.org/known-logs#TOC-Test-Logs) e retorna SCTs nos certificados emitidos.

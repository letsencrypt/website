---
title: FAQ
linkTitle: Perguntas Frequentes (FAQ)
slug: faq
top_graphic: 1
date: 2017-07-06
lastmod: 2017-07-06
menu:
  main:
    weight: 30
    parent: about
---

{{< lastmod >}}

Esta página de Perguntas Frequentes está dividida nas seguintes seções:

* [Questões Gerais](#general)
* [Questões Técnicas](#technical)

# <a name="general">Questões Gerais</a>

## Que serviços a Let's Encrypt oferece?

A Let's Encrypt é uma Autoridade Certificadora (AC) global. Nós possibilitamos que pessoas e organizações do mundo todo obtenham, renovem e gerenciem certificados SSL/TLS. Nossos certificados podem ser usados por páginas da web para habilitar conexões seguras HTTPS.

A Let’s Encrypt oferece Validação de Domínio (VD). Nós não oferecemos Validação de Organização (VO) ou Validação Estendida (VE) principalmente porque não podemos automatizar a emissão de certificados destes tipos. 

Para começar a usar a Let's Encrypt, por favor visite nossa página [Começando a Usar](/pt-br/getting-started/).

## Quanto custa usar a Let's Encrypt? Ela é gratuita mesmo?

Não cobramos taxas por nossos certificados. A Let's Encrypt é uma organização sem fins lucrativos, nossa missão é criar uma web mais segura e que respeita a privacidade do usuário promovendo a adoção em larga escala do HTTPS. Nossos serviços são gratuitos e fáceis de se usar de maneira que qualquer site pode adotar o HTTPS.

Nós dependemos do suporte de generosos patrocinadores, doadores e indivíduos para manter nossos serviços gratuitos ao redor do mundo. Se você está interessado em nos ajudar por favor considere [fazer uma doação](/pt-br/donate) ou [se tornar um patrocinador](/pt-br/become-a-sponsor).

Em alguns casos, integradores (como serviços de hospedagem) podem cobrar uma taxa que reflete os custos administrativos internos que eles têm ao oferecer suporte a certificados da Let's Encrypt.

## Que tipo de suporte vocês oferecem?

A Let's Encrypt é mantida por um time pequeno que depende de automação para manter os custos baixos. Assim sendo, não somos capazes de oferecer suporte direto a nossos usuários. Porém temos algumas ótimas formas de suporte:

1. Nós temos uma [documentação](/pt-br/docs) muito útil.
2. Nós temos um [fórum de suporte à comunidade](https://community.letsencrypt.org/c/help/ajuda-em-portugues) muito ativo e auxiliador. Membros da nossa comunidade fazem um ótimo trabalho respondendo questões e muitas perguntas comuns já foram respondidas.

Este é um [vídeo que gostamos](https://www.youtube.com/watch?v=Xe1TZaElTAs) (Inglês) sobre o poder da comunidade de suporte.

## Um site que usa a Let's Encrypt está envolvido em Phishing/Malware/Golpes... o que devo fazer?

Recomendamos reportar estes sites ao Google Safe Browsing e ao programa Microsoft Smart Screen, que são capazes de proteger usuários de maneira mais eficiente. Esta é o endereço de denúncia do Google:

https://www.google.com/safebrowsing/report_badware/

Se você quiser ler mais sobre nossas políticas e motivações, você pode fazê-lo aqui (Inglês):

https://letsencrypt.org/2015/10/29/phishing-and-malware.html

# <a name="technical">Questões Técnicas</a>

## Meu navegador confia nos certificados da Let’s Encrypt?

A resposta para a maioria dos navegadores e sistemas operacionais é: sim. Veja a [lista de compatibilidade](/docs/certificate-compatibility/) (Inglês) para mais detalhes.

## A Let's Encrypt emite certificados SSL/TLS para outros serviços que não sejam websites?

Os certificados da Let's Encrypt são certificados padrão de Validação de Domínio, então você pode usá-los em qualquer servidor que use um nome de domínio, como servidores web, servidores de e-mail, servidores FTP e muitos outros.  

A encriptação de e-mail e assinatura de código requerem um tipo diferente de certificado que a Let's Encrypt não emite.

## A Let's Encrypt gera ou armazena as chaves privadas dos meus certificados em seus servidores?

Não. Nunca.

A chave privada é sempre gerada e gerenciada pelo seu próprio servidor, nunca pela Let's Encrypt.

## Qual é o ciclo de vida dos certificados da Let's Encrypt? Por quanto tempo eles são válidos?

Nossos certificados são válidos por 90 dias. Você pode ler mais sobre o motivo [aqui](/2015/11/09/why-90-days.html) (Inglês).  

Não é possível mudar isso, não existem exceções. Recomendamos que seja feita a renovação automática dos seus certificados a cada 60 dias.

## A Let's Encrypt vai emitir certificados de Validação de Organização (VO) e Validação Estendida (VE) algum dia?

Não temos planos para emissão de certificados VO ou VE.

## Posso emitir um certificado para múltiplos nomes de domínio (certificados SAN ou UCC)?

Sim, o mesmo certificado pode conter diferentes nomes de domínio usando o mecanismo Subject Alternative Name (SAN).

## A Let's Encrypt emite certificados coringa?

Sim. A emissão de certificados coringa precisa ser feita via ACMEv2 usando o desafio DNS-01. Veja [esta postagem](https://community.letsencrypt.org/t/acme-v2-production-environment-wildcards/55578) (Inglês) para obter mais informações técnicas.

## Existe um cliente da Let's Encrypt (ACME) para o meu sistema operacional?

Existe uma grande quantidade de [clientes ACME](/docs/client-options/) (Inglês) disponível. Há uma boa chance de que algum deles funciona bem no seu sistema operacional. Recomendamos começar usando o [Certbot](https://certbot.eff.org/). 

## Posso usar uma chave privada já existente ou uma Solicitação de Assinatura de Certificado (SAC)?

Sim, mas nem todos os clientes suportam essa funcionalidade. O [Certbot](https://certbot.eff.org/) suporta.

## Quais endereços IP a Let's Encrypt usa para validar meu servidor web?

Não publicamos uma lista de endereços IP usados na validação porque eles podem mudar com o tempo. No futuro podemos começar a validar usando vários endereços de IP simultaneamente.

## Eu renovei um certificado sem problemas mas a validação não foi executada desta vez - como isso é possível?
Uma vez que você completa corretamente os desafios para um domínio, a autorizaçào resultante é armazenada em cache na sua conta para ser utilizada novamente depois. Autorizações armazenadas em cache duram 30 dias a partir da data da validação.
Se o certificado que você solicitou ainda possui todas as validações necessárias armazenadas em cache então o processo de validação não será executado novamente até que estas informações armazenadas expirem.

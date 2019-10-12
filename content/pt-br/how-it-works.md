---
title: Como a Let's Encrypt Funciona
linkTitle: Como a Let's Encrypt Funciona
slug: how-it-works
top_graphic: 3
lastmod: 2019-09-09
---

O objetivo da Let's&nbsp;Encrypt e do [protocolo ACME](https://ietf-wg-acme.github.io/acme/) é tornar possível a configuração de um servidor HTTPS e fazê-lo obter automaticamente um certificado confiável sem intervenção humana. Isso é realizado através do uso do agente de gerenciamento de certificado no servidor web.

Para entender como a tecnologia funciona, vamos analisar o passo a passo do processo de configuração do domínio `https://example.com/` com um agente de gerenciamento de certificado que suporta a Let's&nbsp;Encrypt. 

Este processo tem duas etapas: Primeiro o agente comprova para a AC que o webservice controla um domínio. Então, o agente pode solicitar, renovar e revogar certificados para este domínio.

## Validação de Domínio

A Let's&nbsp;Encrypt identifica o administrador do servidor usando uma chave pública. Na primeira vez em que o software agente interage com a Let's&nbsp;Encrypt é gerado um par de chaves que prova à AC Let's&nbsp;Encrypt que o servidor controla um ou mais domínios. Isto é semelhante ao processo tradicional de AC de criação de uma conta e adição de domínio para esta conta.

Para iniciar o processo o agente pergunta à AC Let's&nbsp;Encrypt o que ele precisa fazer para provar que ele controla o domínio `example.com`. A AC Let's&nbsp;Encrypt irá analisar o nome de domínio sendo requisitado e fornecerá um ou mais desafios. Estes desafios são formas diferentes que o agente pode usar para provar que controla o domínio. Por exemplo, a AC pode exigir que o agente execute uma ou mais dos seguintes desafios:

* Fornecer um registro de DNS sob `example.com`, ou
* Fornecer um arquivo HTTP em determinado diretório sob `http://example.com/`

Juntamente com os desafios, a AC Let's&nbsp;Encrypt também provê um pacote de dados que o agente precisa assinar com sua chave privada para provar que ele controla o par de chaves. 

<div class="howitworks-figure">
<img alt="Requesting challenges to validate example.com"
     src="/images/howitworks_challenge.png"/>
</div>

Vamos assumir que o agente é capaz de completar a segunda tarefa: ele cria um arquivo em um caminho especificado em `http://example.com`. O agente também assina o pacote de dados providos com sua chave privada. Uma vez que ele termina estes passos, ele notifica a AC que está pronto para concluir a validação.  

Agora é responsabilidade da AC verificar que os desafios foram completados. A AC verifica a assinatura no pacote de dados e tenta fazer o download do arquivo especificado no servidor web e se certifica de que ele possui o conteúdo esperado.

<div class="howitworks-figure">
<img alt="Requesting authorization to act for example.com"
     src="/images/howitworks_authorization.png"/>
</div>

Se a assinatura no pacote de dados é válida e os desafios foram corretamente completados, o agente identificado pela chave pública é autorizado a cuidar do gerenciamento de certificados de `example.com`. Nós chamamos o par de chaves usado pelo agente de "par de chavez autorizado" para `example.com.

## Emissão e Revogação de Certificado

Uma vez que o agente possui um par de chaves autorizado, o processo de solicitação, renovação e revogação de certificados é simples - basta enviar mensagens de gerenciamento de certificados assinando-as usando o par de chavez autorizado.

Para obter um certificado para o domínio, o agente constroi um PKCS#10 [Solicitação de Assinatura de Certificado](https://tools.ietf.org/html/rfc2986) que solicita à Let's&nbsp;Encrypt a emissão de um certificado para `example.com` com a chave pública especificada. Como de praxe, a SAC inclui uma assinatura usando a chave privada correspondente à chave pública contida na SAC. O agente também assina a SAC completa usando a chave autorizada para `example.com` para que a Let's&nbsp;Encrypt saiba que a solicitação é autorizada. 

Quando a Let's&nbsp;Encrypt recebe a solicitação ambas as assinaturas são validadas. Se tudo estiver certo, ele emite um certificado para `example.com` com a chave pública da SAC e o devolve ao agente.

<div class="howitworks-figure">
<img alt="Requesting a certificate for example.com"
     src="/images/howitworks_certificate.png"/>
</div>

A revogação funciona de maneira similar. O agente assina a solicitação de revogação com o par de chaves autorizado para `example.com` e a Let's&nbsp;Encrypt verifica se a solicitação é autorizada. Se for autorizada, a Let's&nbsp;Encrypt publica a informação de revogação em canais normais de revogação (como por exemplo OCSP), de maneira que terceiros que dependem de certificados (como navegadores) saibam que não devem confiar no certificado revogado.

<div class="howitworks-figure">
<img alt="Requesting revocation of a certificate for example.com"
     src="/images/howitworks_revocation.png"/>
</div>


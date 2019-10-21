---
title: Autorização de Autoridade Certificadora (AAC)
slug: caa
top_graphic: 1
date: 2017-07-27
lastmod: 2017-07-27
---

{{< lastmod >}}

AAC é um tipo de registro DNS que permite que donos de sites especifiquem quais Autoridades
Certificadoras (ACs) podem emitir certificados contendo seus nomes de domínio. Ele
foi padronizado em 2013 pela [RFC 6844](https://tools.ietf.org/html/rfc6844) (Inglês) para
permitir que uma AC "reduza o risco de falha de emissão não intencional de certificados". Por padrão,
cada AC pública pode emitir certificados para qualquer nome de domínio disponível 
em DNS público, desde que elas validem o controle sobre aquele nome de domínio. Isso significa que
se existe um bug em qualquer um dos muitos processos de validação de ACs públicas, todos
os nomes de domínio são potencialmente afetados. O CAA é uma forma que donos de domínios
podem reduzir este risco.

# Usando AAC

Se você não se importa com AAC, geralmente não precisa fazer nada (mas veja a lista
de erros de AAC abaixo). Se você gostaria de usar AAC para restringir quais Autoridades
Certificadoras podem emitir certificados para o seu domínio, você vai precisar usar um
provedor DNS que suporte a definição de registros AAC. Confira [a página AAC 
do SSLMate](https://sslmate.com/caa/support) (Inglês) onde há uma lista destes provedores. Se o seu
provedor estiver listado, você pode usar 
[o Gerador de Registro AAC do SSLMate](https://sslmate.com/caa/) (Inglês) para gerar um
conjunto de registros AAC listando as ACs que você gostaria de autorizar.

O domínio identificador da Let's Encrypt é `letsencrypt.org`. Isso é 
documentado oficialmente [no nosso Certification Practice Statement
(CPS), seção 4.2.1]({{< ref "/repository.md" >}}) (Inglês).

## Onde usar o registro

Você pode definir registros AAC no seu domínio principal ou em qualuqer nível de subdomínios.
Por exemplo, se você fosse o dono de `www.community.example.com`, poderia definir registros AAC
para o nome completo, para `community.example.com` ou para `example.com`. ACs
verificarão cada versão, da esquerda para direita, e parar assim que encontrarem qualquer
registro AAC. Então, por exemplo, um registro AAC em `community.example.com` teria 
precedência sobre um em `example.com`. A maior parte das pessoas que adicionam registro AAC vão querer
adicioná-lo ou domínio registrado (`example.com`) para que ele se aplique a todos
os subdomínios. Note também que registros AAC de subdomínios têm precedência sobre os
domínios pais não importando se eles são mais permissivos ou menos 
restritivos. Logo, um subdomínio pode afrouxar restrições impostas por um domínio pai.

A Validação AAC segue CNAMEs, como todos as outras requsições DNS. Se 
`www.community.example.com` é um CNAME para `web1.example.net`, a AC primeiro
fará requisições de registros AAC para `www.community.example.com`, depois, vendo que existe
um CNAME para aquele nome de domínio invés de registros AAC, fará requisições AAC para
`web1.example.net`. Note que se um nome de domínio possui um registro CNAME, ele não
pode ter outros registros, de acordo com os padrões de DNS.

A [CAA RFC](https://tools.ietf.org/html/rfc6844) (Inglês) especifica um comportamento
adicional chamado "tree-climbing" que requer que ACs também verifiquem os domínios
pai do resultado da resolução de CNAME. Este comportamento adicional foi removido
mais tarde [por errata](https://www.rfc-editor.org/errata/eid5065) (Inglês), desta forma a Let's 
Encrypt e outras ACs não o implementam.

# Erros de AAC

Como a Let's Encrypt verifica os registros AAC antes de emitir qualquer certificado, as vezes
acontecem erros mesmo para domínios que não usam registros AAC. Quando estes
erros acontecem, não há como sabermos se podemos ou não realizar a emissão para o 
domínio afetado, devido poder existir registros AAC que proíbem a emissão, 
mas não estão visíveis devido ao erro.

Se você está recebendo erros relacionados a AAC, tente mais algumas vezes em nosso [ambiente
de testes](/pt-br/docs/staging-environment/) para ver se eles
são temporários ou permanentes. Se eles forem permanentes, você precisará relatar
o problema ao seu provedor DNS ou trocar de provedor. Se você não tem certeza 
sobre qual é o seu provedor DNS, pergunte do seu provedor de hospedagem.

Alguns provedores DNS que não são familiares com AAC normalmente respondem a este tipo de problema
com "Não suportamos registros AAC". O seu provedor DNS não precisa 
suportar especificamente registros AAC, ele só precisa responder com
NOERROR a requisições de tipo desconhecidos (incluindo AAC). Retornar outros
opcode, incluindo NOTIMP, para tipos de requisições desconhecidos é uma violação da [RFC 
1035](https://tools.ietf.org/html/rfc1035) (Inglês) e precisa ser corrigido.

# SERVFAIL

Um dos erros mais comuns encontrados é o SERVFAIL. Na maioria das vezes isso
indica uma falha na validação DNSSEC. Se você receber um erro SERVFAIL, seu
primeiro passo deve ser usar um debugger DNSSEC como o
[dnsviz.net](http://dnsviz.net/). Se isso não funcionar é possível que seus
nameservers estão gerando assinaturas incorretas quando a resposta é vazia, sendo que
respostas AAC são normalmente vazias. Por exemplo o PowerDNS [tinha esse bug
nas versões 4.0.3 e inferiores](https://community.letsencrypt.org/t/caa-servfail-changes/38298/2?u=jsha) (Inglês).

Se você não tem DNSSEC ativo e recebe o erro SERVFAIL, a segunda causa mais provável
é que o seu nameserver autoritativo retornou o código NOTIMP, que é descrito 
acima como uma violação à RFC 1035. Ele deveria estar retornando o código NOERROR com uma
resposta vazia. Se este for o caso, reporte um bug ou crie um ticket de suporte com o seu provedor DNS.

Por último, erros SERVFAILs podem ser causados devido a nameservers autoritativos estarem fora do ar.
Verifique os registros NS do seu nameserver e certifique-se que cada servidor está
disponível.

# Tempo limite esgotado

Algumas vezes requisições AAC esgotam o tempo limite de execução. Isto deve-se ao nameserver autoritativo nunca
responder, mesmo após múltiplas tentativas. Muito comumente isso
acontece quando o seu nameserver usa um firewall mal configurado que 
recusa requisições DNS com tipos desconhecidos. Reporte isso ao suporte do seu provedor
DNS e pergunte se eles têm um firewall configurado desta forma.

---
title: Limites de Requisições
slug: rate-limits
top_graphic: 1
date: 2018-01-04
lastmod: 2019-04-15
---

{{< lastmod >}}

A Let's Encrypt implementa limites de requisições para garantir uma utilização justa
pela maior quantidade de pessoas possível. Acreditamos que estes limites são altos o suficiente para
funcionar sem problemas para a maioria das pessoas. Também pensamos nos limites de maneira que renovar
um certificado quase nunca atinge o limite de requisições, e que grandes 
organizações possam aumentar gradualmente o número de certificados que eles podem solicitar
sem precisar de intervenção da Let's Encrypt.

Se você está ativamente desenvolvendo ou testando um cliente Let's Encrypt, por favor use
nosso [ambiente de testes]({{< relref "/docs/staging-environment.md" >}}) ao invés da API de produção.
Se você está trabalhando para integrar a Let's Encrypt a um provedor ou a um website
muito grande por favor [leia nosso Guia de Integração]({{< relref "/docs/integration-guide.md" >}}).

O principal limite é o de <a name="certificates-per-registered-domain"></a> **Certificados por Domínio Registrado** (50 por semana). Um
domínio registrado é, de maneira geral, a parte do nome do domínio que você comprou
do seu registrador de domínios. Por exemplo, no nome `example.com`,
o domínio registrado é `example.com`. Em `novo.blog.example.com`,
o domínio registrado é `example.com`. Usamos a 
[Lista Pública de Sufixos](https://publicsuffix.org) para calcular o domínio
registrado.   

Se você tem muitos subdomínios, talvez queira combinar todos eles em um único
certificado, dentro do limite de 100 <a name="names-per-certificate"></a>**Nomes por Certificado**. Combinado com o
limite acima, isso significa que você pode emitir certificados contendo até 5.000 únicos
subdomínios por semana. Um certificado com múltiplos nomes é comumente chamado de certificado
SAN, ou as vezes de certificado UCC. Nota: Por motivos de performance e
confiabilidade, é melhor usar menos nomes por certificado sempre que você
puder.

Renovações são tratadas de forma especial: Elas não usam seu limite de <a name="certificates-per-registered-domain"></a> **Certificados por 
Domínio Registrado**, mas estão sujeitas ao 
limite de 5 **Certificados Duplicados** por semana. Nota: Renovações costumavam usar seu limite de Certificados por 
Domínio Registrado até Março de 2019, [mas isso não 
acontece mais](https://community.letsencrypt.org/t/rate-limits-fixing-certs-per-name-rate-limit-order-of-operations-gotcha/88189).

Um certificado é considerado renovação (ou uma duplicação) de um certificado anterior se ele contém
o exato conjunto de nomes de domínio, ignorando capitalizações e ordenação
destes nomes. Por exemplo, se você solicitou um certificado com os nomes
[`www.example.com`, `example.com`], você pode solicitar mais quatro certificados para 
[`www.example.com`, `example.com`] na mesma semana. Se você alterar o conjunto de nomes de domínio
de domínio acrescentando [`blog.example.com`], você poderá solicitar certificados
adicionais.
 
 O processo de renovação ignora a chave pública e extensões solicitadas. Uma emissão de certificado
 pode ser considerada uma renovação mesmo que você esteja usando uma nova chave. 
 
Revogar certificados não zera os limites de requisições, porque os recursos usados para
emitir estes certificados já foram consumidos.

Existe um limite de <a name="failed-validations"></a>**Falha de Validação** de 5 falhas
por conta, por nome de domínio, por hora. Este limite é maior em nosso [ambiente de testes]({{< relref "/docs/staging-environment.md" >}}), você
pode usar este ambiente para identificar e corrigir problemas de conectividade.

Os endpoints "new-reg", "new-authz" e "new-cert" possuem um 
<a name="overall-requests"></a>**Limite
Geral** de 20 requisições por segundo. O endpoint "/directory" e o diretório "/acme" 
e seus subdiretórios possuem um Limite Geral de 40 requisições por segundo.

Temos dois outros limites que você dificilmente atingirá.

Você pode criar um máximo de 10 <a name="accounts-per-ip-address"></a>**Contas por Endereço IP** por 3 horas. Você pode
criar um máximo de 500 **Contas por Intervalo de IP** nas configurações IPv6 /48 por 
3 horas. Atingir qualquer um destes dois limites é bem raro, e recomendamos que
grandes integradores [usem uma conta para muitos usuários]({{< relref "/docs/integration-guide.md" >}}).

Você pode ter um máximo de 300 <a name="pending-authorizations"></a>**Autorizações Pendentes** na sua conta. Atingir
este limite é bem raro e acontece com mais frequência durante o desenvolvimento de clientes ACME. Isso
normalmente significa que o seu cliente está criando autorizações e as deixando em aberto.
Por favor use nosso [ambiente de testes]({{< relref "/docs/staging-environment.md" >}}) se você está
desenvolvendo um cliente ACME.

Para usuários da API ACME v2 você pode criar um máximo de 300 <a
name="new-orders"></a>**Novas Ordens** por conta por 3 horas. 

# <a name="overrides"></a>Exceções

Se você atingir um limite de requisições, não temos como zerá-lo temporariamente. Você 
precisará esperar até que o limite expire após uma semana. Nós usamos uma janela móvel de dias,
então se você emitir 25 certificados na segunda-feira e mais 25 na sexta, 
você poderá emitir novamente a partir de segunda-feira. Você pode obter uma lista de certificados
emitidos para os seus domínios registrados [através de uma busca em crt.sh](https://crt.sh), que 
usa os registros públicos de 
[Transparência de Certificados](https://www.certificate-transparency.org). 

Revogar certificados não zera os limites de requisições, porque os recursos envolvidos 
na emissão de certificados já foram consumidos.

Se você for um provedor de hospedagem grande ou uma organização trabalhando na integração
com a Let's Encrypt, temos um [formulário de 
limite de requisições](https://goo.gl/forms/plqRgFVnZbdGhE9n1) (Inglês)
que pode ser usado para solicitar um limite maior de requisições. Leva algumas semanas para processar 
as solicitações, então este formulário não é adequado se você precisa zerar o limite de requisições
mais rápido do que ele zera automaticamente.

Observe que a maioria dos provedores de hospedagem não precisa de aumentos de limite, porque
não há limites para o número de domínios distintos registrados para os quais você pode emitir certificados.
Enquanto a maioria dos seus usuários não tiver mais do que 2000 subdomínios em
um domínio registrado, você provavelmente não precisará de um aumento. Veja nosso [Guia de
Integração]({{< relref "/docs/integration-guide.md" >}}) para mais dicas.  

# <a name="clearing-pending"></a>Limpando Autorizações Pendentes

Se você possui um grande número de objetos pendentes de autorização e está recebendo um
erro de limite de requisições, você pode acionar uma tentativa de validação para estes
objetos de autorização enviando uma solicitação POST assinada com JWS para um dos desafios, como
descrito nagi 
[Especificação ACME](https://tools.ietf.org/html/rfc8555#section-7.5.1) (Inglês).
Os objetos pendentes de autorização são representados por URLs no formato
`https://acme-v01.api.letsencrypt.org/acme/authz/XYZ`, e precisam aparecer nos
registros do seu cliente. Observe que não importa se a validação é bem sucedida ou não.
Qualquer resultado fará com que a autorização saia do estado "Pendente". Se você não
possui os registros contendo as URLs de autorização relevantes, você precisa esperar que
os limites expirem. Como descrito acima, existe uma janela móvel de dias, então pode 
levar menos de uma semana dependendo do seu padrão de emissão. 

Observe que ter um grande número de autorizações pendentes normalmente é
resultado de um cliente com bugs. Se você está atingindo este limite com frequência então
é necessário checar o código fonte do seu cliente.

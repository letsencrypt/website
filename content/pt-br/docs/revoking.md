---
title: Revogando Certificados
slug: revoking
top_graphic: 1
date: 2017-06-08
lastmod: 2017-06-08
---

{{< lastmod >}}

Quando a chave privada correspondente a um certificado não é mais
segura você deve revogar o certificado. Isso pode acontecer devido a algumas diferentes
razões. Por exemplo, você pode compartilhar acidentalmente a chave privada em um site público,
hackers podem copiar a sua chave privada em seus servidores, ou podem 
assumir controle temporário sobre os seus servidores ou sua configuração DNS e usar isso
para validar e emitir um certificado para o qual eles têm posse da chave privada.

Quando você revoga um certificado Let's Encrypt, a Let's Encrypt publicará esta informação
de revogação através do [Online Certificate Status Protocol
(OCSP)](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol) (Inglês) e 
alguns navegadores checam o OCSP para decidir se devem confiar ou não em um certificado.
Note que o OCSP [tem alguns problemas
fundamentais](https://www.imperialviolet.org/2011/03/18/revocation.html), então
nem todos os navegadores farão essa checagem. Mesmo assim, revogar certificados que correspondem
a chaves privadas comprometidas é uma prática importante, e isso é requerido no 
[Subscriber Agreement]({{< ref "/repository.md" >}}) da Let's Encrypt.

Para revogar um certificado com a Let's Encrypt, você precisará usar a [API
ACME](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) (Inglês), 
muito provavelmente através de um cliente ACME como o [Certbot](https://certbot.eff.org/).
Você precisará provar para a Let's Encrypt que você está autorizado a revogar o
certificado. Abaixo estão as três formas de fazer isso:

# A partir da conta que emitiu o certificado

Se você originalmente emitiu o certificado e ainda possui controle
da conta que usou para fazer isso, você pode revogá-lo usando suas credenciais da 
conta. O Certbot tentará fazer isso por padrão. Exemplo:

```
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem
```

# Usando a chave privada do certificado

Se você não for o emissor original do certificado mas possui uma cópia da
chave privada correspondente, você pode revogá-lo usando esta chave privada para assinar a solicitação
de revogação. Por exemplo, se você notar que a chave privada foi publicada 
acidentalmente, você pode usar este método para revogar certificados que usaram esta
chave privada, mesmo que você não seja a pessoa que originalmente emitiu estes certificados.

Para usar este método você precisará primeiro fazer o download do certificado a ser
revogado. A Let's Encrypt registra todos os certificados em [Certificate
Transparency](https://www.certificate-transparency.org/) (Inglês), então você pode encontrar
e fazer o download de certificados usando um monitor de registros como 
[crt.sh](https://crt.sh/).

Você também precisará de uma cópia da chave privada no formato PEM. Uma vez que tiver isso em mãos
você poderá revogar o certificado assim:

```
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/key.pem
```
# Usando uma conta autorizada diferente

Se alguém emitiu um certificado após o comprometimento do seu servidor ou DNS, você 
vai querer revogar este certificado uma vez que recuperar o controle. Para revogar o
certificado a Let's Encrypt precisará garantir que você controla os nomes de domínio
naquele certificado (senão qualquer pessoa poderia revogar o certificado dos outros
sem permissão!). Para validar este controle, a Let's Encrypt usa os mesmos
métodos que usa para validar o controle durante a emissão: você pode
colocar um [valor em um registro TXT no 
DNS](https://ietf-wg-acme.github.io/acme/#rfc.section.8.5) (Inglês),
colocar um [arquivo num servidor HTTP](https://ietf-wg-acme.github.io/acme/#rfc.section.8.3) (Inglês).
ou oferecer um 
[certificado TLS especial](https://ietf-wg-acme.github.io/acme/#rfc.section.8.4) (Inglês).
Normalmente um cliente ACME cuidará disso por você. Note que a maioria dos clientes ACME
combinar a validação e emissão, então a única forma de solicitar validações é 
tentando emitir. Você pode então revogar o certificado gerado se você não
quise-lo ou simplesmente destruir a chave privada. Se você quiser evitar completamente a emissão
de um certificado você pode inserir um nome de domínio inexistente na sua 
linha de comando, o que irá fazer a emissão falhar enquanto ainda consegue validar os 
outros nomes de domínio existentes. Para fazer isso execute:

```
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```

E siga as instruções. Se você prefere validar usando HTTP ao invés de 
DNS, substitua a flag `--preferred-challenges` por
`--preferred-challenges=http`.

Uma vez que você tenha validado o controle sobre todos os nomes de domínio no certificado que você quer 
revogar, você pode fazer o download do certificado em [crt.sh](https://crt.sh/) (Inglês)
e então proceder com a revogação do certificado como se você o tivesse emitido:

```
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem
```

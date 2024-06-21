---
title: Limite de Validação Mal-sucedida
slug: failed-validation-limit
lastmod: 2024-06-21
show_lastmod: false
---


# Descrição
Todas as solicitações de emissão estão sujeitas a um limite de 5 falhas de *Validação Mal-sucedida* por conta, por nome do host, por hora. Você deve receber a seguinte mensagem de erro do seu cliente ACME quando exceder o limite de Validação Mal-sucedida:

```
muitas autorizações mal-sucedidas recentemente: consulte https://letsencrypt.org/docs/failed-validation-limit/
```

As 'autorizações' a que esse erro se refere são o resultado de solicitações de autorização enviadas pelo seu cliente ACME para validar o controle sobre um nome de domínio antes de emitirmos ou renovarmos um certificado. Esse erro indica que as solicitações de validação foram enviadas com sucesso, mas todas as tentativas de validação falharam.

# Causas Comuns

Os assinantes que atingem o limite de Validação Mal-sucedida frequentemente o fazem devido a uma má configuração em seu ambiente.

## HTTP-01 ou TLS-ALPN-01

Para cliente ACME que solicitam autorização por meio dos métodos de validação HTTP-01 ou TLS-APLN-01, o problema geralmente decorre de uma configuração de rede ou firewall que impede que nossos servidores de validação alcancem o servidor a partir do qual a solicitação foi enviada.

## DNS-01

Clientes ACME que solicitam autorização por meio do método de validação DNS-01 normalmente exigem que você crie um registro CNAME na sua zona principal de DNS, permitindo que o cliente ACME defina os registros DNS necessários durante o processo de validação. Falhas nas validações DNS-01 geralmente são resultado de etapas perdidas ou erros de digitação durante o processo de configuração inicial.

Ao solucionar problemas ou testar a implantação de seus aplicativos, recomendamos que você configure seu cliente ACME para usar nosso [ambiente de teste](/docs/staging-environment/). Limites de taxa para nosso ambiente staging são [significativamente mais elevados](/docs/staging-environment/#rate-limits).

# Solicitando Ajuda

Se você não tem certeza de como configurar seu cliente ACME para usar nosso ambiente de teste ou precisa de ajuda para depuração, recomendamos que você [solicite ajuda em nosso fórum.](https://community.letsencrypt.org/c/help/13).

# Solicitando uma Substituição

Substituições estão **não** disponíveis para o limite de validação com falha.
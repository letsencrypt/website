---
title: Encontrando IDs de Contas
slug: account-id
top_graphic: 1
date: 2016-08-10
lastmod: 2019-07-30
show_lastmod: 1
---


Ao relatar problemas, pode ser útil fornecer seu ID da conta Let's Encrypt. Na maior parte do tempo, o processo de criação de uma conta é tratado automaticamente pelo o software cliente ACME que você usa para falar com Let's Encrypt e você pode ter múltiplas contas configuradas se você executar clientes ACME em múltiplos servidores.

O ID da sua conta é um URL do formulário `https://acme-v02.api.letsencrypt.org/acme/acct/12345678`.

Se você estiver usando Certbot, poderá encontrar o ID da sua conta olhando para o campo "uri" no `/etc/letsencrypt/accounts/acme-v02.api.letsencrypt.org/directory/*/regr.json`.

Se você estiver usando outro cliente ACME, as instruções irão depender do cliente. Verifique seus logs para ver URLs do formulário descrito acima. Se o cliente ACME não gravar o ID da conta, você poderá recuperá-la enviando uma nova solicitação de registro com a mesma chave. Consulte a [especificação ACME para mais detalhes ](https://tools.ietf.org/html/rfc8555#section-7.3). Você também pode encontrar o formulário numérico do seu ID no cabeçalho Boulder-Requester em a resposta para cada POST que seu cliente ACME faz.

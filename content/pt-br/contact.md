---
title: Contato
slug: contact
description: Fale conosco
top_graphic: 1
lastmod: 2021-08-31
menu:
  main:
    weight: 90
    parent: about
---

**Não fornecemos suporte via e-mail. Se você tem uma pergunta de suporte, por favor use nossos [fóruns da comunidade](https://community.letsencrypt.org). Os endereços de e-mail abaixo são apenas para os tópicos específicos descritos.**

## Perguntas da imprensa

E-mail: [press@letsencrypt.org](mailto:press@letsencrypt.org)

## Patrocinadores

E-mail: [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## Lista de Email

Para se inscrever em nossa newsletter, [clique aqui.](https://outreach.abetterinternet.org/l/1011011/2023-02-16/6l51)

## Segurança

**Por favor, não escreva para este endereço, a menos que sua mensagem diga respeito a um problema de segurança com o Let's Encrypt.**

<span id="email">E-mail: </span>

<script>
  var parts = ["security", '@', "letsencrypt", ".", "org"];
  var anchor = document.createElement("a");
  anchor.href = "mailto:" + parts.join("");
  anchor.text = parts.join("");
  document.getElementById("email").appendChild(anchor)
</script>

### Comunicação criptografada

Para se comunicar de forma segura com a Equipe de Segurança, utilize nossa chave GPG. Consiste em várias subchaves assinadas por uma chave mestra offline. Qualquer versão recente do GnuPG suporta este tipo de chave híbrida. A estrutura da chave atual é:

```
pub   rsa4096 2015-11-24 [CE] [expires: 2025-09-25]
      0148 3B31 D8F9 DBA2 5D41  4DAA 718E 9F6D 10EC 230B
uid           [ultimate] ISRG Security Team (letsencrypt.org) <security@letsencrypt.org>
sub   rsa4096 2015-11-24 [E] [expires: 2023-09-25]
sub   rsa4096 2015-11-24 [A] [expires: 2023-09-25]
sub   rsa4096 2015-11-24 [S] [expires: 2023-09-25]
```

Você pode baixar a [Chave Pública GPG](/security_letsencrypt.org-publickey.asc) aqui, ou use seu servidor de chaves favorito.

A impressão digital da chave deve corresponder `0148 3B31 D8F9 DBA2 5D41 4DAA 718E 9F6D 10EC 230B`.

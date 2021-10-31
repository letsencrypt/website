---
title: Implementações de Clientes ACME
slug: client-options
top_graphic: 1
lastmod: 2019-05-24
---

{{< clientslastmod >}}

A Let's Encrypt usa o protocolo ACME para verificar que você controla dado nome
de domínio e para lhe emitir um certificado. Para obter um certificado Let's Encrypt, você
precisará escolher um cliente ACME para usar.

Os clientes ACME abaixo são oferecidos por terceiros. A Let's Encrypt não controla ou revisa
clientes de terceiras e não pode fazer garantias a respeito de sua segurança ou confiabilidade.

Alguns clientes ACME que rodam diretamente no navegador estão disponíveis, mas não os listamos aqui porque
eles encorajam um processo de renovação manual que resulta em uma experiência de uso ruim 
e aumenta o risco do usuário esquecer de renovar um certificado. 

# Recomendado: Certbot

Recomendamos que os usuários comecem pelo cliente [Certbot](https://certbot.eff.org/). Ele pode desde apenas obter o certificado para você até mesmo instalá-lo, dependendo do que você preferir. Ele é fácil de usar, funciona em muitos sistemas operacionais e possui uma ótima documentação.

Se o certbot não supre suas necessidades ou você quer testar algo diferente, existem muitos outros clientes
que você pode usar na lista abaixo, agrupados por linguagem de programação e ambiente em que são executados.

{{< clients acme_v2="Clientes Compatíveis com ACME v2" libraries="Bibliotecas" projects="Projetos que se integram à Let's Encrypt" >}}

O módulo Python [acme](https://github.com/certbot/certbot/tree/master/acme) é parte da árvore do Certbot, mas também é usado em vários outros clientes e está disponível como pacote isolado via [PyPI](https://pypi.python.org/pypi/acme), [Debian](https://packages.debian.org/search?keywords=python-acme), [Ubuntu](https://launchpad.net/ubuntu/+source/python-acme), [Fedora](https://bodhi.fedoraproject.org/updates/?packages=python-acme) e outras distribuições.

{{< /clients >}}

# Adicionando seu cliente/projeto

Se você conhece um cliente ACME ou um projeto que se integrou à Let's Encrypt que não está presente na lista acima por favor envie um pull request no nosso [repositório do website](https://github.com/letsencrypt/website/) no Github, modificando o arquivo `data/clients.json`. 

Antes de enviar o pull request por favor certifique-se que:

1. O seu cliente respeita a [política de direitos autorais da Let's Encrypt](https://www.abetterinternet.org/trademarks/).
1. O seu cliente não roda diretamente no navegador e que ele suporta renovações automáticas.
1. O seu commit adiciona o cliente ao **fim** da seção relevante (não esqueça o "acme_v2" se for apropriado!).
1. O seu commit atualiza campo `lastmod` no topo do arquivo `clients.json`.

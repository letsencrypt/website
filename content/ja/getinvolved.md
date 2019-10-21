---
title: 参加する
slug: getinvolved
top_graphic: 5
lastmod: 2019-01-11
menu:
  main:
    weight: 60
    parent: donate
---

## コミュニティ

私たちはいつでも [Let's Encrypt コミュニティ・フォーラム](https://community.letsencrypt.org/)の質問に答えて人々を助けることができます。コミュニティの支援による貢献が以下に重要であるかについては、[このブログ記事](/2015/08/13/lets-encrypt-community-support.html)を読んでください。

## コード

私たちはソフトウェア開発でもコミュニティの助けを受けています。私たちのすべてのコードは [GitHub](https://github.com/letsencrypt/) 上で公開されています。

### クライアント・ソフトウェア

[Certbot](https://github.com/certbot/certbot) は、あなたのウェブサーバー上で動作して証明書を取得し、ウェブサイトを HTTPS 化する Python ベースのユーティリティです。私たちは、ほとんどの人は最初は Certbot クライアントを使用することをおすすめしています。この他にもたくさんの[サードパーティ製クライアントの選択肢]({{< ref "/docs/client-options.md" >}})があります。

### サーバーサイドの CA ソフトウェア

[Boulder](https://github.com/letsencrypt/boulder) は、Let's Encrypt CA の実装です。Boulder は [ACME](https://github.com/ietf-wg-acme/acme) プロトコルに基づいており、主に Go 言語で書かれています。コントリビューションを行うには、['help wanted' のラベルがついた issues](https://github.com/letsencrypt/boulder/labels/help%20wanted) から始めるのがおすすめです。コントリビューションを行う際には、[コントリビューター・ガイド](https://github.com/letsencrypt/boulder/blob/master/CONTRIBUTING.md)も忘れずに読んでください。

### letsencrypt.org

[このリポジトリ](https://github.com/letsencrypt/website)に貢献することで、あなたもウェブサイトやドキュメントの改善に参加できます。ウェブサイトの翻訳を行うには、[TRANSLATION](https://github.com/letsencrypt/website/blob/master/TRANSLATION.md) の説明を読んでください。

## プロトコル

Let's Encrypt CA は、ウェブサーバー上の証明書管理ソフトウェアと通信を行います。そのときに利用されるプロトコルは ACME (Automated Certificate Management Environment) と呼ばれます。ACME の仕様のドラフトは [Github 上で読むことができます](https://github.com/ietf-wg-acme/acme)。IETF では、ACME を完全なオープン標準にするための作業が進行中です。[IETF メーリングリスト](https://www.ietf.org/mailman/listinfo/acme)に参加することで、あなた自身も ACME プロトコルを開発するための議論に参加することができます。

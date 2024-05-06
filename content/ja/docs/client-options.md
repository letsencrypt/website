---
title: ACME クライアント実装
slug: client-options
lastmod: 2020-12-18
---

{{< clientslastmod >}}

Let's Encrypt は、与えられたドメインを制御する権限があなたにあることを検証し、証明書を発行するために、ACME プロトコルを使用しています。 Let's Encrypt の証明書を取得するためには、使用する ACME クライアントを1つ選ぶ必要があります。

以下に示す ACME クライアントはサードパーティにより提供されているものです。 サードパーティ製クライアントは Let's Encrypt の制御下にはなく、レビューを行っているわけではないので、安全性や信頼性に対する保証をすることはできません。

ブラウザ内で動作する ACME クライアントがいくつか存在しますが、以下のリストには掲載していません。その理由は、手動で更新するワークフローを推奨しているためです。手動での更新はユーザーエクスペリエンスを悪化させる原因であり、更新を忘れるリスクが高まります。

# おすすめのクライアント: Certbot

Let's Encrypt では、ほとんどの人に[Certbot](https://certbot.eff.org/)クライアントをおすすめしています。 Certbot を使えば、証明書が簡単に取得でき、ユーザーの希望に応じてインストール作業も行ってくれるからです。 使用するのが簡単で、多数のオペレーティングシステムで動作し、ドキュメントも充実しています

Certbot があなたが求める要件を満たさない場合や、単に他のクライアントを試してみたい場合でも、選択できるクライアントは以下に挙げるようにたくさんあります。リストは、実装言語や実行環境によってクループ分けをしています。

# その他のクライアントの選択肢

以下のクライアントはすべて ACMEv2 API ([RFC 8555](https://tools.ietf.org/html/rfc8555)) をサポートしています。 まもなく [phasing out support for ACMEv1](https://community.letsencrypt.org/t/end-of-life-plan-for-acmev1/88430/) のサポートは完全に終了する予定です。 すでに以下のクライアントのいずれかを使用しているなら、最新バージョンにアップグレードするようにしてください。 あなたが使用しているクライアントが以下のリストにない場合、ACMEv2 をサポートしていない可能性があります。もしその場合、プロジェクトのメンテナに連絡するか、他のクライアントに切り替えることをおすすめします。

{{< clients acme_v2="ACME v2 Compatible Clients" libraries="ライブラリ" projects="Let's Encrypt と連携できるプロジェクト" >}}

Python の [acme](https://github.com/certbot/certbot/tree/master/acme) モジュールは、Certbot tree の一部として含まれているものですが、スタンドアローンのパッケージとしても公開されています。[PyPI](https://pypi.python.org/pypi/acme) や [Debian](https://packages.debian.org/search?keywords=python-acme)、[Ubuntu](https://launchpad.net/ubuntu/+source/python-acme)、[Fedora](https://bodhi.fedoraproject.org/updates/?packages=python-acme) などのディストリビューションでも配布されており、他の多数のクライアントでも利用されています。

{{< /clients >}}

# クライアントやプロジェクトを追加する

もし上のリストに掲載されていない Let's Encrypt と連携できる ACME クライアントやプロジェクトを知っていたら、[Let's Encrypt のウェブサイトリポジトリ](https://github.com/letsencrypt/website/)にある `data/clients.json` ファイルを更新して、プルリクエストを送ってください。

プルリクエストを送る前に、以下の点を確認してください。

1. クライアントは [Let's Encrypt trademark policy](/trademarks) を遵守しているか。
1. クライアントは、ブラウザベースのものではなく、自動更新に対応しているか。
1. あなたのコミットは、関連するセクションの**一番最後**に追加するものであるか (もし対応する場合は、「acme_v2」セクションの記入を忘れないでください！)。
1. あなたのコミットは、`clients.json` のヘッダの `lastmod` の日付を更新しているか。

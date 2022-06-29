---
title: ACME プロトコルのアップデート
slug: acme-protocol-updates
top_graphic: 1
lastmod: 2019-10-07
show_lastmod: 1
---


[IETF が標準化した](https://letsencrypt.org/2019/03/11/acme-protocol-ietf-standard.html) ACME プロトコル ([RFC 8555](https://datatracker.ietf.org/doc/rfc8555/)) は、Let's Encrypt の動作の基礎となっています。

# API エンドポイント

現在、以下の API エンドポイントを運用しています。ACME 仕様と比較した実装の詳細については、[divergences ドキュメント](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) を参照してください。

## ACME v2 (RFC 8555)

* [本番用] `https://acme-v02.api.letsencrypt.org/directory`
* [ステージング用] `https://acme-staging-v02.api.letsencrypt.org/directory`

## ACME v1 (廃止)

* [本番用] `https://acme-v01.api.letsencrypt.org/directory`
* [ステージング用] `https://acme-staging.api.letsencrypt.org/directory`

# 新しい後方互換の ACME の機能

将来、Let's Encrypt は新しい後方互換の機能を既存の API エンドポイントに実装するかもしれません。新しい後方互換の機能が追加されるのは、典型的には、以前は実装していなかった ACME 仕様の一部を実装することを決定した場合です。

既存の API エンドポイントに新しい機能が追加された場合、その機能は常にパブリックの ACME 仕様に明確に定義されます。それによって、適切に実装されたクライアントの動作が壊れることはありません。

# 破壊的な変更を伴う新しいバージョンの ACME

現在、ACME のサポートに対して破壊的な変更を行う予定はありません。しかし、そのような変更を行うことが重要であると判断した場合には、十分な時間を取ってスムーズな移行が行えるようにし、可能な限り早く情報を公開します。システム管理者は、破壊的な変更が必要になった場合に備えて、使用している ACME クライアントにすぐに更新を適用できるようにしておく必要があります。

---
title: アカウント ID を見つける
slug: account-id
date: 2016-08-10
lastmod: 2019-07-30
show_lastmod: 1
---


問題を報告する場合は、Let's Encrypt のアカウント ID を提供できると大変役に立ちます。 ほとんどの場合、ACME クライアントソフトウェアにより自動的にアカウントを作成する処理が行われます。そして、あなたが複数のサーバー上で ACME クライアントを実行している場合には、複数のアカウントが設定されている可能性もあります。

あなたのアカウント ID は、`https://acme-v02.api.letsencrypt.org/acme/acct/12345678` という形式の URL で表されます。

Certbot を使用している場合、`/etc/letsencrypt/accounts/acme-v02.api.letsencrypt.org/directory/*/regr.json` ファイル内の "uri" フィールドを見ると確認できます。

その他の ACME クライアントを使用している場合は、確認するために必要な操作はクライアントに依存します。 上記の形式の URL を log から探してみてください。 ACME クライアントがアカウント ID を記録していない場合でも、同一のキーを使用して新規登録リクエストを送信することで ID を取得できます。 詳しくは、[ ACME の仕様](https://tools.ietf.org/html/rfc8555#section-7.3)を読んでください。 ACME クライアントが生成する各 POST に対するレスポンスの中の Boulder-Requester ヘッダでも、数値形式の ID が確認できます。

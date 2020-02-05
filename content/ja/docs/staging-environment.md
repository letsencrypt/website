---
title: ステージング環境
slug: staging-environment
top_graphic: 1
date: 2018-01-05
lastmod: 2019-09-16
---

{{< lastmod >}}

Let's Encrypt をテストする際には、本番環境を使う前に、私たちが用意したステージング環境を使うことを強くおすすめします。ステージング環境を利用すると、信頼された証明書を発行直後に利用でき、本番環境のレート制限を破ってしまう可能性を減らすことができます。

Let's Encrypt の [ACME v2 staging environment](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605) の URL は、次のとおりです。

`https://acme-staging-v02.api.letsencrypt.org/directory`

Certbot を使用している場合、`--dry-run` フラグを設定するだけでステージング環境を利用できます。その他の ACME クライアントを利用している場合は、そのクライアントの設定方法を参照して Let's Encrypt のステージング環境でテストを行ってください。ただし、v2 staging environment には v2 互換の ACME クライアントが必要です。

# レート制限

ステージング環境でも、[本番環境のレート制限の説明]({{< ref "/docs/rate-limits" >}})に書かれているのと同様のレート制限が適用されますが、次のような例外が設けられています。

* **登録ドメインごとの証明書**は、1週間ごとに 30,000 個までです。
* **重複する証明書**は、1週間ごとに 30,000 個までです。
* **検証の失敗**は、1時間ごとに 60 個までです。
* **IP アドレスごとのアカウント数**は、1つの IP につき、3時間ごとに 50 アカウントまでです。
* ACME v2 では、**New Orders** は、1アカウントにつき、3時間ごとに 1,500 new orders までです。

# ルート証明書

ステージング環境の中間証明書 (["Fake LE Intermediate X1"](/certs/fakeleintermediatex1.pem)) は、ブラウザやクライアントの trust store には**存在しない**ルート証明書を使って発行されます。テスト専用のクライアントをステージング環境を信頼するようにテスト目的で設定したいときは、["Fake LE Root X1"](/certs/fakelerootx1.pem) を追加します。**重要な注意**: ステージング専用のルート証明書や中間証明書を日常的に使用する trust store には追加してはいけません。ステージング用の証明書は、監査されておらず、本番用のルート証明書と同じ基準を満たしていないため、テスト以外のどんな目的で使用するのも危険です。

# 証明書の透明性

ステージング環境では、pre-certificates を Let's Encrypt {{<link "Testflume" "/docs/ct-logs">}} と Google [testtube](http://www.certificate-transparency.org/known-logs#TOC-Test-Logs) CT test logs に送信し、送信時に返された SCT が発行した証明書の中に含まれます。

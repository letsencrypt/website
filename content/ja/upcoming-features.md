---
title: 今後追加される機能
slug: upcoming-features
top_graphic: 1
lastmod: 2019-07-03
show_lastmod: 1
---


## 複数の観点からの検証

現在、Let's Encrypt は単一のネットワークから検証を行っています。今後、複数のネットワークからの観点を用いた検証を行うことを計画しています。

## ECDSA を用いたルートおよび中間証明書

現在、Let's Encrypt は、エンド・エンティティ証明書に RSA 中間証明書による署名しか行っていません。将来、Let's Encrypt はエンド・エンティティ証明書への署名に使用できる、ECDSA のルートおよび中間証明書を生成する予定です。

# 実装済みの機能

## 証明書の透明性 (Certificate Transparency; CT) ログ

* 有効化: 2019年5月15日

私たちは[証明書の透明性のログ](/docs/ct-logs)を運用し始めました。

## TLS ALPN チャレンジのサポート

* 有効化: 2018年7月12日

TLS-SNI の検証法を[置き換えること](https://tools.ietf.org/html/rfc8737)を発表し、実装を進めてきましたが、[セキュリティ上の問題により断念する](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811)ことになりました。この置き換えで影響を受けるのは、検証にポート 443 のみを使用したいユーザーのみです。

## 証明書内への SCT レシートの埋め込み

* 有効化: 2018年3月29日

## ワイルドカード証明書

* 有効化: 2018年3月13日 

## ACME v2 API

* 有効化: 2018年3月13日

## IDN のサポート

* 有効化: 2016年10月20日

Let's Encrypt は国際化ドメイン名 (IDNs) の発行に対応しました。

## 完全な IPv6 のサポート

* 有効化: 2016年7月26日

当初、Let's Encrypt API のインフラストラクチャの一部しか IPv6 を使用して通信ができませんでした。この問題により、IPv6 のみ対応するシステムは Let's Encrypt と完全に通信することができませんでした。この問題は解決され、すべての機能で IPv6 がサポートされるようになりました。

## Windows XP の証明書互換性

* 有効化: 2016年3月25日

私たちの証明書チェーンの問題により、Windows XP 上のブラウザが Let's Encrypt 証明書を受け付けない問題を解決しました。

## ECDSA 署名のサポート

* 有効化: 2016年2月10日

Let's Encrypt が ECDSA キーに Let's Encrypt のRSA 中間証明書を用いて署名できるようになりました。完全な ECDSA 証明書チェーンによる ECDSA キーへの署名のサポートは将来追加される予定です。

## ACME DNS チャレンジのサポート

* 有効化: 2016年1月20日

Let's Encrypt は ACME 仕様に定められた DNS レコードによる検証をサポートするようになりました。

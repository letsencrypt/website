---
title: 今後追加される機能
slug: upcoming-features
lastmod: 2024-06-14
show_lastmod: 1
---

今後の変更のお知らせについては、Let's Encrypt コミュニティフォーラムの [API Announcements](https://community.letsencrypt.org/c/api-announcements/18) カテゴリを参照してください。

# 実装済みの機能

## ECDSA を用いたルートおよび中間証明書

* 有効化: 2024年6月6日

Let's Encrypt の本番用 ECDSA 中間証明書から ECDSA リーフ証明書への証明書を発行しています。 PKI 階層の完全な詳細については、[Chain of Trust](/certificates/) ドキュメントを参照してください。

## ACME Renewal Information (ARI)

* 有効化: 2023年3月23日

現在、購読者に更新する必要なときに API で通知するシステム [ARI](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari.html) が稼働中です。

## 多視点検証 (Multi-Perspective Validation)

* 有効化: 2020年2月19日

Let's Encrypt では、[複数のネットワークの視点](https://letsencrypt.org/2020/02/19/multi-perspective-validation.html)からドメイン制御の検証を行い始めました。

## 証明書の透明性 (Certificate Transparency; CT) ログ

* 有効化: 2019年5月15日

私たちは[証明書の透明性のログ](/docs/ct-logs)を運用し始めました。

## TLS ALPN チャレンジのサポート

* 有効化: 2018年7月12日

TLS-SNI の検証法を[置き換えること](https://tools.ietf.org/html/rfc8737)を発表し、実装を進めてきましたが、[セキュリティ上の問題により断念する](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811)ことになりました。 この置き換えで影響を受けるのは、検証にポート 443 のみを使用したいユーザーのみです。

## ワイルドカード証明書

* 有効化: 2018年3月13日

## ACME v2 API

* 有効化: 2018年3月13日

## 完全な IPv6 のサポート

* 有効化: 2016年7月26日

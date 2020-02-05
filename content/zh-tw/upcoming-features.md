---
title: 即將推出的功能
slug: upcoming-features
top_graphic: 1
lastmod: 2019-07-03
---

{{< lastmod >}}

## 多點驗證

目前 Let's Encrypt 僅從單點進行驗證，我們正計畫從多點進行驗證。

## 使用 ECDSA 產生根憑證和中間憑證

目前 Let's Encrypt 使用 RSA 產生的中級憑證簽署終端憑證。在未來我們也會使用 ECDSA 產生的根憑證和中間憑證來簽署終端憑證。

# 已完成的功能

## 憑證透明度紀錄

* 於 2019 年 5 月 15 日推出

我們建立了一個{{<link "憑證透明度紀錄" "/docs/ct-logs.html" >}}伺服器。

## 支援 TLS ALPN 驗證

* 於 2018 年 7 月 12 日推出

我們為[出於安全因素而禁用](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811)的 TLS-SNI 驗證方法，制定了[替代方案](https://datatracker.ietf.org/doc/draft-ietf-acme-tls-alpn/)。使用替代方案對於只想使用通訊埠 443 進行驗證的使用者非常重要。

## 憑證內建 SCT 記錄

* 於 2018 年 3 月 29 日推出

## 萬用憑證

* 於 2018 年 3 月 13 日推出

## ACME v2 API

* 於 2018 年 3 月 13 日推出

## 支援 IDN 

* 於 2016 年 10 月 20 日推出

Let's Encrypt 現在支援替國際化域名 (Internationalized Domain Names, IDN) 頒發憑證。

## 完全支援 IPv6

* 於 2016 年 7 月 26 日推出

剛開始只有部分 Let's Encrypt API 可以透過 IPv6 溝通；使得只具有 IPv6 的系統無法與 Let's Encrypt 溝通。這問題已經解決 - 所有功能都已支援 IPv6。

## Windows XP 憑證相容性

* 於 2016 年 3 月 25 日推出

解決了我們的憑證鏈在 Windows XP 瀏覽器無法被接受的問題。

## ECDSA 簽名支援

* 於 2016 年 2 月 10 日推出

添加 Let's Encrypt 使用 RSA 中級憑證籤署 ECDSA 密鑰的功能。未來我們將支援使用 ECDSA 憑證鏈所簽出的 ECDSA 金鑰。

## 支援 ACME DNS 驗證

* 於 2016 年 1 月 20 日推出

Let's Encrypt 允許藉由 ACME 規範中所定義的 DNS 記錄進行驗證。

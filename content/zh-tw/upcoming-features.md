---
title: 即將推出的功能
slug: upcoming-features
top_graphic: 1
lastmod: 2019-07-03
---

## 多視角（地點）驗證

目前，Let's Encrypt從單一網路角度進行驗證。 我們計劃從多個網路角度開始驗證。

## ECDSA根證書和中級證書

目前Let's Encrypt僅使用RSA中級證書籤署終端證書。 我們將生成一個ECDSA根證書及中級證書，可用於簽署終端證書。

# 已完成的功能

## 證書透明度日誌

* 啟用時間: 2019年5月15日

我們開始運營一個[證書透明度日誌伺服器]({{< ref "/docs/ct-logs.html" >}}).

## 支持TLS ALPN挑戰

* 啟用時間: 2018年7月12日

我們為被[出於安全原因停止](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811)的TLS-SNI驗證方法制定並開啟了[替換](https://datatracker.ietf.org/doc/draft-ietf-acme-tls-alpn/)方法。 對於只想使用443埠進行驗證的用戶來說，引入替換十分重要。

## 證書內建SCT記錄

* 啟用時間: 2018年3月29日

## 通配符（野卡）證書

* 啟用時間: 2018年3月13日

## ACME v2 API

* 啟用時間: 2018年3月13日

## IDN支持

* 啟用時間: 2016年10月20日

Let's Encrypt現在支持對國際化域名（IDN）頒發證書。

## 完全的IPv6支持

* 啟用時間: 2016年7月26日

最初，只有部分Let's Encrypt API基礎架構可以通過IPv6進行通信。 這阻止了只有IPv6地址的系統與Let's Encrypt進行完全交互。 這已得到解決 - 已為所有功能啟用了IPv6支持。

## Windows XP證書相容

* 啟用時間: 2016年3月25日

解決了我們的證書鏈在Windows XP瀏覽器無法被接受的問題。

## ECDSA簽名支持

* 啟用時間: 2016年2月10日

添加了Let's Encrypt使用RSA中級證書籤署ECDSA密鑰的功能。稍後將添加對具有完整ECDSA證書鏈的ECDSA密鑰簽名的支持。

## ACME DNS挑戰支持

* 啟用時間: 2016年1月20日

Let's Encrypt允許通過ACME規範中定義的DNS記錄進行驗證。

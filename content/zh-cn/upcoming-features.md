---
title: 即将推出的功能
slug: upcoming-features
top_graphic: 1
lastmod: 2019-07-03
---

## 多视角验证

目前，Let's Encrypt 从单一网络视角进行验证。我们正计划从多个网络视角展开验证。

## ECDSA根证书和中间证书

目前 Let's Encrypt 仅使用 RSA 中间证书签署终端实体证书。我们将生成可用于签署终端实体证书的 ECDSA 根证书及中级证书。

# 已实现的功能

## 证书透明度日志

* 启用时间：2019 年 5 月 15 日

我们开始运作一个[证书透明度日志服务器]({{< ref "/docs/ct-logs.html" >}}).

## 支持 TLS ALPN 验证

* 启用时间：2018 年 7 月 12 日

我们为被[出于安全原因停止使用](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811)的 TLS-SNI 验证方法制定并实现了一个[替代方法](https://datatracker.ietf.org/doc/draft-ietf-acme-tls-alpn/)。这个替代方法对于只想使用 443 端口进行验证的用户来说十分重要。

## 证书内置 SCT 记录

* 启用时间：2018 年 3 月 29 日

## 通配符证书

* 启用时间：2018 年 3 月 13 日

## ACME v2 API

* 启用时间：2018 年 3 月 13 日

## IDN 支持

* 启用时间：2016 年 10 月 20 日

Let's Encrypt 现在支持对国际化域名（IDN）颁发证书。

## 完全的 IPv6 支持

* 启用时间：2016 年 7 月 26 日

最初，只有部分 Let's Encrypt API 基础架构可以通过 IPv6 进行通信。这阻止了只有 IPv6 地址的系统与 Let's Encrypt 进行完整的交互。现在这已得到解决——我们已为所有功能启用了 IPv6 支持。

## Windows XP 证书兼容

* 启用时间: 2016 年 3 月 25 日

解决了一个我们的证书链上的问题，这个问题导致我们的证书无法被 Windows XP 上的浏览器接受。

## ECDSA 签名支持

* 启用时间：2016 年 2 月 10 日

添加了 Let's Encrypt 使用 RSA 中间证书对 ECDSA 公钥进行签名的功能。稍后将添加使用完整的 ECDSA 证书链对 ECDSA 公钥进行签名的支持。

## ACME DNS 验证支持

* 启用时间：2016 年 1 月 20 日

Let's Encrypt 可以使用 ACME 规范中定义的 DNS 记录验证。


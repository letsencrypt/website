---
title: 即将推出的功能
slug: upcoming-features
top_graphic: 1
lastmod: 2019-07-03
---

## 多视角验证

目前，Let's Encrypt从单一网络视角进行验证。我们正计划从多个网络视角展开验证。

## ECDSA根证书和中间证书

目前Let's Encrypt仅使用RSA中间证书签署终端实体证书。我们将生成可用于签署终端实体证书的ECDSA根证书及中级证书。

# 已实现的功能

## 证书透明度日志

* 启用时间：2019年5月15日

我们开始运作一个[证书透明度日志服务器]({{< ref "/docs/ct-logs.html" >}}).

## 支持TLS ALPN挑战

* 启用时间：2018年7月12日

我们为被[出于安全原因停止使用](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811)的TLS-SNI验证方法制定并实现了一个[替代方法](https://datatracker.ietf.org/doc/draft-ietf-acme-tls-alpn/)。这个替代方法对于只想使用443端口进行验证的用户来说十分重要。

## 证书内置SCT记录

* 启用时间：2018年3月29日

## 通配符证书

* 启用时间：2018年3月13日

## ACME v2 API

* 启用时间：2018年3月13日

## IDN支持

* 启用时间：2016年10月20日

Let's Encrypt现在支持对国际化域名（IDN）颁发证书。

## 完全的IPv6支持

* 启用时间：2016年7月26日

最初，只有部分Let's Encrypt API基础架构可以通过IPv6进行通信。这阻止了只有IPv6地址的系统与Let's Encrypt进行完整的交互。现在这已得到解决——我们已为所有功能启用了IPv6支持。

## Windows XP证书兼容

* 启用时间: 2016年3月25日

解决了一个我们的证书链上的问题，这个问题导致我们的证书无法被Windows XP上的浏览器接受。

## ECDSA签名支持

* 启用时间：2016年2月10日

添加了Let's Encrypt使用RSA中间证书对ECDSA公钥进行签名的功能。稍后将添加使用完整的ECDSA证书链对ECDSA公钥进行签名的支持。

## ACME DNS挑战支持

* 启用时间：2016年1月20日

Let's Encrypt可以使用ACME规范中定义的DNS记录验证。


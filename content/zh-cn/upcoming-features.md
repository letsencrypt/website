---
title: Upcoming Features
slug: upcoming-features
top_graphic: 1
---

## 证书透明度日志

* ETA: Q1 2019

我们计划创建一个[证书透明度日志](http://www.certificate-transparency.org/how-ct-works).

## 多视角验证

* ETA: Q2 2019

目前，让我们从单个网络的角度来加密验证。我们计划从多个网络角度进行验证。

## ECDSA根和中间产物

* ETA: Q3 2019

目前，Let's Encrypt只与RSA中间文件签署最终实体证书。Let's Encrypt将生成一个ECDSA根目录和中间文件，这些文件可用于签署最终实体证书。

# 已完成的特性

## TLS ALPN支持

* Enabled: July 12, 2018

我们已经为tls-sni验证方法实施了[替换](https://datatracker.ietf.org/doc/draft-ietf-acme-tls-alpn/)，方法是[终止安全原因](https://community.letsencrypt.org/t/important您需要了解的有关tls-sni验证问题的信息/50811)。对于只想使用端口443进行验证的用户来说，引入替换非常重要。

## 在证书中嵌入SCT

* Enabled: March 29, 2018

## 通配符证书

* Enabled: March 13, 2018

## ACME v2 API

* Enabled: March 13, 2018

## IDN支持

* Enabled: October 20, 2016

Let's Encrypt现在支持发布国际化域名（IDN）。

## IPv6的完全支持

* Enabled: July 26, 2016

最初，只有let's encrypt API的一部分可以通过IPv6进行通信。这就阻止了仅仅使用IPv6的系统与let's encrypt完全交互。该问题已解决-已为所有功能启用了IPv6支持。

## Windows XP证书兼容性

* Enabled: March 25, 2016

解决了证书链的一个问题，该问题阻止了Windows XP上的浏览器接受Let's Encrypt的证书。

## ECDSA签名支持

* Enabled: February 10, 2016

为Let's Encrypt增加了使用RSA中间文件为ECDSA密钥签名的能力。稍后将添加使用完整ECDSA证书链签名ECDSA密钥的支持。

## ACME DNS的支持

* Enabled: January 20, 2016

Let's Encrypt允许通过ACME规范中定义的DNS记录进行验证。

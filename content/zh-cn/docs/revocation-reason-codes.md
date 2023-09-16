---
title: 吊销原因代码
slug: revocation-reason-codes
top_graphic: 1
date: 2022-06-23
lastmod: 2022-07-06
show_lastmod: 1
---

当吊销证书时，Let's Encrypt用户应该选择以下原因代码：

* 未提供任何理由或 `unspecified` (RFC 5280 CRLReason #0)
  - 当下面的原因代码不适用于吊销请求时，用户不能提供除“未指定”以外的理由代码。
* `keyCompromise` (RFC 5280 CRLReason #1)
  - 当用户有理由相信其证书的私钥已被泄露时，必须选择吊销原因“keyCompromise”。例如，未经授权的人可以访问证书的私钥。
  - 如果吊销请求是使用证书私钥而不是用户帐户私钥签署的，Let's Encrypt 可能会忽略请求中的吊销原因并将原因设置为“keyCompromise”。
* `superseded` (RFC 5280 CRLReason #4)
  - 用户在申请新证书以替换其现有证书时，应选择吊销原因“被取代”。
* `cessationOfOperation` (RFC 5280 CRLReason #5)
  - 当用户不再拥有证书中的所有域名或由于停止网站而不再使用证书时，应选择吊销原因“停止运营”。
  - 如果吊销请求来自未请求相关证书但已证明对证书中所有标识符的控制权的用户帐户，Let's Encrypt 可能会忽略请求中的吊销原因并将原因设置为“cessationOfOperation”。

使用除以上外的任何原因代码的吊销请求将被拒绝。

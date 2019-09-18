---
title: 测试环境
slug: staging-environment
top_graphic: 1
date: 2018-01-05
lastmod: 2018-03-12
---

{{< lastmod >}}

在使用我们的正式环境以前，我们强烈建议您使用我们的测试环境进行测试性部署，这将允许您在部署受信任证书前确保自动化和其他要素均会被顺利执行，并且降低您收到颁发限制(Rate Limit)的可能性。

我们的[ACME V2 测试节点](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605)为:

`https://acme-staging-v02.api.letsencrypt.org/directory`

如果您使用的是Certbot，则可以将我们的测试环境与`--dry-run`标志一起使用。对于其他ACME客户端，请阅读他们的说明，了解有关使用我们的测试环境进行测试的信息。 请注意，v2测试环境需要兼容v2的ACME客户端。

# 颁发限制（速率限制）

测试环境使用与[生产环境类似]({{< ref "/docs/rate-limits.md" >}}) 的速率限制，但具体数据有所变化：

* 每个注册域名允许颁发的**证书**限制为每周30,000张。
* **重复证书**限制为每周30,000张。
* 每小时允许60次**失败验证请求**。
* **每个IP地址注册账户**数量限制为每3小时/每个IP允许注册50个账户。
* 对于ACME v2，**新订单**限制为每个帐户每3小时有1,500个新订单。

# 根证书

测试环境的中级证书(["Fake LE Intermediate X1"](/certs/fakeleintermediatex1.pem))被不存在浏览器/操作系统内的**不受信**根证书颁发。 如果您希望修改仅用于测试的客户端/系统信任测试环境颁发的证书，您可以手动添加["Fake LE Root X1"](/certs/fakelerootx1.pem)至该客户端的信任库中。请注意： 请不要将测试环境的根证书或者中级证书安装进日常工作环境的浏览器或者操作系统信任库中，因为该证书没有受到Let's Encrypt的常规审计/保护，因此放置在非测试环境中可能会造成安全隐患。

# 证书透明度日志

测试环境将每个证书提交给Google的[testtube](http://www.certificate-transparency.org/known-logs#TOC-Test-Logs) 证书透明度测试日志服务器并在已颁发的证书中包含返回的SCT。

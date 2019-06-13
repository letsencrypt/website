---
title: 临时环境
slug: staging-environment
top_graphic: 1
date: 2018-01-05
lastmod: 2018-03-12
---

{{< lastmod >}}

在使用我们的生产环境之前，我们强烈建议你对我们的临时环境进 这将允许你在颁发受信任证书之前将事情做好，并降低你遇到频率限制的可能性。

我们的临时环境的ACME URL是:

`https://acme-staging.api.letsencrypt.org/directory`

如果你使用的是Certbot，则可以将我们的暂存环境与`--dry-run`标志一起使用。 对于其他ACME客户，请阅读他们的说明，了解有关使用我们的临时环境进行测试的信息。

我们的临时环境v2版本的[ACME v2 staging environment](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605)是:

`https://acme-staging-v02.api.letsencrypt.org/directory`

如果你使用的是Certbot，则可以将我们的暂存环境与`--dry-run`标志一起使用。 对于其他ACME客户，请阅读他们的说明，了解有关使用我们的临时环境进行测试的信息。 请注意，v2登台环境需要兼容v2的ACME客户端

# 频率限制

临时环境使用与[生产环境](/docs/rate-limits/)相同的速率限制，但以下情况除外

* **Certificates per Registered Domain**限制为每周30000次。
* **Duplicate Certificate**限制为每周30000次。
* **Failed Validations** 限制为每小时60次。
* **Accounts per IP Address** 限制为每个IP每三小时50个账号。
* 在ACME v2中，**New Orders**限制为每个账号每三小时1500个新的订单。


# 根证书
登台环境中间证书（["Fake LE Intermediate X1"](/certs/fakeleintermediatex1.pem)）由浏览器/客户端信任库中不存在的根证书颁发。如果你希望修改仅测试客户端以信任暂存环境以进行测试，可以通过将["Fake LE Root X1"](/certs/fakelerootx1.pem)证书添加到测试信任库来实现。 重要提示：不要将暂存根或中间件添加到您用于普通浏览或其他活动的信任存储中，因为它们不会被审计或保持与我们的生产根相同的标准，因此不能安全地用于其他任何其他操作 而不是测试。

# 证书透明度

临时环境将预证书提交给Google [testtube](http://www.certificate-transparency.org/known-logs#TOC-Test-Logs) CT测试日志，并在已颁发的证书中包含返回的SCT。

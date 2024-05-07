---
title: "在GoDaddy服务器内使用Let's Encrypt证书"
slug: godaddy
date: 2019-12-02
lastmod: 2019-12-02
show_lastmod: 1
---


我们收到了很多关于如何在GoDaddy服务器内使用Let's Encrypt证书的问题。 目前GoDaddy共享主机很难安装Let's Encrypt证书，所以我们不建议您在GoDaddy服务内使用Let's Encrypt证书。 这是因为GoDaddy不支持使用[ACME协议][1]进行自动化的证书颁发和续签。 因为GoDaddy对自己的证书颁发机构签发的证书提供自动续订服务，这是一项[附加功能][2]。（注： GoDaddy证书为付费证书）

我们不建议在不直接支持ACME协议的托管服务商内使用Let's Encrypt证书， 因为这意味着您无法完全自动续期证书。 自动证书续期是使用Let's Encrypt证书必不可少的部分。 使用软件进行证书的自动续期和更新可以大大减少您忘记续期证书而导致网站证书过期的可能性。 如果您的证书过期，那么用户将无法访问您的网站，这会负面影响您网站的用户。

因为我们坚信自动续期的必要性，所以我们在设计签发证书流程时把ACME自动化铭记在心。 Let's Encrypt证书旨在颁发60天后自动续订，如果没有成功续订将在签发后90天停止工作（过期）。

如果您在了解了上述问题后仍旧决定尝试在GoDaddy共享主机内安装并维护Let's Encrypt证书，您可以遵循GoDaddy提供的[操作流程][3]。 请注意，该流程十分复杂且耗时，并且您应该每60天（而不是链接页面上描述的每90天）执行一次。

[1]: https://tools.ietf.org/html/rfc8555
[2]: https://www.godaddy.com/web-security/ssl-certificate
[3]: https://www.godaddy.com/help/install-a-lets-encrypt-certificate-on-your-cpanel-hosting-account-28023

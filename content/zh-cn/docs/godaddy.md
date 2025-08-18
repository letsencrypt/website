---
title: "在 GoDaddy 平台上使用 Let's Encrypt 证书"
slug: godaddy
lastmod: 2025-08-11
show_lastmod: 1
---

我们收到了很多关于如何在 GoDaddy 平台上使用 Let’s Encrypt 证书的问题。 GoDaddy 不支持通过 [ACME 协议](https://tools.ietf.org/html/rfc8555)自动完成证书的申请与续期， 而是提供了一项自动续期的[付费功能](https://www.godaddy.com/web-security/ssl-certificate)，只能用于由他们所签发的证书。

目前我们不建议在 GoDaddy 上使用我们的证书，因为其操作流程复杂，且无法自动化实现。 但我们认为，自动续期是证书管理中至关重要的一部分， 由软件实现的自动续期能够大幅降低证书过期失效的风险。

如果您仍想尝试在 GoDaddy 平台上使用 Let’s Encrypt 证书，有以下途径可以考虑：

1. 使用 Griffin Software 开发的 [CertSage](https://certsage.com/) 软件。 GoDaddy 平台上的其他 Let's Encrypt 用户已有成功的先例。
2. 遵循 GoDaddy 提供的[操作指引](https://www.godaddy.com/help/install-a-lets-encrypt-certificate-on-your-cpanel-hosting-account-28023)， 但我们无法保证其信息的准确性和正确性。 请注意，该流程非常耗时，并且每次证书到期前都需要您手动执行。

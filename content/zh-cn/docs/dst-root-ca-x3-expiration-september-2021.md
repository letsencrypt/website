---
title: DST Root CA X3 到期(2021年9月)
slug: dst-root-ca-x3-expiration-september-2021
lastmod: 2021-09-30
menu:
  main:
    weight: 30
    parent: about
show_lastmod: 1
---

> **2021年9月30日更新** 按计划 DST Root CA X3 交叉签名已经过期，现在将由我们的 ISRG Root X1 提供受所有设备信任的服务 详细计划，请见下文！ 当然，我们也在社区论坛上更新了我们的生产流程信息 —— 如果对此有任何问题或者疑问 [请点击这里，我们将随时等候您的到来](https://community.letsencrypt.org/t/production-chain-changes/150739/4)。

2021年9月30日，旧浏览器和设备信任Let’s Encrypt 证书的方式会有一些微小的变化。 如果您运行的是一个常规的网站， 您不会注意到任何变化，绝大多数访客仍然会接受您的 Let’s Encrypt 证书。 如果您提供 API 或必须支持物联网设备，您可能需要多注意更改。

Let’s Encrypt 有个名为 [ISRG Root X1][] 的"[根证书][]" 。 现代浏览器和设备信任安装在您网站上的 Let's Encrypt 证书，因为它们的根证书列表中包含 ISRG Root X1。 为了确保我们颁发的证书在旧设备上受信任，我们还拥有来自旧根证书的“交叉签名”：DST Root CA X3。

当我们开始签发时，旧的根证书 (DST Root CA X3) 帮助我们起步并立即受到几乎所有设备的信任。 较新的根证书 (ISRG Root X1) 现在也受到广泛信任 - 但一些较旧的设备永远不会信任它，因为它们没有获得软件更新（例如，iPhone 4 或 HTC Dream）。 [点击这里查看信任 ISRG Root X1 的平台][compatibility]。

DST Root CA X3 将于2021年9月30日到期。 这意味着那些不信任 ISRG Root X1 的旧设备在访问使用 Let’s Encrypt 证书的网站时将会得到证书过期警告。 有一个重要的例外：不信任 ISRG Root X1 的旧 Android 设备将能够继续正常访问使用 Let’s Encrypt 证书加密的网站， [感谢来自 DST Root CA X3][cross-sign]的特殊交叉签名延长了该根证书的到期时间。 此例外仅适用于 Android 。

我应该怎么办？ 对于大多数人来说，什么都不用做！ 我们已经用有利于广泛兼容的方式设置了我们的证书颁发服务，所以您的网站将在大多数情况下正常运行。 如果您提供 API 服务或必须支持 IoT 设备，则需要确保两件事：(1) API 服务的所有客户端都必须信任 ISRG Root X1 (而不仅仅信任 DST Root CA X3)，以及 (2) 如果您的 API 的客户端使用 OpenSSL，[它们必须使用 1.1.0 或更高版本][openssl]。 在 OpenSSL 1.0.x 版本中 ，证书验证时有个奇怪现象：当使用我们默认推荐的兼容 Android 的证书链时，即使客户端信任 ISRG Root X1 ，也会出现证书错误。

如果你想要了解我们正在进行的生产环境证书链更改的更多信息，[请在我们的社区中查看这个帖子][production]

如果您对即将来临的证书过期有任何疑问，[请在我们的论坛的此话题下留言。][forum]

[根证书]: /docs/glossary/#def-root
[ISRG Root X1]: /certificates/
[cross-sign]: /2020/12/21/extending-android-compatibility.html
[openssl]: https://community.letsencrypt.org/t/openssl-client-compatibility-changes-for-let-s-encrypt-certificates/143816
[forum]: https://community.letsencrypt.org/t/help-thread-for-dst-root-ca-x3-expiration-september-2021/149190
[compatibility]: /docs/cert-compat/
[production]: https://community.letsencrypt.org/t/production-chain-changes/150739

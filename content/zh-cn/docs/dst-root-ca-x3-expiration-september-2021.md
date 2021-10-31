---
title: DST Root CA X3于2021年9月到期
slug: dst-root-ca-x3-expiration-september-2021
top_graphic: 1
lastmod: 2021-04-06
menu:
  main:
    weight: 30
    parent: about
---

2021年9月30日起，较旧的浏览器和设备对Let's Encrypt证书的信任方式将发生一些小变化。如果您运营着一个普通网站，您将不会察觉到任何不同——绝大多数访问者仍会接受您的Let's Encrypt证书。如果您提供API或必须支持IoT设备，则您可能需要对此变化加以留意。

Let's Encrypt有一个称为[ISRG Root X1]的“[根证书][root certificate]”。现代浏览器和设备信任您网站上安装的Let's Encrypt证书，因为它们的根证书列表中包含了ISRG Root X1。同时为了确保我们颁发的证书能够在较旧的设备上依然受信任，Let's Encrypt同时还具有一个较旧的根证书的“交叉签名”： DST Root CA X3。

当Let's Encrypt项目启动的时候，这个较旧的根证书DST Root CA X3帮助我们起步，并使Let's Encrypt的证书几乎立即受到所有设备的信任。较新的根证书（ISRG Root X1）现在也已广受信任——但是某些较旧的设备将永远不会信任它，因为它们没有获得软件更新（例如iPhone 4或HTC Dream）。[单击此处以获取信任ISRG Root X1的平台][compatibility]。

DST Root CA X3证书将于2021年9月30日到期。这意味着在此之后那些不信任ISRG Root X1证书的旧设备在访问使用Let's Encrypt证书的网站时将开始出现证书警告。不过有一个例外很重要：[多亏了DST Root CA X3的特殊“交叉签名”机制][cross-sign]，Let's Encrypt的证书依然可以在不信任ISRG Root X1证书的较旧的Android设备上正常工作。交叉签名机制使得Let's Encrypt的证书的有效期限可以超过根证书的到期时间，此例外仅适用于Android。

那该怎么办呢？对于大多数人来说，什么也不用做！我们已经准备好了新的证书发行机制，因此您的网站在大多数情况下会做正确的事，兼容非常广泛。如果您提供API或必须支持IoT设备，则需要确保两件事：（1）API的所有客户端必须信任ISRG Root X1（而不仅仅是DST Root CA X3），以及（2）如果您的API客户端使用的是OpenSSL，[则必须确保它们的版本为1.1.0或更高][openssl]。在OpenSSL 1.0.x中有一个古怪之处：即使客户端信任ISRG Root X1根证书，在校验我们默认推荐的、适配安卓设备的证书链时也会失败。

如果您需要有关我们正在进行的产品链变更的额外信息，[请在我们的社区中查看此主题][production]。

如果您对DST Root CA X3根证书即将到期的问题有任何疑问，[请在我们的论坛上就此问题发帖][forum]。

[root certificate]: /docs/glossary/#def-root
[ISRG Root X1]: /certificates/
[cross-sign]: /2020/12/21/extending-android-compatibility.html
[openssl]: https://community.letsencrypt.org/t/openssl-client-compatibility-changes-for-let-s-encrypt-certificates/143816
[forum]: https://community.letsencrypt.org/t/help-thread-for-dst-root-ca-x3-expiration-september-2021/149190
[compatibility]: /docs/cert-compat/
[production]: https://community.letsencrypt.org/t/production-chain-changes/150739

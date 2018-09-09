---
title: FAQ
linkTitle: Frequently Asked Questions (FAQ)
slug: faq
top_graphic: 1
date: 2017-07-06
lastmod: 2017-07-06
menu:
  main:
    weight: 30
    parent: about
---

{{< lastmod >}}

FAQ는 다음의 두 개로 나누어 집니다:

* [일반적인 질문](#general)
* [기술적인 질문](#technical)

# <a name="general">일반적인 질문</a>

## Let’s Encrypt는 어떤 서비스를 제공하나요?

Let’s Encrypt는 글로벌 공인인증기관(Certificate Authority, CA)입니다. 전 세계 사람과 조직들이 SSL/TLS 인증서를 확득하고, 갱신하고, 관리할 수 있도록 합니다. 인증서는 안전한 HTTPS 연결을 도와주는 데도 이용될 수 있습니다.

Let’s Encrypt는 DV(Domain Validation) 인증서를 제공합니다. 자동 발행을 할 수 없는 OV(Organization Validation) 또는 EV(Extended Validation) 유형의 인증서는 제공하지 않습니다.

Let’s Encrypt를 사용하려면 [시작하기](https://letsencrypt.org/getting-started/) 페이지를 방문해 주세요.

## Let’s Encrypt를 사용하는 데는 얼마나 드나요? 정말로 무료인가요?

인증서 이용은 무료입니다. Let’s Encrypt는 비영리이며, 임무는 HTTPS를 널리 채택케 하여 더욱 안전하고 사생활이 보호되는 웹을 만드는 것입니다. 서비스는 무료이며 모든 웹 사이트가 HTTPS를 배포하기도 쉽습니다.

전 세계에 무료 서비스를 제공하기 위해 양질의 스폰서, 후원 기관, 개인으로부터의 후원이 필요합니다. 만약 후원에 관심 있으시다면, [기부](/donate/) 또는 [스폰서가 되는 법](/become-a-sponsor/)을 고려해 주십시오.

경우에 따라, 통합 서비스 제공자(예:호스팅 공급자)는 Let’s Encrypt 인증서를 제공하는데 발생하는데 계상된 행정 관리 비용만을 반영하는 방식으로 명목상 비용만을 부담할 수 있습니다.

## 어떤 종류의 지원을 제공하나요?

Let’s Encrypt는 소규모 조직이 운영하며 비용을 줄이기 위한 자동화된 시스템에 의존합니다. 사정이 그런 탓에, 구독자들께 직접적인 지원은 제공할 수 없습니다. 다음의 선택지를 통한 훌륭한 지원이 이루어 집니다:

1. 정말로 도움되는 [문서](/docs/)가 있습니다.
2. 아주 활발하고 유용한 [커뮤니티 지원 포럼](https://community.letsencrypt.org/)이 있습니다. 커뮤니티 회원들은 질의 응답 전문가이면서, 대부분의 공통적인 질문들은 이미 답변이 되었습니다.

[비디오](https://www.youtube.com/watch?v=Xe1TZaElTAs)를 통해 방대한 커뮤니티 지원력을 확인하시기 바랍니다.

# <a name="technical">Technical Questions</a>

## Are certificates from Let’s Encrypt trusted by my browser?

For most browsers and operating systems, yes. See the [compatibility list](/docs/certificate-compatibility/) for more detail.

## Does Let's Encrypt issue certificates for anything other than SSL/TLS for websites?

Let’s Encrypt certificates are standard Domain Validation certificates, so you can use them for any server that uses a domain name, like web servers, mail servers, FTP servers, and many more.

Email encryption and code signing require a different type of certificate that Let’s Encrypt does not issue.

## Does Let’s Encrypt generate or store the private keys for my certificates on Let’s Encrypt’s servers?

No. Never.

The private key is always generated and managed on your own servers, not by the Let's Encrypt certificate authority.

## What is the lifetime for Let's Encrypt certificates? For how long are they valid?

Our certificates are valid for 90 days. You can read about why [here](https://letsencrypt.org/2015/11/09/why-90-days.html).

There is no way to adjust this, there are no exceptions. We recommend automatically renewing your certificates every 60 days.

## Will Let’s Encrypt issue Organization Validation (OV) or Extended Validation (EV) certificates?

We have no plans to issue OV or EV certificates.

## Can I get a certificate for multiple domain names (SAN certificates or UCC certificates)?

Yes, the same certificate can contain several different names using the Subject Alternative Name (SAN) mechanism.

## Does Let’s Encrypt issue wildcard certificates?

Yes. Wildcard issuance must be done via ACMEv2 using the DNS-01 challenge. See [this post](https://community.letsencrypt.org/t/acme-v2-production-environment-wildcards/55578) for more technical information.

## Is there a Let's Encrypt (ACME) client for my operating system?

There are a large number of [ACME clients](/docs/client-options/) available. Chances are something works well on your operating system. We recommend starting with [Certbot](https://certbot.eff.org/).

## Can I use an existing private key or Certificate Signing Request (CSR)?

Yes, but not all clients support this feature. [Certbot](https://certbot.eff.org/) does.

## What IP addresses does Let's Encrypt use to validate my web server?

We don't publish a list of IP addresses we use to validate, because they may change at any time. In the future we may validate from multiple IP addresses at once.

## I successfully renewed a certificate but validation didn't happen this time - how is that possible?

Once you successfully complete the challenges for a domain, the resulting authorization is cached for your account to use again later. Cached authorizations last for 30 days from the time of validation.
If the certificate you requested has all of the necessary authorizations cached then validation will not happen again until the relevant cached authorizations expire.

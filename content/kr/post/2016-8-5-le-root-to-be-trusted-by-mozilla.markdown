---
author: Josh Aas, ISRG 전무
date: 2016-08-05T00:00:00Z
excerpt: The Let’s Encrypt root key (ISRG Root X1) will be trusted by default in Firefox
  50, which is scheduled to ship in Q4 2016.
title: Mozilla 가 신뢰하는 Let’s Encrypt 루트
slug: le-root-to-be-trusted-by-mozilla
---

Let’s Encrypt 루트 키(ISRF Root X1)는 2016년 4분기에 출시 예정인 Firefox 50에서부터 기본적으로 신뢰될 예정입니다. Mozilla 루트 프로그램으로서의 수용은 신뢰를 위해 자체 루트에 의지하는 것을 목표로 하고 CA(인증 기관)로서 더 큰 독립성을 지니고 있기 때문에 주요 이정표라고 할 수 있습니다.

공용 CA들은 브라우저 및 장치에서 신뢰할 수 있는 인증서가 필요합니다.
자체 루트에 따라 독립적으로 발행하려는 CA들은 기존의 신뢰할 수 있는 루트를 사거나 새로운 루트를 생성하여 신뢰할 수 있게 해서 이 작업을 수행합니다. Let’s Encrypt는 두 번째 경우를 선택했습니다.

신뢰할 수 있고 잘 알려진 새로운 루트를 얻는 방식은 3년에서 6년이 걸립니다. 널리 신뢰받는 인증서를 가능한 한 빨리 발급하기 위해 기존의 신뢰 할 수 있는 루트를 많이 가진 IdenTrust와 협력했습니다. 이 파트너쉽의 일환으로 IdenTrust 루트는 우리가 발급한 인증서를 보증하여 신뢰할 수 있게 합니다. 작업을 최대한 빨리 시작할 수 있도록 도와준 IdenTrust에 매우 감사하고 있습니다.

<center><p><img src="/images/le-firefox-chain-of-trust.png" alt="Chain of trust between Firefox and Let's Encrypt certificates." style="width: 650px; margin-bottom: 17px;"/><br><em>Firefox와 Let’s Encrypt인증서 사이의 신뢰 관계</em></p></center>

하지만 목표는 언제나 독립적으로 신뢰받는 CA로 운영되는 것이었습니다. Mozilla 루트 프로그램에 의해 루트를 직접 신뢰하게 된 것은 이러한 목표를 향한 상당한 발전입니다.

Microsoft, Apple, Google, Oracle 및 Blackberry 루트 프로그램에도 적용되었습니다. 또한, 이러한 프로그램들을 수용하기를 기대하고 있습니다.

Let’s Encrypt 서비스는 산업과 커뮤니티의 지원에 의지하고 있습니다. [참여](https://letsencrypt.org/getinvolved/)를 고려해 주시기 바라며, 만약 여러분들의 회사나 조직이 Let’s Encrypt의 후원자가 되고 싶으시다면 [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)로 이메일을 보내 주시기 바랍니다.

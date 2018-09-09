---
author: Josh Aas, ISRG 전무
date: 2016-03-09T00:00:00Z
excerpt: Over the next few months the Let’s Encrypt client software (not the service)
  will transition to a new name, soon to be announced, and a new home at the Electronic
  Frontier Foundation (EFF).
title: Let’s Encrypt 클라이언트 소프트웨어의 새로운 이름과 소유
slug: le-client-new-home
---

*업데이트: Let’s Encrypt 클라이언트 소프트웨어만 이름과 호스트를 변경한다는 것을 추가 설명했습니다. Let’s Encrypt 인증 기관과 관련 서비스 부서는 이름을 바꾸지 않았습니다.*

앞으로 몇 개월 동안 Let’s Encrypt의 클라이언트 소프트웨어는 곧 발표될 예정인 새로운 이름과 [EFF(Electronic Frontier Foundation)](https://www.eff.org/) 의 새로운 소유로 변경될 것입니다.

이 변화는 BMW CA(인증기관)나 Let’s Encrypt 이름을 유지하고 [인터넷 보안 연구 그룹(the Internet Security Research Group)](https://letsencrypt.org/isrg/)이 계속 호스트하는 관련 서비스에는 영향을 미치지 않습니다.

Let’s Encrypt의 목표는 HTTPS를 최대한 쉽게 적용할 수 있도록 하는 것입니다. 이를 위해 CA(인증 기관) 측에서 인증서 발급을 완전히 자동화 하는 것 만으로는 충분하지 않습니다. 클라이언트 쪽에서도 완전한 자동화가 필요합니다. 현재 Let’s Encrypt 클라이언트는 수십만 개의 웹 사이트에서 사용되고 있으며 단일 서버 또는 VPS로 실행되는 사이트들에게도 Let’s Encrypt 클라이언트 사용이 계속해서 인기 있을 것으로 생각합니다.

웹 서버 생태계가 복잡하기 때문에 어떤 특정한 클라이언트가 모두에게 적합한 것은 불가능할 것입니다. 결과적으로 Let’s Encrypt 커뮤니티는 다양한 요구를 충족시키기 위해 수십 개의 클라이언트들을 만들었습니다. 앞으로 let’s Encrypt의 좋은 클라이언트와 프로토콜 생태계 홍보에 집중하기 위해 고객이 EFF로 이동하는 것이 가장 바람직하다고 생각합니다. 이를 통해 엔지니어링 팀은 안정적으로 빠르게 성장하는 CA 서버 인프라를 운영하는데 주력할 수 있습니다.

Let’s Encrypt 클라이언트는 종단 간 자동화와 확장성 측면에서 다른 대부분 클라이언트보다 더 좋습니다. 이는 주요 서버에 아직 빌트인 지원 기능이 없기 때문에 생기는 중요한 전략이며, 이 기능이 성공할 적절한 기회가 생기길 원합니다. EFF 는 Let’s Encrypt 클라이언트의 개발을 처음부터 주도했기 때문에 이 전략을 계속해서 추구할 수 있는 충분한 자격이 있습니다.

이름 변경은 EFF로 이동하는 것 이상의 여러 이유로 일어납니다. 이름을 변경하는 한 가지 추가적인 이유는 클라이언트가 Let’s Encrypt 상표 사용의 적합 여부를 결정하는 복잡한 프로세스를 생성하지 않아도 클라이언트가 알아서 배포하고 사용자 지정할 수 있기를 원하기 때문입니다. 또 다른 이유는 클라이언트가 앞으로 Let’s Encrypt 뿐만 아니라 다른 어떤 ACME를 지원하는 CA와도 협력할 수 있다는 점을 분명히 하고 싶기 때문입니다.

클라이언트가 EFF 에서 잘 작동되기를 기대하고 계속해서 많은 사람이 Let’s Encrypt로부터 인증서를 발급받는 데 사용되기를 기대합니다.
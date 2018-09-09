---
author: Josh Aas, ISRG 전무
date: 2016-09-20T00:00:00Z
excerpt: Today we’d like to explain what it costs to run Let’s Encrypt. We’re doing
  this because we strive to be a transparent organization, we want people to have
  some context for their contributions to the project, and because it’s interesting.
title: Let's Encrypt 운영 비용
slug: what-it-costs-to-run-lets-encrypt
---

오늘 Let’s Encrypt를 운영하는데 드는 비용을 설명하려 합니다. 투명한 조직이 되기 위해 노력하고 있고 사람들이 프로젝트에 기여한 부분에 대한 이해를 가질 수 있기를 바라기에 설명하려 합니다. 또 재미있기 때문이기도 합니다.

2017년에 Let's Encrypt를 운영하기 위해선 약 미화 2백9십만 달러가 필요합니다. 이는 전 세계적으로 인증서를 웹 상의 모든 서버에 무료로 발급할 수 있는 안전하고 신뢰할 수 있는 서비스의 제공을 위한 믿을 수 없는 가치라고 믿고 있습니다.

지금 내년까지 운영에 필요한 자금을 마련하기 위해 일하고 있습니다. 만약 여러분이 가능하다면 [기부](https://letsencrypt.org/donate/)를 하거나 [후원자](https://letsencrypt.org/become-a-sponsor/)가 되는 것을 고려해 주시기 바랍니다. Let’s Encrypt를 계속 운영하는데 필요한 금액보다 더 많은 자금을 확보할 수 있게 될 경우, 좀 더 안전하고 전문적인 웹을 위한 다른 서비스를 추가할 수 있습니다.

여기 2017년 예산에 대한 상세 내용입니다:

<p>
<table style="border: 1px solid gray; width: 90%; margin: auto">
  <tr style="background-color: #99CCFF;">
    <th style="font-weight: bold; text-align: left; padding: 5px; border: 1px solid gray;">분류</th>
    <th style="font-weight: bold; text-align: left; padding: 5px; border: 1px solid gray;">예산</th>
  </tr>
  <tr>
    <th style="font-weight: normal; text-align: left; padding: 5px; border: 1px solid gray;">직원운용</th>
    <th style="font-weight: normal; text-align: left; padding: 5px; border: 1px solid gray;">미화 2백5만 달러</th>
  </tr>
  <tr>
    <th style="font-weight: normal; text-align: left; padding: 5px; border: 1px solid gray;">하드웨어/소프트웨어</th>
    <th style="font-weight: normal; text-align: left; padding: 5px; border: 1px solid gray;">미화 20만 달러</th>
  </tr>
  <tr>
    <th style="font-weight: normal; text-align: left; padding: 5px; border: 1px solid gray;">호스팅/감사</th>
    <th style="font-weight: normal; text-align: left; padding: 5px; border: 1px solid gray;">미화 30만 달러</th>
  </tr>
  <tr>
    <th style="font-weight: normal; text-align: left; padding: 5px; border: 1px solid gray;">법률/관리</th>
    <th style="font-weight: normal; text-align: left; padding: 5px; border: 1px solid gray;">미화 35만 달러</th>
  </tr>
  <tr>
    <th style="font-weight: bold; text-align: left; padding: 5px; border: 1px solid gray;">총계</th>
    <th style="font-weight: bold; text-align: left; padding: 5px; border: 1px solid gray;">미화 291만 달러</th>
  </tr>  
</table>
</p>

2017년 예산의 분류 방식은 다음과 같습니다. 직원 운용이 Let's Encrypt의 주요 비용입니다. 현재 정규직 직원 8명과 다른 기관(모질라, EFF)에서 고용한 정규직 직원 두 명이 있습니다. 여기에는 5명의 운영/담당 직원, 3명의 소프트웨어 개발자, 1명의 커뮤니케이션 및 기금 모금 담당자와 전무 이사가 포함됩니다. Let’s Encrypt의 2017년도 예산은 직원 10명을 대상으로 급여와 복리 후생을 제공합니다.

시스템 관리 직원들은 일상 업무의 중심에 있습니다. 이 직원들은 서버, 네트워킹 및 배포된 소프트웨어 인프라를 구축 및 개선하고 매일 매시간 시스템을 모니터링하는 업무를 수행합니다. 이것이 가장 큰 팀으로 만드는 중요한 24/7 유형입니다. 모든 이슈는 즉시 처리되어야 하며 여러 사람이 참여하는 것이 이상적입니다.

소프트웨어 개발자들은 주로 오픈 소스 CA 소프트웨어인 *[Boulder](https://github.com/letsencrypt/boulder)*에서 일합니다. 모든 웹에 공급하기 충분한 인증서를 발급, 관리할 수 있는 안전하고 신뢰할 만한 완전 자동화된 CA를 만들기 위해 소프트웨어를 쓸 필요가 있었습니다. 또한, 소프트웨어 개발 담당자는 타사 소프트웨어를 사용하는 경우보다 새로운 기능을 최대한 신속하게 지원할 수 있습니다.

인사, 급여 회계와 같은 대부분의 행정 지원은 [리눅스 재단](https://www.linuxfoundation.org/)에서 제공하기 때문에 법률/관리 카테고리에 이 같은 행정 지원 관련 비용을 포함하지 않습니다.

하드웨어 비용에는 컴퓨터, 저장소, 네트워킹 및 HSM 하드웨어와 관련 지원 계약까지 포함됩니다. *중복 복제가 꽤 있습니다. 사용하는 대부분 소프트웨어는 무료 오픈소스 소프트웨어이기 때문에 소프트웨어 비용은 낮습니다.

호스팅 비용에는 보안 데이터 센터 내의 지리적으로 서로 다른 두 개의 엄중한 보안이 적용된 독립 공간과 인터넷 연결, 전력이 포함됩니다. 가지고 있는 하드웨어와 물리적 인프라는 웹 상의 모든 서버에 충분한 수억 개의 인증서를 발급할 수 있습니다. 보안과 감사로 인증서 발행, 관리와 관련된 모든 하드웨어와 인프라에 대한 강력한 물리적인 제어를 유지해야 합니다.

감사 비용에는 필수적인 매년 WebTrust 감사와 타사 보안 전문 테스트와 리뷰 비용이 포함됩니다. 타사 보안 감사에는 코드, 인프라 검토, 침입 테스트, ACME 프로토콜 분석이 포함됩니다. WebTrust 감사 이외의 타사 보안 감사를 할 필요는 없지만, 타사 보안 감사를 시행하지 않는 것은 무책임한 행동이기 때문에 수행하고 있습니다.

법률 비용은 주로 기업 지배 구조 분야, 계약 개발 및 검토, 그리고 상표 분야의 변호사 시간을 사는 데 쓰입니다. 관리 비용에는 HR, 급여 및 복지 후생 관리, 회계와 세금 관련, 출장과 기타 운영 비용이 포함됩니다.

2016년 예산은 2017년 예산과 매우 비슷하지만 중요한 차이점은 직원 수가 연초부터 많아 약 200만 달러를 지출할 것이라는 점입니다. 2016년에 합류 한 모든 직원이 2017년 전체 급여를 받을 것이기 때문에 내년에 충분한 인력 비용을 지급할 것입니다.

현재 저희 자금의 대부분은 [기업 후원금](https://letsencrypt.org/sponsors/)에서 나오고 있습니다. 만약 여러분의 회사나 조직이 let’s Encrypt를 후원하고 싶다면 [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)로 이메일을 보내 주십시오. 내년 한 해 동안의 보조금과 [개인 기부금](https://letsencrypt.org/donate/)을 더욱 더 중요한 수입원으로 만들기 위해 노력하고 있습니다.

Let’s Encrypt가 받는 산업과 커뮤니티의 지원에 감사합니다. Let’s Encrypt는 더 안전하고 개인 정보가 보장된 웹을 계속해서 만들 것을 기대합니다!
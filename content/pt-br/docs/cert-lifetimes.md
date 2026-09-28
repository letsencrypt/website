---
title: Fundamentação e Planos para a Validade dos Certificados
slug: cert-lifetimes
lastmod: 2026-07-22
show_lastmod: 1
---

## Validade Atual

Desde nosso lançamento inicial em 2015, o Let's Encrypt ofereceu certificados com 90 dias de validade. Este tempo de validade continua sendo padrão, e a maioria dos certificados que emitimos têm 90 dias.

Certificados de curta duração, como a de 6 dias, também estão disponíveis para todos os nossos assinantes.

Consulte nossa [documentação de perfis de certificado](/docs/profiles/) para obter mais informações.

## Planos Futuros

A partir de 15 de março de 2029, as [regras da indústria](https://cabforum.org/working-groups/server/baseline-requirements/documents/) limitarão a duração máxima do certificado a 47 dias. Por isso, iremos [reduzir a validade máxima dos nossos certificados para 45 dias até fevereiro de 2028](/2025/12/02/from-90-to-45.html).

## Por que validades menores?

Às vezes nos perguntam por que oferecemos certificados com a duração de apenas 90 dias, ou por que estamos introduzindo tempos de vida ainda mais curtos.

Há duas vantagens primárias para uma duração mais curta do certificado:

- Eles limitam os danos causados por emissão indevida e o comprometimento das chaves. Certificados emitidos indevidamente e certificados com chaves comprometidas antes ou após a emissão são válidos por um período mais curto.
- Eles incentivam a automação, que é absolutamente essencial para a facilidade de uso e a confiabilidade. Com a automação do gerenciamento de certificados, validades mais curtas não são menos convenientes do que as mais longas.

Escolhemos a validade de 90 dias para a nossa oferta inicial porque este período era curto o suficiente para incentivar fortemente a automação, mas também um tempo suficiente para a possibilidade de fazer as coisas manualmente. Embora quiséssemos incentivar a automação, esse objetivo era secundário comparado a permitir que todos habilitassem o HTTPS. Na época, a automação não era tão comum quanto é hoje, em parte porque o ecossistema de ferramentas para viabilizá-la (como os clientes ACME) ainda era jovem. Hoje em dia as coisas são muito diferentes — a automatização é muito mais comum e o ecossistema de ferramentas para habilitá-la está muito mais maduro. Portanto, hoje nos sentimos mais confortáveis em oferecer validades menores do que noventa dias do que no passado.

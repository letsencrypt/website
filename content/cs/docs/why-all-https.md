---
title: Proč by všechny weby měly používat HTTPS
slug: why-all-https
lastmod: 2025-08-03
show_lastmod: 1
---

Někteří provozovatelé serverů v minulosti tvrdili, že jejich web neobsahuje nic citlivého, a ochranu soukromí proto nepotřebují. Tento argument však není přesvědčivý. Jsme přesvědčeni, že všechny weby by měly používat HTTPS, a to z následujících důvodů:

## Provoz přes HTTP lze během přenosu sledovat

Nešifrovaný provoz lze během přenosu sledovat. To znamená, že jakýkoli subjekt na síťové trase může vidět veškerý obsah přenášený oběma směry, včetně citlivých údajů. Jde o zjevný problém z hlediska soukromí, podobný posílání dopisů bez obálky.

I když se provozovatel serveru domnívá, že jeho web neobsahuje nic citlivého, lidé se někdy mýlí. Možná by se žádné citlivé informace přenášet _neměly_, to však neznamená, že se přenášet nebudou. HTTPS pomáhá zajistit, aby chyby nevedly k narušení soukromí.

Provozovatel serveru navíc nemá kontrolu nad veškerým provozem směřujícím na jeho web a z něj. Nemůže zabránit tomu, aby návštěvníci v požadavku omylem _odeslali_ citlivé informace, například prostřednictvím formuláře nebo kvůli nesprávnému nastavení klientského softwaru. Očekávat, že to návštěvníci nikdy neudělají, je zcela nereálné.

Citlivou informací může být i samotná návštěva určitého webu, zejména pro lidi žijící v represivních režimech. HTTPS podporuje rozšíření [Encrypted Client Hello (ECH)](https://en.wikipedia.org/wiki/Server_Name_Indication#Encrypted_Client_Hello), které může tuto informaci skrýt. Weby používající HTTP však tuto další vrstvu ochrany využít nemohou.

## Provoz přes HTTP lze během přenosu měnit

Ještě horší je, že nešifrovaný provoz lze během přenosu také měnit. Nikdo si proto nemůže být jistý, že v kterémkoli směru dorazilo přesně to, co bylo odesláno. Spojení tak postrádá nejen soukromí, ale i _integritu_.

Běžným příkladem je vkládání reklam nebo škodlivého softwaru do odpovědí serveru. Web, který nepoužívá HTTPS, vystavuje své návštěvníky tomuto riziku bez ohledu na svůj skutečný obsah.

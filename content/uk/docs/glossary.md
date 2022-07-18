---
title: Термінологія
slug: glossary
top_graphic: 1
date: 2018-12-30
show_lastmod: 1
---


<!--
Note for translators:
 
- Usage of the "def" macro (in other languages than English):
{% def 
    id="a unique id for anchor - the SAME than for english. will be prefixed by `def-`" 
    name="The term to define (optional if english or abbr is provided)"
    abbr="an accronym (optional)"
    english="the english term (optional - if present the abbr is in english too)" %}}
        the definition
{% /def %}
    
- Check the javascript console for errors.

- Automatic titles on definition's link cuts everything after the last point (to remove source links)

-->

{{% def id="AIA" name="Authority Information Access" abbr="AIA" %}} Сертифікаційне[ розширення ](#def-extension)використовується, щоб показати [представникам користувача,](#def-user-agent) як отримати інформацію про видавця[ сертифікату](#def-certificate). Це зазвичай точно визначає [OCSP](#def-OCSP) URI і [видавця URI](#def-CAI). {{% /def %}}

{{% def id="ACME" name="Automatic Certificate Management Environment" abbr="ACME" abbr_first="1" %}} Протокол реалізовано [Let's Encrypt](#def-LE). Програмне забезпечення, сумісне з тим протоколом, може використовувати його для комунікації з Let's Encrypt для запиту[ сертифікату](#def-leaf). [ACME RFC](https://tools.ietf.org/html/rfc8555) - [Вікіпедія](https://en.wikipedia.org/wiki/Automated_Certificate_Management_Environment) {{% /def %}}

{{% def id="ACME-client" name="ACME Client" %}} Програма зв‘язку з сервером ACME для запиту[ сертифікату](#def-leaf). {{% /def %}}

{{% def id="ACME-server" name="ACME Server" %}} ACME-це сумісний сервер, що може генерувати[ сертифікати](#def-leaf). Програмне забезпечення, яке належить Let’s Encrypt [Boulder](#def-boulder), є ACME-сумісним, [ з деякими відхиленнями ](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md). {{% /def %}}

{{% def id="boulder" name="Boulder" %}} Програмне забезпечення, що реалізує ACME, розроблене та використовується [Let's Encrypt](#def-LE). [GitHub](https://github.com/letsencrypt/boulder) {{% /def %}}

{{% def id="BRs" name="Baseline Requirements" abbr="BRs" %}} Перелік технічних вимог та правил для Центрів Сертифікації (ЦС). Оскільки всі основні [кореневі програми](#def-root-program) містять базові вимоги, щоб більшість браузерів їм довіряли, ЦС повинні відповідати цим вимогам. {{% /def %}}

{{% def id="CAA" name="Certificate Authority Authorization" abbr="CAA" abbr_first="1" %}} Запис DNS, який визначає яким [ЦС](#def-CA) дозволено видавати сертифікат для відповідного доменного імені. Записи Авторизації центру сертифікації (CAA) перевіряються ЦС, а не браузерами. [Let's Encrypt](#def-LE) [ шанує записи CAA ](/docs/caa) відповідно до [ базових вимог ](#def-BRs). - [Вікіпедія](https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization) {{% /def %}}

{{% def id="CNAME" name="Canonical Name record" abbr="CNAME" %}} Запис DNS, що зіставляє одне доменне ім'я з іншим, називається канонічним ім'ям. [Вікіпедія](https://en.wikipedia.org/wiki/CNAME_record) {{% /def %}}

{{% def id="CA" name="Certificate Authority" abbr="CA" %}} Організація, що видає [сертифікати](#def-leaf). [Let's Encrypt](#def-LE), [IdenTrust](#def-IdenTrust), Sectigo та DigiCert є Центрами Сертифікації. [Вікіпедія](https://en.wikipedia.org/wiki/Certificate_authority) {{% /def %}}

{{% def id="CAI" name="CA Issuers" %}} Частина поля [AIA](#def-AIA), що містить інформацію про видавця [сертифікату](#def-leaf). Може стати в нагоді, якщо [вебсервер](#def-web-server) не надав надійний [ланцюжок сертифікатів](#def-chain). {{% /def %}}

{{% def id="certificate" name="Certificate" %}} Файл у [певному форматі](#def-X509) містить відкритий ключ та інші дані, що описують коли саме використовувати цей відкритий ключ. Найпоширеніший вид сертифіката - це [leaf certificate](#def-leaf). Також є [проміжні](#def-intermediate) і [кореневі](#def-root) сертифікати. {{% /def %}}

{{% def id="extension" name="Certificate extension" %}} У сертифікатах більшість полів визначаються розширеннями. Нприклад, [Додаткові імена суб’єкта (SAN)](#def-SAN) та [AIA](#def-AIA) є розширеннями. Механізм розширення дозволяє створювати нові поля, що не були частиною оригінального[X.509](#def-X509) стандарту. {{% /def %}}

{{% def id="CABF" name="CA/Browser Forum" %}} Добровільна група ЦС, постачальників програмного забезпечення для веб-браузерів, операційних систем та інших програм, що підтримують PKI. Форум ЦС/браузера публікує [базові вимоги](#def-BRs). [Let's Encrypt](#def-LE) є членом Форуму ЦС/браузера. [Вікіпедія](https://en.wikipedia.org/wiki/CA/Browser_Forum) {{% /def %}}

{{% def id="chain" name="Certificate chain" %}} Перелік [проміжних сертифікатів](#def-intermediate), що допомагає [агентові користувача](#def-user-agent) визначити чи можна довіряти кінцевому суб'єкту [або листовому сертифікату](#def-leaf), підключивши його до [кореневого сертифікату](#def-root) у [сховищі сертифікатів](#def-store). Примітка: ланцюжок не завжди унікальний, і коли веб-сайт представляє ланцюжок сертифікатів, що веде до одного кореня, то агент користувача може вирішити використовувати інший ланцюг для перевірки сертифіката. [Вікіпедія](https://en.wikipedia.org/wiki/Public_key_certificate) {{% /def %}}

{{% def id="CP" name="Certificate Policy" abbr="CP" %}} Іменований набір правил, який вказує на можливість залучення сертифіката до певної спільноти та/або класу додатків із загальними вимогами безпеки. Більше деталей випуску викладені в [CPS](#def-CPS). [Політика сертифікатів дослідницької групи з питань безпеки Інтернету (ISRG)](/repository#isrg-certificate-policy) - [RFC 3647](https://tools.ietf.org/html/rfc3647) - [Вікіпедія](https://en.wikipedia.org/wiki/Certificate_policy) {{% /def %}}

{{% def id="CPS" name="Certification Practice Statement" abbr="CPS" %}} Заява про практику, яку використовує центр сертифікації при видачі, управлінні, відкликанні, поновленні або при переоформленні сертифікатів. [Заява ISRG про сертифікацію ](/repository#isrg-certification-practice-statement) - [RFC 3647 розділ 3.4](https://tools.ietf.org/html/rfc3647#section-3.4) [Вікіпедія](https://en.wikipedia.org/wiki/Certification_Practice_Statement) {{% /def %}}

{{% def id="critical" name="Critical extension" %}} Сертифікат може містити [розширення](#def-extension) з позначкою "критично." У такому разі програмне забезпечення має відхилити цей сертифікат, якщо програмне забезпечення не розуміє, як обробляти розширення. Це дає можливість впроваджувати нові розширення, важливі для безпеки, не створюючи ризиків для старого програмного забезпечення. {{% /def %}}

{{% def id="CRL" name="Certificate Revocation List" abbr="CRL" %}} Метод інформування [агентів користувача](#def-user-agent) про[ статус](#def-revocation) відкликання[ сертифікату](#def-leaf). Це перелік серійних номерів усіх відкликаних сертифікатів з даного ЦС, підписаний цим ЦС. [Вікіпедія](https://en.wikipedia.org/wiki/Certificate_revocation_list) {{% /def %}}

{{% def id="CSR" name="Certificate Signing Request" abbr="CSR" %}} Підписаний файл, що містить інформацію, необхідну [ЦС](#def-CA) для створення сертифікату. Необхідна інфрмація для [Let's Encrypt](#def-LE) - це [Загальна назва](#def-CN), [Альтернативні імена суб'єктів](#def-SAN), а також інформація про відкритий ключ. Зазвичай, [клієнтські програми](#def-ACME-client) автоматично генерують запит на підпис сертифікату (CSR) для користувача, хоча постачальник веб-хостингу або девайсу можуть також генерувати CSR. [Вікіпедія](https://en.wikipedia.org/wiki/Certificate_signing_request) {{% /def %}}

{{% def id="store" name="Certificate Store" %}} Сховище сертифікатів містить список надійних [коренів](#def-root). Оперативні системи (такі як, Windows, Android або Debian) та [веб-браузери](#def-web-browser) (наприклад, Firefox) підтримують сховище сертифікатів. Браузери без такого сховища покладаються на сховище сертифікатів операційних систем. [Сертифікати](#def-leaf) від [Let's Encrypt](#def-LE) мають [довіру більшості сховищ сертифікатів](/certificates). {{% /def %}}

{{% def id="subject" name="Certificate subject" %}} Поле "Суб'єкт" сертифіката вказує, про що йдеться у сертифікаті. Воно зазвичай містить такі поля, як [ Загальна назва ](#def-CN), Країна та Організація. {{% /def %}}

{{% def id="CT" name="Certificate Transparency" abbr="CT" %}}Для підвищення безпеки сертифікати (або [ precertificates](#def-precertificate)) мають бути опубліковані у журналах прозорості сертифікатів: https://www.certificate-transparency.org/. [Let's Encrypt](#def-LE) генерує та публікує [пресертифікати](#def-precertificate), та включає до наступного [сертифікату](#def-leaf) перелік [SCT](#def-SCT) для пресертифіката. Деякі [браузери](#def-web-browser), як Google Chrome, вимагають наявності цієї обіцяної перевірки для підтвердження сертифіката. [Вікіпедія](https://en.wikipedia.org/wiki/Certificate_Transparency) {{% /def %}}

{{% def id="CT-log" name="Certificate Transparency Log" %}} Компонент[ Прозорості сертифікату](#def-CT), який приймає сертифікати і [пресертифікати](#def-precertificate) та включає їх до постійного, загальнодоступного переліку, що перевіряється. {{% /def %}}

{{% def id="CN" name="Common Name" abbr="CN" %}} У частині сертифіката ["Суб'єкт"](#def-subject) описується, про що йдеться у сертифікаті. Для [кореневих](#def-root) і [проміжних сертифікатів](#def-intermediate) це читабельна назва [центру сертифікації](#def-CA). Для [ листового сертифікату ](#def-leaf)- це одне з доменних імен у сертифікаті. Примітка: Загальна назва обмежена 63 символами. Це застарілий метод позначення доменного імені, на яке поширюється сертифікат, оскільки поточні стандарти Інтернету передбачають, що програмне забезпечення перевірятиме лише [Альтернативні імена суб'єктів (SAN)](#def-SAN), щоб визначити придатність сертифіката. {{% /def %}}

{{% def id="cross-signing" name="Cross Signing" %}} Сертифікат, що видається, може підписуватись кількома [коренями](#def-root). Наприклад, [ в Let's Encrypt](#def-LE) [проміжні](#def-intermediate) також підписані [IdenTrust](#def-IdenTrust), оскільки під час запуску кореневих сертифікатів Let's Encrypt вони ще не підтримувались [сховищами сертифікатів](#def-store). Технічно це досягається за допомогою видачі двох сертифікатів, що використовують один і той же [ суб'єкт ](#def-subject) і ту саму [ пару ключів ](#def-key-pair), один підписаний приватним ключем кореня Let's Encrypt, а інший - приватним ключем кореня IdenTrust: [/certificates](/certificates). [Вікіпедія](https://en.wikipedia.org/wiki/X.509#Certificate_chains_and_cross-certification) {{% /def %}}

{{% def id="DANE" name="DNS-based Authentication of Named Entities" abbr="DANE" %}} Механізм, який використовує DNS, щоб вказати, як перевірити автентичність [сертифікату](#def-leaf) або представленого ключа шифрування.  [Вікіпедія](https://en.wikipedia.org/wiki/DNS-based_Authentication_of_Named_Entities) {{% /def %}}

{{% def id="DNSSEC" name="Domain Name System Security Extensions" abbr="DNSSEC" %}} Механізм криптографічної автентифікації відповідей DNS. DNSSEC вимагає розгортання TLD, власниками імен доменів та рекурсивними резольверами для набуття чинності. Ухвалення поки що на досить низькому рівні. [Вікіпедія](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions) {{% /def %}}

{{% def id="DV" name="Domain-validated certificate" %}}[ сертифікат ](#def-leaf), де заявник лише довів свій контроль над доменним іменем (а не ідентифікаційні дані запитуючої організації). [Let's Encrypt](#def-LE) пропонує лише сертифікати DV (не [ OV ](#def-OV) або [ EV ](#def-EV)): [FAQ](/docs/faq) - [Вікіпедія](https://en.wikipedia.org/wiki/Domain-validated_certificate) {{% /def %}}

{{% def id="ECDSA" name="Elliptic Curve Digital Signature Algorithm" abbr="ECDSA" abbr_first="1" %}} Варіант алгоритму цифрового підпису (DSA), який використовує криптографію з еліптичною кривою.  [Вікіпедія](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). [Let's Encrypt](#def-LE) підтримує ECDSA для [сертифікатів кінцевого користувача або листових сертифікатів](#def-leaf), але не для всього [ланцюжка](#def-chain): [/upcoming-features](/upcoming-features) {{% /def %}}

{{% def id="Ed25519" name="Ed25519" %}} Особливий тип [EdDSA](#def-EdDSA), разом із Ed448. {{% /def %}}

{{% def id="EdDSA" name="Edwards-curve Digital Signature Algorithm" abbr="EdDSA" abbr_first="1" %}}Сучасна система підпису відкритих ключів на основі еліптичних кривих, призначена для вирішення кількох поширених [ проблем впровадження ](https://ed25519.cr.yp.to/)  криптографії на еліптичній кривій. Центри сертифікації, такі як [ Let's Encrypt ](#def-LE), ще не можуть надавати сертифікати EdDSA. [Вікіпедія](https://en.wikipedia.org/wiki/EdDSA) {{% /def %}}

{{% def id="ECC" name="Elliptic Curve Cryptography" abbr="ECC" %}} Тип криптографії з відкритим ключем на основі еліптичних кривих. ECC використовує менші ключі порівняно з криптографією, що не належить до ЄС, забезпечуючи при цьому еквівалентну безпеку. [Cloudflare](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/) - [Вікіпедія](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) {{% /def %}}

{{% def id="EV" name="Extended Validation" abbr="EV" %}} Тип підтвердження сертифіката, для якого [ ЦС ](#def-CA) перевірив юридичну особу, що контролює веб-сайт. Він містить інформацію про цю організацію. Контроль [ЦС](#def-CA) більш суровий, ніж для [OV](#def-OV) сертифікатів. [ Let's Encrypt ](#def-LE) не пропонує EV сертифікати. [Вікіпедія](https://en.wikipedia.org/wiki/Extended_Validation_Certificate) {{% /def %}}

{{% def id="FQDN" name="Fully qualified domain name" abbr="FQDN" %}} Повне доменне ім'я веб -сайту. Наприклад, `www.example.com` - *повне доменне ім'я(FQDN)*. {{% /def %}}

{{% def id="IdenTrust" name="IdenTrust" %}} [Центр сертифікації](#def-CA). IdenTrust має [крос-підпис](#def-cross-signing) [проміжних сертифікатів](#def-LE) [Let's Encrypt](#def-intermediate): [/certificates](/certificates). [Вікіпедія](https://en.wikipedia.org/wiki/IdenTrust) {{% /def %}}

{{% def id="intermediate" name="Intermediate certificate" %}} Сертифікат, підписаний [кореневим](#def-root) або іншим проміжним сертифікатом, також здатен підписувати інші сертифікати. Вони використовуються для підписання листових сертифікатів, зберігаючи при цьому закритий ключ кореневого сертифіката в автономному режимі. Проміжні сертифікати включені до[ланцюжків сертифікатів](#def-chain). [Вікіпедія](https://en.wikipedia.org/wiki/Public_key_certificate#Types_of_certificate) {{% /def %}}

{{% def id="IDNA" name="Internationalized Domain Names for Applications" abbr="IDNA" %}} Див. [ інтернаціоналізоване доменне ім'я ](#def-IDN). {{% /def %}}

{{% def id="IDN" name="Internationalized Domain Name" abbr="IDN" %}} Доменне ім’я з символами, відмінними від ` a ` до `z`, `0` до `9` та дефісом(`-`). Вони можуть, наприклад, містити арабські, китайські, кириличні, тамільські, єврейські або латинські символи з діакритикою або лігатурами. Закодоване представлення доменів IDN починається з ` xn-- `. IDN підтримуються [Let's Encrypt](#def-LE): https://letsencrypt.org/2016/10/21/представляючи-idn-support.html. [Вікіпедія](https://en.wikipedia.org/wiki/Internationalized_domain_name) - [RFC 5890](https://tools.ietf.org/html/rfc5890) - [RFC 5891](https://tools.ietf.org/html/rfc5891) {{% /def %}}

{{% def id="ISRG" name="Internet Security Research Group" abbr="ISRG" %}}Організація, яка стоїть за [Let's Encrypt](#def-LE): [https://www.abetterinternet.org/about/](https://www.abetterinternet.org/about/). [Вікіпедія](https://en.wikipedia.org/wiki/Internet_Security_Research_Group) {{% /def %}}

{{% def id="issuer" name="Certificate issuer" %}} Поле "Видавець" сертифіката описує, який сертифікат його підписав. Наприклад, поле "Видавець" сертифіката кінцевого користувача від Let's Encrypt може бути "Issuer: C = US, O = Let's Encrypt, CN = Let's Encrypt Authority X3". Воно зазвичай містить такі поля, як [ Загальна назва ](#def-CN), Країна та Організація. Поле "Видавець" завжди відповідає полю[ "Суб'єкт"](#def-subject) в сертифікаті. Для таких[ самопідписаних ](#def-self-signed) сертифікатів, як [кореневі](#def-root), Видавець той самий, що й Суб'єкт. Термін "Видавець" також може використовуватися для позначення сертифікатів, які видають інші сертифікати ([ проміжні ](#def-intermediate) або кореневі), або для організації, що видає сертифікати. {{% / def %}}

{{% def id="key-pair" name="Key-pair" %}} Поєднання приватного ключа та відкритого ключа, що використовується для підпису або шифрування. Відкритий ключ зазвичай вбудовується в сертифікат, тоді як приватний ключ зберігається окремо і повинен зберігатися в таємниці. Пара ключів може бути використана для шифрування та дешифрування, для підпису та перевірки даних або узгодження вторинних ключів, залежно від програми. [Wikipedia](https://en.wikipedia.org/wiki/Public-key_cryptography) {{% /def %}}

{{% def id="leaf" name="Leaf certificate (end-entity certificate)" %}} Найчастіше сертифікат, підписаний[intermediate](#def-intermediate), дійсний для набору доменів і не може підписувати інші сертифікати. Це тип сертифіката, який [ACME clients](#def-ACME-client) запрошує і використовує [web servers](#def-web-server). [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#End-entity_or_leaf_certificate) {{% /def %}}

{{% def id="LE" name="Let's Encrypt" abbr="LE" %}}[ ЦС ](#def-CA), яким керує [ ISRG ](#def-ISRG). [Wikipedia](https://en.wikipedia.org/wiki/Let%27s_Encrypt) {{% /def %}}

{{% def id="mixed-content" name="Mixed content" %}} Коли веб-сторінка HTTPS завантажує суб-ресурси (Javascript, CSS або зображення) через HTTP. [Браузери](#def-web-browser) можуть блокувати змішаний вміст або позначати сторінку як менш безпечну, якщо присутній змішаний вміст:https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content. Щоб вирішити проблему змішаного вмісту, веб -розробник повинен змінити свої сторінки, щоб усі ресурси використовували URL -адреси HTTPS. [Інструменти розробника ](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools), вбудовані у браузери і можуть використовуватися, щоб з'ясувати, які ресурси викликають проблеми зі змішаним вмістом. {{% /def %}}

{{% def id="OCSP" name="Online Certificate Status Protocol" abbr="OCSP" abbr_first="1" %}} Метод перевірки [скасування](#def-revocation) статус [certificate](#def-leaf). Іншими словами, спосіб перевірити, чи [ЦС](#def-CA) вказує, що сертифікат більше не повинен вважатися дійсним, навіть якщо термін його дії ще не досяг. Цей запит може створити проблеми з конфіденційністю, оскільки дозволяє цс та постачальникам послуг Інтернету безпосередньо спостерігати, хто відвідує які сайти. [Wikipedia](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol) {{% /def %}}

{{% def id="OCSP-must-staple" name="OCSP Must-Staple" %}}[certificate](#def-leaf)розширення, інформує [ браузер ](#def-web-browser), що [ веб-сервер ](#def-web-server) із цим сертифікатом повинен використовувати[OCSP stapling](#def-OCSP-stapling). Він використовується для того щоб вимагати оновлений статус[revocation](#def-revocation) [ сертифіката ](#def-leaf)підтверджувався веб -сервер при кожному з'єднанні, що робить відкликання більш надійним. [Let's Encrypt](#def-LE) може видавати сертифікати з OCSP Must-Staple [extension](#def-extension) за запитом. [Mozilla Security Blog](https://blog.mozilla.org/security/2015/11/23/improving-revocation-ocsp-must-staple-and-short-lived-certificates/) [RFC 7633](https://tools.ietf.org/html/rfc7633) {{% /def %}}

{{% def id="OCSP-stapling" name="OCSP stapling" %}} Спосіб для [ веб-сервера ](#def-web-server) надсилати [browser](#def-web-browser) an [OCSP](#def-OCSP) відповідь, підписана [ЦС](#def-CA), тому браузеру не потрібно подавати вторинний запит OCSP до ЦС, покращуючи швидкість та конфіденційність. Також відомий як розширення запиту статусу TLS сертифіката. [Wikipedia](https://en.wikipedia.org/wiki/OCSP_stapling) [Cloudflare](https://blog.cloudflare.com/high-reliability-ocsp-stapling/) {{% /def %}}

{{% def id="OID" name="Object identifier" abbr="OID" %}} OID - це унікальні числові ідентифікатори, стандартизовані Міжнародною телекомунікаційною спілкою (ITU) та ISO/IEC. OID використовуються в сертифікатах для визначення розширень, полів або тверджень політики. Інтернет стандарти та [Політика сертифікатів](#def-CP) і [Заяви про практику сертифікації](#def-CPS) документи визначають використання OID. [Wikipedia](https://en.wikipedia.org/wiki/Object_identifier) {{% /def %}}

{{% def id="OV" name="Organization Validation" abbr="OV" %}} Сертифікати для яких [CA](#def-CA) підтвердив юридичну особу [Subscriber](#def-subscriber). Вони містять інформацію про цю організацію. [Let's Encrypt](#def-LE) не пропонує OV сертифікатів. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Organization_validation) {{% /def %}}

{{% def id="pem" name="PEM file (.pem)" %}}Формат криптографічної інформації (спочатку вказано як частина Покращених Поштових Інтернет-стандартів для безпечної електронної пошти). Документ PEM може представляти інформацію таку як приватний ключ, відкритий ключ або цифровий сертифікат. Ці файли починаються на "-\-\-\-BEGIN", а потім тип даних. [Wikipedia](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) {{% /def %}}

{{% def id="pfx" name="Personal Information Exchange Files (.pfx)" %}} Файл, який може містити [лист сертифікату](#def-leaf), його [ланцюжок](#def-chain) до кореня і закритий ключ листа. Дивіться також https://uk.wikipedia.org/wiki/PKCS_12. [Microsoft Hardware Dev Center](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/personal-information-exchange---pfx--files) {{% /def %}}

{{% def id="precertificate" name="Precertificate" %}} Сутички є частиною [Прозорість сертифікатів](#def-CT). Пресертифікат – це копія [сертифікату](#def-leaf), який CA має намір видати, з [критичним](#def-critical) розширенням додано, щоб запобігти прийняттю попереднього сертифіката програмним забезпеченням у дикій природі. ЦС подає пресертифікат в [журнали CT](#def-CT-log) в обмін на [SCT](#def-SCT). Оскільки пресертифікат не ідентичний його відповідному сертифікату, журнали прозорості сертифікатів можуть містити обидва. [RFC 6962 Section 3.1](https://tools.ietf.org/html/rfc6962#section-3.1) {{% /def %}}

{{% def id="HPKP" name="HTTP Public Key Pinning" abbr="HPKP" %}} Механізм безпеки, який просить веб-переглядач вимагати, щоб [ланцюжок сертифікатів сайту ](#def-chain) використовувати певні відкриті ключі під час майбутніх завантажень. Chrome запровадив цей механізм для захисту від компромісу ЦС, але він спричинив перебої на сайті, що призвело до того, що Chrome [Скасуйте підтримку та видаліть її](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/ he9tr7p3rZ8). [Wikipedia](https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning) {{% /def %}}

{{% def id="PSL" name="Public Suffix List" abbr="PSL" %}} Список *Загальнодоступних суфіксів*, який підтримує Mozilla, вказуючи, який Інтернет домени доступні для багатьох окремих організацій для реєстрації субдоменів. Наприклад, список вказує, що і `com`, і `co.uk` є загальнодоступними суфіксами, хоча `co.uk` не є TLD. Веб-браузери використовують цей список, серед іншого, для того, щоб сайти, які, ймовірно, керуються різними організаціями, не могли обмінюватися файлами cookie один з одним. [Let's Encrypt](#def-LE) також використовує список для обчислення ліміту швидкості: [/rate-limits](/rate-limits). https://publicsuffix.org/ {{% /def %}}

{{% def id="relying-party" name="Relying Party" %}} Особа покладається на інформації в сертифікаті. Наприклад, хтось, хто відвідує вебсайт HTTPS, є довірчою стороною. {{% /def %}}

{{% def id="revocation" name="Revocation" %}} Сертифікат чинний до завершення терміну його дії, якщо [ЦС](#def-CA) не стверджує, що його відкликано. Сертифікат може бути відкликаний з різних причин, наприклад, компрометація приватного ключа. Веб-переглядачі можуть перевірити, чи відкликано сертифікат, використовуючи [CRL](#def-CRL), [OCSP](#def-OCSP) або новіші методи, як-от [OneCRL](https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/) і [CRLSets](https://dev.chromium .org/Home/chromium-security/crlsets). Зауважте, що в багатьох ситуаціях [відкликання не працює](https://www.imperialviolet.org/2011/03/18/revocation.html). [/docs/revoking](/docs/revoking) {{% /def %}}

{{% def id="root" name="Root certificate" %}} [самопідписаний](#def-self-signed) сертифікат, контрольований за допомогою [центр сертифікації](#def-CA), який використовується для підписання його [проміжних](#def-intermediate) сертифікатів і включений до [сховища сертифікатів](#def-store). [Wikipedia](https://en.wikipedia.org/wiki/Root_certificate) {{% /def %}}

{{% def id="root-program" name="Root Program" %}} Політики, які організація використовує, щоб вирішити, які сертифікати включити до свого [сховища сертифікатів](#def-store) , а отже, яким ЦС довіряє їх програмне забезпечення. {{% /def %}}

{{% def id="RSA" abbr="RSA" %}} Алгоритм із відкритим ключем, що використовується для шифрування та цифрового підпису сертифікатів. [Wikipedia](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) {{% /def %}}

{{% def id="self-signed" name="Self-signed certificate" %}} Сертифікат, підписаний власним закритим ключем, з [темою](#def-subject) рівним до свого [емітента](#def-issuer). Самопідписані сертифікати є надійними лише завдяки попереднім домовленостям, зробленим у фізичному світі, як-от включення до [довіреного кореневого списку](#def-store). [Кореневі сертифікати](#def-root) є самопідписаними.  [Wikipedia](https://en.wikipedia.org/wiki/Self-signed_certificate) {{% /def %}}

{{% def id="SNI" name="Server Name Indication" abbr="SNI" %}} Поле, яке [агент користувача](#def-user-agent) надсилає до [сервер](#def-web-server) під час рукостискання [TLS](#def-TLS), вказуючи ім’я домену для підключення. Це дозволяє серверу відповідати відповідним [сертифікатом](#def-leaf), коли кілька доменів розміщено за однією IP-адресою. Веб-сервер може надсилати інший сертифікат і показувати інший вміст, залежно від імені, яке клієнт запитав SNI. SNI не зашифрований, але експериментальна заміна, ESNI, є. [Wikipedia](https://en.wikipedia.org/wiki/Server_Name_Indication) {{% /def %}}

{{% def id="SCT" name="Signed Certificate Timestamp" abbr="SCT" %}} Підписана, піддана перевірці обіцянка опублікувати сертифікат із [сертифікату Журнал прозорості](#def-CT-log). Веб-переглядачі, які застосовують [CT](#def-CT), перевіряють наявність SCT в сертифікаті сайту або в рукостисканні [TLS](#def-TLS) , і відмовитися від підключення до сайтів, які не відповідають їхнім вимогам до реєстрації. Це підвищує ймовірність виявлення шахрайських або неточних сертифікатів. https://www.certificate-transparency.org/how-ct-works {{% /def %}}

{{% def id="SSL" name="Secure Sockets Layer" abbr="SSL" abbr_first="1" %}} Старша назва для [TLS](#def-TLS), досі в загальному вжитку. {{% /def %}}

{{% def id="staging" name="Staging" %}} [Let's Encrypt](#def-LE) надає проміжний API для перевірки запиту сертифіката, не впливаючи на обмеження швидкості. Сертифікати, створені проміжним середовищем, *не* є загальнодоступними. Проміжне середовище має використовуватися для тестування, налагодження та розробки клієнта ACME. [/docs/staging-environment](/docs/staging-environment) {{% /def %}}

{{% def id="SAN" name="Subject Alternative Name" abbr="SAN" %}} Поле [сертифікату](#def-leaf), яке вказує на який домен( s) сертифікат дійсний. Він замінює використання [Загального імені](#def-CN), яке тепер надається лише з міркувань сумісності. Один сертифікат може містити багато SAN, які дійсні для різних доменних імен. [Вікіпедія](https://en.wikipedia.org/wiki/Subject_Alternative_Name) https://letsencrypt.org/uk/docs/rate-limits/#names-per-certificate {{% /def %}}

{{% def id="subscriber" name="Subscriber" %}} Особа або організація, яка запитує сертифікат. {{% /def %}}

{{% def id="TLD" name="Top-Level Domain" abbr="TLD" %}} Найвищий рівень в ієрархічній системі імена доменів, таких як домени верхнього рівня (ccTLD), такі як `. e` (Німеччина), `.cn` (Китай) і загальні домени вищого рівня як `. om-`, `.org`. [Wikipedia](https://en.wikipedia.org/wiki/Top-level_domain) {{% /def %}}

{{% def id="TLS" name="Transport-Level Security" abbr="TLS" abbr_first="1" %}} Протокол, який використовується HTTPS для шифрування та перевірки справжності відвіданих вебсторінок. {{% /def %}}

{{% def id="TLSA" abbr="TLSA" %}} Частина [DANE](#def-DANE) спеціально пов'язана з перевіркою з'єднань [TLS](#def-TLS). {{% /def %}}

{{% def id="UCC" name="Unified Communications Certificate" abbr="UCC" %}} Опис сертифікату, що містить кілька [Альтернативних імен суб'єкта (SAN)](#def-SAN). {{% /def %}}

{{% def id="web-browser" name="Web Browser" %}} } Користувач [](#def-user-agent) використовується для відображення веб-сторінок. Приклади: *Mozilla Firefox*, *Google Chrome* або *Internet Explorer format@@*. [Wikipedia](https://en.wikipedia.org/wiki/Web_browser) {{% /def %}}

{{% def id="user-agent" name="User Agent" %}} Програмне забезпечення для обміну даними з [вебсервером](#def-web-server). Наприклад: [браузер](#def-web-browser) або [cURL](https://uk.wikipedia.org/wiki/CURL).{{% /def %}}

{{% def id="web-server" name="Web server" %}} Програмне забезпечення обслуговування вебсторінок (або, розширено, апаратне серверне забезпечення, яке розміщує їх). [Wikipedia](https://en.wikipedia.org/wiki/Web_server) {{% /def %}}

{{% def id="wildcard" name="Wildcard Certificate" %}} Сертифікати дійсні для піддоменів на один рівень нижче. Наприклад, сертифікат, що містить [SAN](#def-SAN) для `*.example.com`, дійсний для `blog.example.com` і для `www.example.com`, але **не** для `bork.bork.example.com` або `example.com`). Підставлення (джокер) позначено символом зірочки (*) замість піддомену. [Let's Encrypt](#def-LE) [надає Wildcard-сертифікати від березня 2018 року](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579). [Wikipedia](https://en.wikipedia.org/wiki/Wildcard_certificate) {{% /def %}}

{{% def id="X509" abbr="X.509" %}} Звичайне визначення формату публічних сертифікатів. [Wikipedia](https://en.wikipedia.org/wiki/X.509) {{% /def %}}

{{% renderglossary %}}

<link rel="stylesheet" href="/css/glossary.css" />
<script src="/js/glossary.js" async></script>


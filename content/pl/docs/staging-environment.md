---
title: Środowisko testowe
slug: staging-environment
top_graphic: 1
date: 2018-01-05
lastmod: 2022-06-13
show_lastmod: 1
---


Stanowczo zalecamy przeprowadzenie testów z naszym środowiskiem testowym przez użyciem naszego oficjalnego środowiska. Pozwoli to na sprawdzenie poprawności przed wydaniem zaufanych certyfikatów oraz zmniejszy szansę na osiągnięcie limitów przesyłu.

Adres URL ACME dla naszego [środowiska testowego ACME v2](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605) to:

`https://acme-staging-v02.api.letsencrypt.org/directory`

Jeśli korzystasz z Certbot, możesz skorzystać z naszego środowiska testowego za pomocą argumentu `--test-cert`. Dla innych klientów ACME należy zapoznać się z ich instrukcjami, aby uzyskać informacje o testowaniu z użyciem naszego środowiska testowego. Pamiętaj, że środowisko testowe v2 wymaga klienta ACME zgodnego z v2.

# Limity przesyłu

Środowisko testowe posiada nałożone limity przesyłu, tak jak i [oficjalne środowisko](/docs/rate-limits) z następującymi wyjątkami:

* Limit **certyfikatów na zarejestrowaną domenę** wynosi 30,000 na tydzień.
* Limit **duplikowania certyfikatów** wynosi 30,000 na tydzień.
* Limit **niepowodzeń weryfikacji** wynosi 60 na godzinę.
* Limit **kont na adres IP** wynosi 50 kont na 3 godziny na adres IP.
* Dla ACME v2, limit **nowych zamówień** wynosi 1,500 nowych zamówień na 3 godziny na konto.

# Hierarchia certyfikatu testowania

Hierarchia certyfikatu środowiska testowego naśladuję tę z [oficjalnego środowiska](/certificates).

## Certyfikaty pośrednie

Środowisko testowe posiada dwa aktywne certyfikaty pośrednie: RSA ["(TESTOWE) Artificial Apricot R3"](/certs/staging/letsencrypt-stg-int-r3.pem) oraz ECDSA ["(TESTOWE) Ersatz Edamame E1"](/certs/staging/letsencrypt-stg-int-e1.pem).

Wydawanie ECDSA zostało [włączone dla testowania](https://community.letsencrypt.org/t/ecdsa-issuance-available-in-staging-march-24/147839) w dniu 24 marca 2021 roku, a wszystkie zapytania dla certyfikatów testowania z kluczami ECDSA są podpisane przez "(TESTOWE) Ersatz Edamame E1" oraz wykorzystują hierarchię ECDSA. Podobnie jest w przypadku zapytań dla certyfikatów testowania z kluczami RSA, gdzie są one podpisane przez "(TESTOWE) Artificial Apricot R3" oraz wykorzystują hierarchię RSA. Nie ma możliwości uzyskania certyfikatu podpisanego przez RSA dla klucz ECDSA, ani odwrotnie; aby kontrolować tożsamość wydawcy, należy kontrolować, jakiego rodzaju klucz jest generowany lokalnie.

## Certyfikaty główne

Środowisko testowe posiada dwa aktywne certyfikaty główne, które **nie są obecne** w magazynie zaufania przeglądarki/klienta: "(TESTOWE) Pretend Pear X1" oraz "(TESTOWE) Bogus Brocoli X2". Jeśli chcesz zmodyfikować klienta testowego, tak aby ufał środowisku testowemu w celach testowych, należy dodać certyfikat ["(TESTOWE) Pretend Pear X1"](/certs/staging/letsencrypt-stg-root-x1.pem) i/lub ["(TESTOWE) Bogus Broccoli X2"](/certs/staging/letsencrypt-stg-root-x2.pem) do testowego magazynu zaufania. Wszystkie nasze certyfikaty testowania znajdziesz [tutaj](https://github.com/letsencrypt/website/tree/master/static/certs/staging).  Ważne: Nie dodawaj głównego lub pośredniego certyfikatu testowania do magazynu zaufania, z którego korzystasz do zwykłego przeglądania lub innych czynności, ponieważ nie są one sprawdzane lub utrzymywane w tych samych standardach, co nasze oficjalne certyfikaty główne, a zatem nie są bezpieczne do używania do czegokolwiek innego niż testowanie.

# Przejrzystość certyfikatów

Środowisko testowe przesyła wstępne certyfikaty do dzienników testów CT Let's Encrypt Sapling i Google testtube i uwzględnia zwrócone SCT w wystawionych certyfikatach.

# Ciągła Integracja / Testowanie Rozwojowe

Środowisko testowe generuje limity szybkości, aby umożliwić testowanie, ale nie sprzyja to integracji ze środowiskami programistycznymi lub ciągłej integracji (CI). Wysyłanie żądań sieciowych do serwerów zewnętrznych może spowodować niestabilność, a środowisko testowe nie pozwala na „sfałszowanie” DNS ani zakwestionowanie powodzenia walidacji, co powoduje bardziej skomplikowane konfiguracje testów.

Oprócz środowiska testowego Let's Encrypt oferuje mały serwer ACME zbudowany specjalnie dla CI i środowisk programistycznych o nazwie Pebble. Uruchamianie Pebble na komputerze programistycznym lub w środowisku CI jest szybkie i łatwe.

---
title: Najlepsza praktyka - pozostaw otwarty port 80
slug: allow-port-80
lastmod: 2019-01-24
show_lastmod: 1
---


Od czasu do czasu otrzymujemy raporty od osób, które mają problemy z używaniem typu wyzwania HTTP-01, ponieważ port 80 został zablokowany na firewallu. Nasza rekomendacja to - serwery web generalnego użytku powinny być dostępne zarówno na porcie 80 - dla HTTP jak i na porcie 443 - dla HTTPS. Dodatkowo serwery powinny być skonfigurowane tak, aby przekierowywać cały ruch z portu 80 na port 443 oraz dodawać nagłówek HSTS (dla żądań na porcie 443).

Dopuszczenie ruchu na port 80 nie zwiększa powierzchni ataku na Twój serwer, ponieważ żądania kierowane na port 80 są w większości przypadków obsługiwane przez to samo oprogramowanie które działa na porcie 443.

Zamknięcie portu 80 nie zmniejsza ryzyka dla osoby, która przypadkowo odwiedzi Twoją stronę internetową przez HTTP. W normalnych okolicznościach osoba ta otrzymałaby przekierowanie do HTTPS, a jej dalszy ruch będzie chroniony. Jeśli taka osoba jest celem ataku MITM - MITM odpowiedziałby na porcie 80, więc Twoja strona i tak nie miałaby szansy odpowiedzieć "połączenie zabronione".

Pozostaw więc port 80 otwarty po to, aby Twój serwer mógł wysłać przekierowanie do poprawnej wersji strony (czyli wersji serwowanej po HTTPS). Jest wiele sytuacji poza Twoją kontrolą które mogą spowodować, że ktoś otworzy wersję HTTP Twojej strony internetowej - przykładowo: ręcznie wpisując adres w przeglądarce. Lepiej jest przekierować takie osoby niż pokazać im błąd połączenia.

Niestety czasem możesz nie mieć kontroli nad tym, czy port 80 jest otwarty. Niektórzy ISP (np. domowi) blokują port 80 z różnych powodów. Jeśli Twój ISP to robi dalej możesz uzyskać certyfikat Let's Encrypt. Aby to zrobić możesz skorzystać z DNS-01 Challenege lub użyć [klienta który wspiera TLS-ALPN-01 challenge](https://community.letsencrypt.org/t/which-client-support-tls-alpn-challenge/75859/2) (na porcie 443).

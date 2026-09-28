---
title: Certifikáty pro localhost
slug: certificates-for-localhost
lastmod: 2025-07-31
show_lastmod: 1
---

Uživatelé někdy chtějí získat certifikát pro název hostitele „localhost“, ať už pro místní vývoj, nebo pro distribuci s nativní aplikací, která potřebuje komunikovat s webovou aplikací. Let's Encrypt nemůže certifikáty pro „localhost“ poskytovat, protože tento název nikomu jednoznačně nepatří a není součástí domény nejvyšší úrovně, například „.com“ nebo „.net“. Můžete si nastavit vlastní název domény, který se překládá na adresu `127.0.0.1`, a získat pro něj certifikát pomocí výzvy DNS. Obecně to však není dobrý nápad a existují vhodnější možnosti.

# Pro místní vývoj

Při vývoji webové aplikace je užitečné spustit místní webový server, například Apache nebo Nginx, a v prohlížeči jej otevřít na adrese `http://localhost:8000/`. Webové prohlížeče se však na stránkách HTTP a HTTPS v některých ohledech chovají odlišně. Hlavní rozdíl spočívá v tom, že na stránce HTTPS budou zablokovány všechny požadavky na načtení JavaScriptu z adresy URL používající HTTP. Pokud tedy při místním vývoji používáte HTTP, můžete přidat prvek script, který na vývojovém počítači funguje, ale po nasazení na produkční web s HTTPS přestane fungovat. Chcete-li takové problémy odhalit, je užitečné nastavit HTTPS i na místním webovém serveru. Nechcete však neustále vídat upozornění na certifikát. Jak tedy zelený zámek získat i místně?

Nejlepší možností je vygenerovat vlastní certifikát, buď podepsaný sám sebou, nebo místním kořenovým certifikátem, a označit jej v úložišti důvěryhodných certifikátů operačního systému za důvěryhodný. Tento certifikát pak použijte na místním webovém serveru. Podrobnosti najdete níže.

# Nativní aplikace komunikující s webovými aplikacemi

Vývojáři někdy chtějí nabídnout nativní aplikaci ke stažení, která se používá společně s webem a přidává další funkce. Desktopové aplikace Dropbox a Spotify například vyhledávají soubory v celém počítači, což webová aplikace dělat nesmí. Častým řešením je, že nativní aplikace zpřístupní webovou službu na localhostu a webová aplikace jí odesílá požadavky prostřednictvím XMLHttpRequest (XHR) nebo WebSockets. Webová aplikace téměř vždy používá HTTPS, takže jí prohlížeče zakážou odesílat požadavky XHR nebo WebSockets na nezabezpečené adresy URL. Tento mechanismus se nazývá blokování smíšeného obsahu. Aby mohla nativní aplikace komunikovat s webovou aplikací, musí poskytovat zabezpečenou webovou službu.

Moderní prohlížeče naštěstí [považují][mcb-localhost] adresu `http://127.0.0.1:8000/` za [„potenciálně důvěryhodnou“][secure-contexts], protože odkazuje na adresu zpětné smyčky. Provoz odeslaný na adresu `127.0.0.1` zaručeně neopustí váš počítač, a proto se automaticky považuje za zabezpečený proti zachycení v síti. Pokud tedy webová aplikace používá HTTPS a nativní aplikace nabízí webovou službu na adrese `127.0.0.1`, mohou spolu bez problémů komunikovat prostřednictvím XHR. Pro název [localhost bohužel zatím stejné zacházení neplatí][let-localhost]. Pro WebSockets navíc toto zacházení neplatí u žádného z obou názvů.

Tato omezení se můžete pokusit obejít nastavením názvu domény v globálním systému DNS, který se překládá na adresu `127.0.0.1`, například `localhost.example.com`. Pro tento název domény byste získali certifikát, certifikát i příslušný soukromý klíč distribuovali s nativní aplikací a webové aplikaci přikázali komunikovat s adresou `https://localhost.example.com:8000/` namísto `http://127.0.0.1:8000/`. *Nedělejte to.* Ohrozili byste uživatele a váš certifikát by mohl být zneplatněn.

Použitím názvu domény namísto IP adresy umožníte útočníkovi provést útok man-in-the-middle (MitM) na vyhledávání DNS a podvrhnout odpověď odkazující na jinou IP adresu. Útočník se pak může vydávat za místní aplikaci a odesílat webové aplikaci falešné odpovědi. V závislosti na návrhu webové aplikace tím může napadnout váš účet.

Úspěšný útok MitM je v této situaci možný proto, že byste spolu s nativní aplikací museli distribuovat také soukromý klíč k certifikátu. Kopii soukromého klíče by tak získal každý, kdo si nativní aplikaci stáhne, včetně útočníka. To se považuje za kompromitaci soukromého klíče. Pokud se o ní certifikační autorita (CA) dozví, musí váš certifikát zneplatnit. [Řadě nativních aplikací][mdsp1] již byly [certifikáty zneplatněny][mdsp2], protože [distribuovaly svůj soukromý klíč][mdsp3].

Nativním aplikacím tak bohužel zbývá jen málo vhodných a bezpečných možností komunikace s příslušným webem. Situace se navíc může v budoucnu zkomplikovat, pokud prohlížeče dále [omezí přístup webů k localhostu][tighten-access].

Mějte také na paměti, že zpřístupnění webové služby nabízející privilegovaná nativní API je ze své podstaty rizikové, protože k nim mohou přistupovat i weby, kterým jste oprávnění udělit nechtěli. Pokud se touto cestou vydáte, seznamte se s mechanismem [Cross-Origin Resource Sharing][cors], používejte Access-Control-Allow-Origin a zvolte analyzátor HTTP bezpečný z hlediska práce s pamětí. I zdroje, kterým přístup nepovolíte, totiž mohou odesílat předběžné požadavky a zneužít případné chyby analyzátoru.

# Vytváření vlastních certifikátů a nastavení jejich důvěryhodnosti

Vlastní certifikát si může bez pomoci certifikační autority vytvořit kdokoli. Jediný rozdíl spočívá v tom, že certifikátům, které si vytvoříte sami, nebude důvěřovat nikdo jiný. Pro místní vývoj to nevadí.

Nejjednodušší způsob, jak vygenerovat soukromý klíč a certifikát pro localhost podepsaný sám sebou, nabízí následující příkaz openssl:

    openssl req -x509 -out localhost.crt -keyout localhost.key \
      -newkey rsa:2048 -nodes -sha256 \
      -subj '/CN=localhost' -extensions EXT -config <( \
       printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

Poté můžete na místním webovém serveru nastavit soubory localhost.crt a localhost.key a soubor localhost.crt nainstalovat do seznamu místně důvěryhodných kořenových certifikátů.

Pokud chcete, aby vývojové certifikáty více odpovídaly skutečnému nasazení, můžete pomocí nástroje [mkcert][mkcert] vygenerovat vlastní místní kořenový certifikát a vydávat jím podepsané koncové neboli listové certifikáty. V takovém případě byste namísto koncového certifikátu podepsaného sama sebou importovali kořenový certifikát.

Můžete také použít doménu obsahující tečky, například `www.localhost`, a přidat ji do souboru /etc/hosts jako alias adresy `127.0.0.1`. Tím se mírně změní způsob, jakým prohlížeče ukládají soubory cookie.

[mcb-localhost]: https://bugs.chromium.org/p/chromium/issues/detail?id=607878
[secure-contexts]: https://www.w3.org/TR/secure-contexts/#is-origin-trustworthy
[let-localhost]: https://tools.ietf.org/html/draft-ietf-dnsop-let-localhost-be-localhost-02
[mdsp1]: https://groups.google.com/d/msg/mozilla.dev.security.policy/eV89JXcsBC0/wsj5zpbbAQAJ
[mdsp2]: https://groups.google.com/d/msg/mozilla.dev.security.policy/T6emeoE-lCU/-k-A2dEdAQAJ
[mdsp3]: https://groups.google.com/d/msg/mozilla.dev.security.policy/pk039T_wPrI/tGnFDFTnCQAJ
[tighten-access]: https://bugs.chromium.org/p/chromium/issues/detail?id=378566
[mkcert]: https://github.com/FiloSottile/mkcert
[cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

---
title: Certificats pour localhost
slug: certificates-for-localhost
date: 2017-12-21
lastmod: 2017-12-21
show_lastmod: 1
---


Parfois, les gens veulent obtenir un certificat pour le nom d'hôte "localhost", soit pour une utilisation dans le développement local, soit pour une distribution avec une application native qui a besoin de communiquer avec une application web. Let's Encrypt ne peut pas fournir de certificats pour "localhost" parce que personne n'en est le seul propriétaire et qu'il ne s'agit pas d'un domaine de premier niveau comme ".com" ou ".net". Il est possible de configurer votre propre nom de domaine qui se trouve à l'adresse `127.0.0.1`, et d'obtenir un certificat pour celui-ci en utilisant le challenge DNS. Cependant, c'est généralement une mauvaise idée et il existe de meilleures options.

# Pour le développement local

Si vous développez une application web, il est utile de faire fonctionner un serveur web local comme Apache ou Nginx, et d'y accéder via `http://localhost:8000/` dans votre navigateur web. Cependant, les navigateurs web se comportent de manière subtilement différente sur les pages HTTP et HTTPS. La principale différence : Sur une page HTTPS, toute demande de chargement de JavaScript à partir d'une URL HTTP sera bloquée. Ainsi, si vous développez localement en utilisant le protocole HTTP, vous pouvez ajouter une balise de script qui fonctionne bien sur votre machine de développement, mais qui ne marche pas lorsque vous la déployez sur votre site de production HTTPS. Pour remédier à ce genre de problème, il est utile de mettre en place le HTTPS sur votre serveur web local. Cependant, vous ne voulez pas voir des avertissements concernant les certificats tout le temps. Comment obtenir le cadenas vert au niveau local ?

La meilleure option : Générez votre propre certificat, soit auto-signé, soit signé par un root local, et faites-lui confiance dans le magasin de certificats de votre système d'exploitation. Utilisez ensuite ce certificat dans votre serveur web local. Voir ci-dessous pour plus de détails.

# Pour les applications natives dialoguant avec les applications web

Parfois, les développeurs souhaitent proposer une application native téléchargeable qui peut être utilisée simultanément avec un site web pour offrir des fonctionnalités supplémentaires. Par exemple, les applications de bureau Dropbox et Spotify recherchent des fichiers sur votre machine, ce qu'une application web ne serait pas autorisée à faire. Une approche courante consiste à ce que ces applications natives offrent un service web sur localhost, et que l'application web fasse des requêtes via XMLHTTPRequest (XHR) ou WebSockets. L'application web utilise presque toujours le HTTPS, ce qui signifie que les navigateurs lui interdisent d'effectuer des requêtes XHR ou WebSockets vers des URL non sécurisées. C'est ce qu'on appelle le "Mixed Content Blocking". Pour communiquer avec l'application web, l'application native doit fournir un service web sécurisé.

Heureusement, les navigateurs modernes [considèrent ][mcb-localhost] `http://127.0.0.1:8000/` comme une URL ["potentiellement fiable"][secure-contexts] car elle renvoie à une adresse de loopback. Le trafic envoyé a `127.0.0.1` est garanti de ne pas quitter votre machine, et est donc considéré comme automatiquement sécurisé contre l'interception par le réseau. Cela signifie que si votre application web est HTTPS, et que vous offrez un service web d'application native sur `127.0.0.1`, les deux peuvent heureusement communiquer via XHR. Malheureusement, [localhost ne reçoit pas encore le même traitement][let-localhost]. De plus, WebSockets n'obtiennent ce traitement pour aucun des deux noms.

Vous pourriez être tenté de contourner ces limites en configurant un nom de domaine dans le DNS global qui se trouve à `127.0.0.1` (par exemple, `localhost.example.com`), en obtenant un certificat pour ce nom de domaine, en envoyant ce certificat et la clé privée correspondante avec votre application native, et en disant à votre application web de communiquer avec `https://localhost.example.com:8000/` au lieu de `http://127.0.0.1:8000/`. *Ne faites pas cela.* Cela mettra vos utilisateurs en danger, et votre certificat pourrait être révoqué.

En introduisant un nom de domaine au lieu d'une adresse IP, vous permettez à un attaquant de pirater le DNS (Man in the Middle attack) et d'injecter une réponse qui pointe vers une adresse IP différente. L'attaquant peut alors prétendre être l'application locale et renvoyer de fausses réponses à l'application web, ce qui peut compromettre votre compte du côté de l'application web, selon la façon dont elle est conçue.

Le MitM réussi dans cette situation est possible parce que, pour qu'il fonctionne, vous avez dû envoyer la clé privée de votre certificat avec votre application native. Cela signifie que toute personne qui télécharge votre application native obtient une copie de la clé privée, y compris l'attaquant. Ceci est considéré comme une compromission de votre clé privée, et votre autorité de certification (CA) est tenue de révoquer votre certificat si elle en a connaissance. [De nombreuses applications natives ][mdsp1]ont [vu leurs certificats ][mdsp2]révoqués pour [avoir expédié leur clé privée][mdsp3].

Malheureusement, cela laisse les applications natives sans beaucoup de bonnes options sécurisées pour communiquer avec leur site web correspondant. Et la situation pourrait devenir plus délicate à l'avenir si les navigateurs [resserrent encore l'accès à localhost à partir du web][tighten-access].

Notez également que l'exportation d'un service web qui offre des API natives avec privilèges est intrinsèquement risquée, car des sites web que vous n'aviez pas l'intention d'autoriser peuvent y accéder. Si vous empruntez cette voie, assurez-vous de vous informer sur le partage de ressources [Cross-Origin Resource Sharing][cors], d'utiliser Access-Control-Allow-Origin, et d'utiliser un analyseur HTTP sans risque pour la mémoire, car même les origines auxquelles vous n'autorisez pas l'accès peuvent envoyer des demandes en amont, ce qui peut permettre d'exploiter des bogues dans votre analyseur.

# Établir et faire confiance à vos propres certificats

Tout le monde peut fabriquer ses propres certificats sans l'aide d'une AC. La seule différence est que les certificats que vous faites vous-même n'auront pas la confiance des autres. Pour le développement local, c'est très bien.

La façon la plus simple de générer une clé privée et un certificat auto-signé pour localhost est d'utiliser cette commande openssl :

    openssl req -x509 -out localhost.crt -keyout localhost.key \
      -newkey rsa:2048 -nodes -sha256 \
      -subj '/CN=localhost' -extensions EXT -config <( \
       printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

Vous pouvez ensuite configurer votre serveur web local avec localhost.crt et localhost.key, et installer localhost.crt dans votre liste de racines locales de confiance.

Si vous voulez un peu plus de réalisme dans vos certificats de développement, vous pouvez utiliser [minica][minica] pour générer votre propre certificat racine local, et émettre les certificats d'entité finale (alias leaf) signés par elle. Vous importeriez alors le certificat racine plutôt qu'un certificat d'entité finale auto-signé.

Vous pouvez également choisir d'utiliser un domaine contenant des points, comme `www.localhost`, en l'ajoutant à /etc/hosts comme alias de `127.0.0.1`. Cela modifie subtilement la façon dont les navigateurs gèrent le stockage des cookies.

[mcb-localhost]: https://bugs.chromium.org/p/chromium/issues/detail?id=607878
[secure-contexts]: https://www.w3.org/TR/secure-contexts/#is-origin-trustworthy
[let-localhost]: https://tools.ietf.org/html/draft-ietf-dnsop-let-localhost-be-localhost-02
[mdsp1]: https://groups.google.com/d/msg/mozilla.dev.security.policy/eV89JXcsBC0/wsj5zpbbAQAJ
[mdsp2]: https://groups.google.com/d/msg/mozilla.dev.security.policy/T6emeoE-lCU/-k-A2dEdAQAJ
[mdsp3]: https://groups.google.com/d/msg/mozilla.dev.security.policy/pk039T_wPrI/tGnFDFTnCQAJ
[tighten-access]: https://bugs.chromium.org/p/chromium/issues/detail?id=378566
[minica]: https://github.com/jsha/minica
[cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

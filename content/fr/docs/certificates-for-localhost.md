---
title: Certificats pour localhost
slug: certificates-for-localhost
top_graphic: 1
date: 2017-12-21
lastmod: 2017-12-21
---

{{< lastmod >}}

Parfois, les gens veulent obtenir un certificat pour le nom d'hôte "localhost", soit pour une utilisation de développement local, soit pour la distribution avec une application native qui doit communiquer avec une application Web. Let's Encrypt ne peut pas fournir de certificats pour "localhost" parce que personne ne le possède de façon unique, et il n'est pas lié  à un domaine de premier niveau comme ".com" ou ".net". Il est possible de configurer votre propre nom de domaine qui soit résolu en `127.0.0.1`, et ainsi lui obtenir un certificat en utilisant le défi DNS. Cependant, c'est généralement un mauvaise idée et il y a de meilleures options.

# Pour un développement local

Si vous développez une application Web, il est utile d'exécuter un serveur Web local tel que Apache ou Nginx, et y accéder via `http://localhost:8000/` via votre navigateur Web. Cependant, les navigateurs Web se comportent de manière subtilement différente sur les pages HTTP versus HTTPS. La principale différence: sur une page HTTPS, toute demande de chargement de JavaScript à partir d'une URL HTTP sera bloquée. Donc, si vous développez localement en utilisant HTTP, vous pourriez ajoutez une balise de script qui fonctionne bien sur votre machine de développement, mais qui cesse de fonctionner lorsque vous déployez sur votre site de production en HTTPS. Pour résoudre ce genre de problème, il est utile de configurer HTTPS sur votre serveur Web local. Cependant, vous ne voulez pas voir d'avertissements de certificat tout le temps. Comment obtenir le cadenas localement?

La meilleure option: Générez votre propre certificat, auto-signé ou signé par une racine locale et assurez-vous que le magasin de confiance de certificat de votre système d'exploitation lui face confiance. Ensuite, utilisez ce certificat sur votre serveur Web local. Voir ci-dessous pour plus de détails.

# Pour les applications natives parlant aux applications Web

Parfois, les développeurs souhaitent proposer une application native téléchargeable qui peut être utilisée aux côtés d'un site Web pour offrir des fonctionnalités supplémentaires. Par exemple, les applications de bureau Dropbox et Spotify recherchent des fichiers sur l'ensemble de votre machine, ce qu'une application Web ne serait pas autorisée à faire. Une approche courante est pour ces applications natives d'offrir un service Web sur localhost et d'avoir l'application Web qui fait ses demandes via XMLHTTPRequest (XHR) ou WebSockets. L'application Web utilise presque toujours HTTPS, ce qui signifie que les navigateurs lui interdiront de faire des requêtes XHR ou WebSockets vers des URL non sécurisées. C'est ce qu'on appelle le blocage de contenu mixte (Mixed Content Blocking). Pour communiquer avec l'application Web, l'application native doit fournir un service Web sécurisé.

Heureusement, les navigateurs modernes [considèrent][mcb-localhost] `http://127.0.0.1:8000/` comme une URL ["potentiellement digne de confiance"][secure-contexts] car elle fait référence à une adresse de bouclage. Le trafic envoyé vers `127.0.0.1` est garanti de ne pas quitter votre machine, et est donc considéré comme automatiquement protégé contre une interception réseau. Cela signifie que si votre application Web utilise HTTPS et que vous proposez un service Web d'application natif sur `127.0.0.1`, les deux peuvent tranquillement communiquer via XHR. Malheureusement, [localhost ne reçoit pas encore le même traitement][let-localhost]. En outre, les WebSockets ne bénéficient pas de ce traitement pour l'un ou l'autre nom.

Vous pourriez être tenté de contourner ces limitations en configurant un nom de domaine dans le DNS global qui résolverait  `127.0.0.1` (par exemple, `localhost.example.com`), obtiendrait un certificat pour ce nom de domaine, envoyant ce certificat et sa clef privée correspondante avec votre application native, et en indiquant à votre application Web de communiquer via `https://localhost.example.com:8000/`  au lieu de `http://127.0.0.1:8000/`.
*Ne faites pas cela.* Cela mettrait vos utilisateurs en danger et votre certificat pourrait être révoqué.

En introduisant un nom de domaine au lieu d'une adresse IP, vous permettez à un attaquant d'utiliser la technique du "Man in the Middle" (MitM) sur le DNS et injecter une réponse qui pointe vers une adresse IP différente. L'attaquant peut alors prétendre être en local et renvoyez de fausses réponses à l'application Web, ce qui peut compromettre votre compte du côté de l'application Web, selon la façon dont elle est conçue.

Le MitM réussi est possible dans cette situation car pour réussir, vous avez dû joindre la clef privée de votre certificat à votre application native. Cela signifie que toute personne qui télécharge votre application native obtient une copie de la clef privée, y compris l'attaquant. Ceci est considéré comme une compromission de votre clef privée et votre autorité de certification (AC) est tenue de révoquer votre certificat s’il en prend connaissance. [De nombreuses applications natives][mdsp1] ont [eu leur certificats][mdsp2] révoqués suite à [distribution de leur clef privée][mdsp3].

Malheureusement, cela laisse les applications natives sans beaucoup de bonnes options sécurisées pour communiquer avec leur site Web correspondant. Et la situation peut devenir plus difficile à l’avenir si les navigateurs continuent [de resserrer l’accès à l’hôte local web][tighten-access].

Notez également que l'exportation d'un service Web qui propose des API natives privilégiée est
intrinsèquement risqué, car des sites Web que vous n'aviez pas l'intention d'autoriser peuvent
y accéder. Si vous suivez cette voie, assurez-vous d'étudier le [Partage des ressources Cross-Origin][cors], utilisez Access-Control-Allow-Origin et assurez-vous d'utiliser un "Parser" HTTP sécurisé en mémoire, car même les sources auxquelles vous n'autorisez pas l'accès peuvent envoyer des pré-demandes, qui peuvent être en mesure d'exploiter les bogues de votre analyseur.

# Créer et faire confiance à vos propres certificats

Tout le monde peut créer ses propres certificats sans l'aide d'une autorité de certification. La seule différence est que personne d'autre que vous ne fera confiance aux certificats que vous produirez. Pour le développement local, c'est sufisant.

La façon la plus simple de générer une clef privée et un certificat auto-signé pour localhost est d'utiliser cette commande openssl:


    openssl req -x509 -out localhost.crt -keyout localhost.key \
      -newkey rsa:2048 -nodes -sha256 \
      -subj '/CN=localhost' -extensions EXT -config <( \
       printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

Vous pouvez ensuite configurer votre serveur Web local avec localhost.crt et localhost.key puis installer localhost.crt dans votre liste de racines approuvées localement.

Si vous voulez un peu plus de réalisme dans vos certificats de développement, vous pouvez utiliser
[minica][minica] pour générer votre propre certificat racine local et émettre des certificats d'entité finale (aka leaf certificates) signés par lui. Vous importeriez ensuite la racine du certificat plutôt qu'un certificat d'entité finale auto-signé.

Vous pouvez également choisir d'utiliser un domaine contenant des points, comme `www.localhost`, en l'ajouter à /etc/hosts comme alias de `127.0.0.1`. Cela change subtilement la façon dont les navigateurs gèrent le stockage des cookies. 

[mcb-localhost]: https://bugs.chromium.org/p/chromium/issues/detail?id=607878
[secure-contexts]: https://www.w3.org/TR/secure-contexts/#is-origin-trustworthy
[let-localhost]: https://tools.ietf.org/html/draft-ietf-dnsop-let-localhost-be-localhost-02
[mdsp1]: https://groups.google.com/d/msg/mozilla.dev.security.policy/eV89JXcsBC0/wsj5zpbbAQAJ
[mdsp2]: https://groups.google.com/d/msg/mozilla.dev.security.policy/T6emeoE-lCU/-k-A2dEdAQAJ
[mdsp3]: https://groups.google.com/d/msg/mozilla.dev.security.policy/pk039T_wPrI/tGnFDFTnCQAJ
[tighten-access]: https://bugs.chromium.org/p/chromium/issues/detail?id=378566
[minica]: https://github.com/jsha/minica
[cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

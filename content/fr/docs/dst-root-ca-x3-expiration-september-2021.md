---
title: Expiration de l'AC racine X3 de DST (septembre 2021)
slug: dst-root-ca-x3-expiration-september-2021
top_graphic: 1
lastmod: 2021-09-30
menu:
  main:
    weight: 30
    parent: about
show_lastmod: 1
---

> **Mise à jour le 30 septembre 2021** Comme prévu, la signature croisée de l'autorité de certification racine X3 de DST a expiré, et nous utilisons désormais notre propre autorité de certification racine X1 de l'ISRG pour la confiance sur presque tous les appareils. Pour plus de détails sur le plan, lisez la suite ! Nous avons également mis à jour notre fil de discussion sur les changements dans la chaîne de production sur notre forum communautaire - [notre équipe et notre communauté sont là et prêtes à vous aider](https://community.letsencrypt.org/t/production-chain-changes/150739/4) pour toutes les questions que vous pourriez avoir à propos de cette expiration.

Le 30 septembre 2021, il y aura un petit changement dans la façon dont les navigateurs et les appareils plus anciens font confiance aux certificats de Let's Encrypt. Si vous gérez un site Web classique, vous ne remarquerez aucune différence : la grande majorité de vos visiteurs accepteront toujours votre certificat Let's Encrypt. Si vous fournissez une API ou devez prendre en charge des appareils IoT, vous devrez peut-être prêter un peu plus attention à ce changement.

Let's Encrypt a un "[certificat racine][]" appelé [ISRG Root X1][]. Les navigateurs et appareils modernes font confiance au certificat Let's Encrypt installé sur votre site Web car ils incluent ISRG Root X1 dans leur liste de certificats racine. Pour garantir la fiabilité des certificats que nous émettons sur les appareils plus anciens, nous disposons également d'une "signature croisée" d'un certificat racine plus ancien : DST Root CA X3.

Lorsque nous avons commencé, cet ancien certificat racine (DST Root CA X3) nous a permis de décoller et d'obtenir immédiatement la confiance de presque tous les appareils. Le certificat racine le plus récent (ISRG Root X1) est désormais largement reconnu, mais certains appareils plus anciens ne lui feront jamais confiance car ils ne reçoivent pas de mises à jour logicielles (par exemple, un iPhone 4 ou un HTC Dream). [Cliquez ici pour obtenir la liste des plateformes qui font confiance à l'ISRG. Racine X1][compatibility].

DST Root CA X3 expirera le 30 septembre 2021. Cela signifie que les anciens appareils qui ne font pas confiance à ISRG Root X1 commenceront à recevoir des avertissements concernant les certificats lorsqu'ils visiteront des sites utilisant des certificats Let's Encrypt. Il y a une exception importante : les anciens appareils Android qui ne font pas confiance à ISRG Root X1 continueront à fonctionner avec Let's Encrypt, [grâce à une signature croisée spéciale de DST Root CA X3][cross-sign] qui s'étend au-delà de l'expiration de cette racine. Cette exception ne fonctionne que pour Android.

Que dois-je faire ? Pour la plupart des gens, rien du tout ! Nous avons configuré notre émission de certificats de manière à ce que votre site Web fasse ce qu'il faut dans la plupart des cas, en favorisant une large compatibilité. Si vous fournissez une API ou devez prendre en charge des dispositifs IoT, vous devrez vous assurer de deux choses : (1) tous les clients de votre API doivent faire confiance à ISRG Root X1 (et pas seulement à DST Root CA X3), et (2) si les clients de votre API utilisent OpenSSL, [ils doivent utiliser la version 1.1.0 ou ultérieure][openssl]. Dans OpenSSL 1.0.x, une bizarrerie dans la vérification des certificats fait que même les clients qui font confiance à ISRG Root X1 échouent lorsqu'on leur présente la chaîne de certificats compatible avec Android que nous recommandons par défaut.

Si vous voulez des informations supplémentaires sur les changements en cours dans la chaîne de production, [vous pouvez consulter ce fil de discussion dans notre communauté][production].

Si vous avez des questions sur l'expiration prochaine, [vous pouvez poster dans ce fil de discussion sur notre forum.][forum]

[certificat racine]: /docs/glossary/#def-root
[ISRG Root X1]: /certificates/
[cross-sign]: /2020/12/21/extending-android-compatibility.html
[openssl]: https://community.letsencrypt.org/t/openssl-client-compatibility-changes-for-let-s-encrypt-certificates/143816
[forum]: https://community.letsencrypt.org/t/help-thread-for-dst-root-ca-x3-expiration-september-2021/149190
[compatibility]: /docs/cert-compat/
[production]: https://community.letsencrypt.org/t/production-chain-changes/150739

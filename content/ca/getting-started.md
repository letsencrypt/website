---
title: Primers passos
slug: getting-started
top_graphic: 3
date: 2020-02-11
---

Per activar HTTPS al vostre lloc web, necessiteu un certificat (un tipus de fitxer) d'una autoritat de certificació (CA). Let's Encrypt és una CA. Per tal d'obtenir un certificat de Let's Encrypt pel domini del vostre lloc web, cal que demostreu que teniu control d'aquest domini. Amb Let's Encrypt, ho podeu fer mitjançant programari que funciona amb el [protocol ACME](https://tools.ietf.org/html/rfc8555) que normalment s'executarà al vostre servidor.

Per saber quin mètode us anirà millor, caldrà saber si disposeu d'[accés a shell](https://en.wikipedia.org/wiki/Shell_account) (també conegut com a accés SSH) al vostre servidor. Si gestioneu el vostre lloc web a través d'un panell de control com ara [cPanel](https://cpanel.net/), [Plesk](https://www.plesk.com/), o [WordPress](https://wordpress.org/), segurament no disposeu d'accés a un compte shell. Podeu preguntar al vostre proveïdor d'allotjament per estar-ne segurs.

# Amb accés a shell

Recomanem que la gent amb accés a shell utilitzi el client ACME [Certbot](https://certbot.eff.org/ "Certbot"). Pot automatitzar l'emissió i instal·lació de certificats sense deixar el lloc fora de servei. Disposa de mode expert per als qui no volen configuració automàtica. És fàcil d'utilitzar, funciona en molts sistemes operatius i està ben documentat. [Aneu al lloc web de Certbot](https://certbot.eff.org/ "Certbot") per obtenir instruccions adaptades al vostre sistema operatiu i servidor web.

Si [Certbot](https://certbot.eff.org/ "Certbot") no cobreix les vostres necessitats o voleu provar-ne un de diferent, teniu [molts més clients ACME per escollir](/docs/client-options).  Un cop hàgiu triat el client ACME, consulteu-ne la documentació per continuar.

Si esteu fent proves amb diferents clients ACME, utilitzeu el nostre [entorn de proves](/docs/staging-environment) per evitar sobrepassar el [límit de peticions](/docs/rate-limits).

# Sense accés a shell

La millor manera d'utilitzar Let's Encrypt sense accés a shell és utilitzant el suport integrat del vostre proveïdor. Si el vostre proveïdor ofereix suport per Let's Encrypt, ells poden demanar un certificat gratuït en el vostre nom, instal·lar-lo i mantenir-lo actualitzat automàticament. Per alguns proveïdors és activar l'opció a la configuració. Altres demanen i instal·len certificats per tots els clients automàticament.

[Comproveu la nostra llista de proveïdors](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920) per veure si el vostre hi és. Si és així, seguiu la documentació per configurar el vostre certificat Let's Encrypt.

Si el vostre proveïdor no dóna suport a Let's Encrypt, podeu contactar-hi i demanar-los ajuda. Intentem que afegir suport per Let's Encrypt sigui molt senzill, i els proveïdors sovint agraeixen suggeriments dels clients!

Si el vostre no vol integrar Let's Encrypt però permet penjar certificats propis, podeu instal·lar Certbot en el vostre ordinador i utilitzar-lo en [mode manual](https://certbot.eff.org/docs/using.html#manual). En el mode manual, cal penjar un fitxer específic al vostre lloc web per demostrar que en teniu control. Certbot podrà obtenir un certificat que llavors podeu penjar al proveïdor. No recomanem aquesta opció, ja que caldrà dedicar-hi més temps i s'haurà de fer diverses vegades a l'any quan el certificat caduqui. Per la majoria de gent és millor demanar al vostre proveïdor suport per Let's Encrypt, o canviar de proveïdor si no tenen planejat implementar-ho.

# Obtenir ajuda

Si teniu preguntes a l'hora de triar un client ACME, sobre l'ús d'un client concret o sobre qualsevol cosa relacionada amb Let's Encrypt, consulteu els nostres [fòrums de la comunitat](https://community.letsencrypt.org/).

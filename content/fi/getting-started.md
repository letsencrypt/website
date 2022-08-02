---
title: Aloitus
slug: getting-started
top_graphic: 3
date: 2020-02-11
---

Jotta HTTPS voidaan ottaa käyttöön sivustollasi, sinun täytyy saada varmenne (eräänlainen tiedosto) sertifikaatin viranomaiselta (CA). Let's Encrypt on varmenteita myöntävä organisaatio (CA). Jotta voit saada varmenteen verkkosivustosi toimialueelle Let's Encryptistä, sinun on osoitettava toimialueen hallinta. Let's Encryptin avulla teet tämän käyttäen ohjelmistoa, joka käyttää [ACME-protokollaa](https://tools.ietf.org/html/rfc8555), joka toimii tavallisesti verkkoisännässäsi.

Selvittääksesi, mikä menetelmä sopii sinulle parhaiten, sinun on tiedettävä, onko sinulla [shell-käyttöoikeus](https://en.wikipedia.org/wiki/Shell_account) (tunnetaan myös nimellä SSH pääsy) verkkoisäntällesi. Jos hallinnoit sivustoasi kokonaan ohjauspaneelin kautta, kuten [cPanel](https://cpanel.net/), [Plesk](https://www.plesk.com/), tai [WordPress](https://wordpress.org/), sinulla ei todennäköisesti ole pääsyä Shelliin. Voit kysyä isännöintipalveluntarjoajaltasi ollaksesi varma.

# Shell-komentotulkin käyttöoikeudella

Suosittelemme, että useimmat ihmiset, joilla on shell-käyttöoikeus, käyttävät [Certbot](https://certbot.eff.org/ "Certbot") ACME -asiakasohjelmaa. Se voi automatisoida varmenteen myöntämisen ja asennuksen ilman seisokkeja. Siinä on myös asiantuntija-tilat ihmisille, jotka eivät halua automaattista konfigurointia. Se on helppokäyttöinen, toimii monissa käyttöjärjestelmissä, ja sillä on hyvä dokumentaatio. [Vieraile Certbotin sivustolla](https://certbot.eff.org/ "Certbot") saadaksesi räätälöityjä ohjeita käyttöjärjestelmällesi ja verkkopalvelimellesi.

Jos [Certbot](https://certbot.eff.org/ "Certbot") ei vastaa tarpeitasi tai haluat kokeilla jotain muuta, on [monta muuta ACME-asiakasta valittavaksi](/docs/client-options).  Kun olet valinnut ACME-asiakasohjelman, katso dokumentaatio, jonka avulla asiakas voi edetä.

Jos kokeilet eri ACME-asiakkaita, käytä [vaiheistusympäristöämme](/docs/staging-environment) välttääksesi osumasta [siirtonopeuden rajoihin](/docs/rate-limits).

# Ilman Shell-komentotulkin käyttöoikeutta

Paras tapa käyttää Let's Encrypt ilman Shell-komentotulkkia on käyttää sisäänrakennettua tukea isännöintitarjoajalta. Jos isännöintitarjoajaltasi saa Let's Encrypt -tuki, se voi pyytää ilmaisen varmenteen puolestasi, asenna se ja pitää sen ajan tasalla automaattisesti. Joillekin isännöintitarjoajille, tämä on konfiguraatioasetus, joka sinun täytyy ottaa käyttöön. Muut palveluntarjoajat pyytävät ja asentavat automaattisesti varmenteet kaikille asiakkailleen.

[Tarkista isännöintipalveluntarjoajien luettelomme](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920) nähdäksesi, onko omasi siinä. Jos näin on, noudata heidän ohjeidensa Let's Encrypt -varmenteen määrittämiseksi.

Jos isännöintitarjoajasi ei tue Let's Encryptia, voit ottaa heihin yhteyttä ja pyytää tukea. Teemme parhaamme, jotta Let's Encrypt -tuen lisääminen olisi hyvin helppoa, ja tarjoajat ovat usein iloisia kuullessaan asiakkaiden ehdotuksia!

Jos isännöintitarjoajasi ei halua integroida Let's Encryptiä, mutta tukee mukautettujen varmenteiden lataamista, voit asentaa Certbotin omalle tietokoneellesi ja käyttää sitä [manuaalisessa tilassa](https://certbot.eff.org/docs/using .html#manual). Manuaalisessa tilassa lataat ulospäin tietyn tiedoston verkkosivustollesi todistaaksesi hallintasi. Certbot hakee sitten varmenteen, jonka voit ladata ulospäin isännöintitarjoajaasi. Emme suosittele tätä vaihtoehtoa, koska se on aikaa vievä ja sinun on toistettava se useita kertoja vuodessa varmenteesi vanhentuessa. Useimmille ihmisille on parempi pyytää Let's Encrypt -tukea isännöintitarjoajaltasi tai vaihtaa palveluntarjoajaa, jos he eivät aio ottaa sitä käyttöön.

# Avun saaminen

Jos sinulla on kysyttävää ACME-asiakkaan valinnasta tai tietyn asiakkaan käyttämisestä, tai jotain muuta liittyen Let's Encryptiin, kokeile [hyödyllisiä yhteisöfoorumeita](https://community.letsencrypt.org/).

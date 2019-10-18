---
title: Lanac poverenja
linkTitle: Chain of Trust (Root and Intermediate Certificates)
slug: certificates
top_graphic: 5
lastmod: 2019-05-01
---

# Root Sertifikati

Naši root sertifikati se čuvaju na sigurnom "offline" mestu. Mi izdajemo sertifikate našim pretplatnicima preko posrednika iz naredne sekcije.

* Aktivni
  * [ISRG Root X1 (self-signed)](/certs/isrgrootx1.pem.txt)

Postavili smo web sajtove za testiranje sertifikata koji se vezuju za naše root sertifikate.

* ISRG Root X1 Valid Certificate
  * [https://valid-isrgrootx1.letsencrypt.org/](https://valid-isrgrootx1.letsencrypt.org/)
* ISRG Root X1 Revoked Certificate
  * [https://revoked-isrgrootx1.letsencrypt.org/](https://revoked-isrgrootx1.letsencrypt.org/)
* ISRG Root X1 Expired Certificate
  * [https://expired-isrgrootx1.letsencrypt.org/](https://expired-isrgrootx1.letsencrypt.org/)

# Posrednički Sertifikati

IdenTrust je potpisnik naših intermedijara. To nam omogućava prihvatanje naših krajnjih sertifikata od strane svih glavnih pretraživača.

U normalnim okolnostima, sertifikati izdati od strane Let’s Encrypt potiču iz „Let’s Encrypt Authority X3”. Drugi međupredmet, „Let’s Encrypt Authority X4“, rezervisan je za oporavak od katastrofe i koristiće se samo ako izgubimo mogućnost izdavanja sa „Let’s Encrypt Authority X3“. Međuprodukti X1 i X2 bili su naša prva generacija intermedijara. Zamenili smo ih novim intermedijarima koji su kompatibilniji sa Windows XP-om.

* Aktivni
  * [Let's Encrypt Authority X3 (IdenTrust cross-signed)](/certs/lets-encrypt-x3-cross-signed.pem.txt)
    * [Let's Encrypt Authority X3 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx3.pem.txt)
* Backup
  * [Let's Encrypt Authority X4 (IdenTrust cross-signed)](/certs/lets-encrypt-x4-cross-signed.pem.txt)
    * [Let's Encrypt Authority X4 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx4.pem.txt)
* Izbačeni iz upotrebe
  * [Let's Encrypt Authority X2 (IdenTrust cross-signed)](/certs/lets-encrypt-x2-cross-signed.pem.txt)
    * [Let's Encrypt Authority X2 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx2.pem.txt)
  * [Let's Encrypt Authority X1 (IdenTrust cross-signed)](/certs/lets-encrypt-x1-cross-signed.pem.txt)
    * [Let's Encrypt Authority X1 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx1.pem.txt)

# Unakrsno potpisivanje

Naš intermedijar „Let’s Encrypt Authority X3“ predstavlja jedinstven javni / privatni
par ključeva. Privatni ključ tog para generiše potpis za sve krajnje entitetske
sertifikate (poznati i kao listovi sertifikata), tj. sertifikati koje izdajemo
za upotrebu na vašim serverima.

Naš posrednik potpisuje ISRG Root X1. Međutim, s obzirom da smo vrlo mlado
sertifikaciono telo, ISRG Root X1 još uvek nije priznat u većini pretraživača.
Da bismo odmah dobili poverenje, naš intermedijar takođe je unakrsno potpisan
od strane još jednog sertifikacionog tela, IdenTrust, čiji je root već priznat u svim
glavnim pretraživačima. Konkretno, IdenTrust je potpisao naš intermedijar koristeći njihov
"DST Root CA X3" (sada se zove "TrustID X3 Root"). [Preuzmite "TrustID X3 Root" na identrust.com] (https://www.identrust.com/support/downloads) (ili, alternativno, kopiju možete preuzeti ovde: [.pem] (/ certs / trustid-x3 -root.pem.txt), [.p7b] (/ certs / trustid-x3-root.p7b)).

To znači da su na raspolaganju dva sertifikata gde oba predstavljaju naš
intermedijar. Jednog potpisuje DST Root CA X3, a drugog potpisuje ISRG
Root X1. Najjednostavniji način za razlikovanje je gledanje u informaciju o 
njihovom izdavaču.

Prilikom konfigurisanja web servera, administrator servera konfiguriše ne samo
sertifikat krajnjeg entiteta, ali i popis intermedijara koji će pomoći pretraživačima da provere
da sertifikat krajnjeg entiteta ima lanac poverenja koji vodi do pouzdanog root-a.
Gotovo svi administratori servera će izabrati da opslužuju lanac uključujući
posredni sertifikat s naslovom „Let’s Encrypt Authority X3“ i
Izdavač “DST Root CA X3.” Preporučeni Let's Encrypt softver,
[Certbot] (https://certbot.org), ovu konfiguraciju će nesmetano izvršiti.

Sledeća slika objašnjava odnose između naših sertifikata vizuelno:

<img src="/certs/isrg-keys.png" alt="ISRG Key relationship diagram">

# OCSP Signing Sertifikat

Ovaj sertifikat koristi se za potpisivanje OCSP odgovora za Let's Encrypt
intermedijara, tako da ne moramo postavljati root ključ na mrežu kako bi smo
potpisali te odgovore. Kopija ovog sertifikata automatski se uključuje u
OCSP odgovore, tako da pretplatnici ne moraju ništa učiniti. Iz tog razloga, to
ovde navedimo samo u informativne svrhe.

* [ISRG Root OCSP X1 (Potpisan od strane ISRG Root X1)](/certs/isrg-root-ocsp-x1.pem.txt)

# Transparentnost sertifikata

Posvećeni smo transparentnosti u svom poslovanju i u sertifikatima koje izdajemo. 
Sve potvrde šaljemo u [Log o Transparentnosti sertifikata] (https://www.certificate-transparency.org/) 
dok ih izdajemo. Možete pregledati sve izdate sertifikate na sledećim linkovima:

* [Izdati od strane Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Izdati od strane Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)

# Više informacija

Privatni ključevi za ISRG root CA i intermedijarni podaci Let’s Encrypt čuvaju se na hardverskim sigurnosnim modulima (HSM), koji pružaju visok stepen zaštite od krađe ključeva.

Svi ISRG ključevi trenutno su RSA ključevi. U budućnosti [planiramo generisati ECDSA ključeve] ({{<ref "/upcoming-features.md">}}).
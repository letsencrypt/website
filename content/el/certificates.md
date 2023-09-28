---
title: Αλυσίδα της Εμπιστοσύνης
linkTitle: Αλυσίδα εμπιστοσύνης (Πιστοποιητικά Root και Intermediate)
slug: certificates
top_graphic: 5
lastmod: 2021-10-02
show_lastmod: 1
---


[![ISRG Certificate Hierarchy Diagram, as of December 2020](/images/isrg-hierarchy.png)](/images/isrg-hierarchy.png)

# Πιστοποιητικό Ca Root

Οι ρίζες μας διατηρούνται με ασφάλεια εκτός σύνδεσης. Εκδίδουμε πιστοποιητικά τελικής οντότητας στους συνδρομητές από τους διαμεσολαβητές στην επόμενη ενότητα. Για πρόσθετη συμβατότητα όπως υποβάλλουμε νέο Root X2 μας σε διάφορα προγράμματα ρίζας, έχουμε επίσης cross-signed από Root X1.

* Ενεργό
  * ISRG Root X1 (`RSA 4096, O = Internet Security Research Group, CN = ISRG Root X1`)
    * [Αυτο-υπογεγραμμένη](https://crt.sh/?id=9314791): [der](/certs/isrgrootx1.der), [pem](/certs/isrgrootx1.pem), [txt](/certs/isrgrootx1.txt)
    * [Cross-signed by DST Root CA X3](https://crt.sh/?id=3958242236): [der](/certs/isrg-root-x1-cross-signed.der), [pem](/certs/isrg-root-x1-cross-signed.pem), [txt](/certs/isrg-root-x1-cross-signed.txt)
* Ενεργή, περιορισμένη διαθεσιμότητα
  * ISRG Root X2 (`ECDSA P-384, O = Internet Security Research Group, CN = ISRG Root X2`)
    * [Αυτο-υπογεγραμμένη](https://crt.sh/?id=3335562555): [der](/certs/isrg-root-x2.der), [pem](/certs/isrg-root-x2.pem), [txt](/certs/isrg-root-x2.txt)
    * [Cross-signed by DST Root CA X3](https://crt.sh/?id=3334561878): [der](/certs/isrg-root-x2-cross-signed.der), [pem](/certs/isrg-root-x2-cross-signed.pem), [txt](/certs/isrg-root-x2-cross-signed.txt)

Έχουμε δημιουργήσει ιστότοπους για να δοκιμάσουμε τα πιστοποιητικά αλυσοπρίονο στις ενεργές ρίζες μας.

* ISRG Root X1
  * [Έγκυρο](https://valid-isrgrootx1.letsencrypt.org/)
  * [Ανάκληση](https://revoked-isrgrootx1.letsencrypt.org/)
  * [Ληγμένο](https://expired-isrgrootx1.letsencrypt.org/)
* ISRG Root X1
  * [Έγκυρο](https://valid-isrgrootx2.letsencrypt.org/)
  * [Ανάκληση](https://revoked-isrgrootx2.letsencrypt.org/)
  * [Ληγμένο](https://expired-isrgrootx2.letsencrypt.org/)

# Ενδιάμεσα Πιστοποιητικά

Υπό κανονικές συνθήκες, τα πιστοποιητικά που εκδίδονται από το Let's Encrypt θα προέρχονται από το "R3", έναν διαμεσολαβητή RSA. Επί του παρόντος, η έκδοση από το "E1", ένας ενδιάμεσος ECDSA, είναι δυνατή μόνο για τα κλειδιά συνδρομητών ECDSA για [επιτρεπόμενους λογαριασμούς](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679). Στο μέλλον, η έκδοση από το "E1" θα είναι διαθέσιμη για όλους.

Οι άλλοι μεσάζοντες μας ("R4" και "E2") προορίζονται για την αποκατάσταση καταστροφών και θα χρησιμοποιηθούν μόνο σε περίπτωση που χάσουμε την ικανότητα να συζητήσουμε με τους κύριους μεσάζοντές μας. Δεν χρησιμοποιούμε πλέον τα ενδιάμεσα προϊόντα X1, X2, X3 και X4.

Η IdenTrust έχει υπογράψει τους διαμεσολαβητές μας RSA για πρόσθετη συμβατότητα.

* Ενεργό
  * Let's Encrypt R3 (`RSA 2048, O = Let's Encrypt, CN = R3`)
    * [Cross-signed by DST Root CA X3](https://crt.sh/?id=3334561879): [der](/certs/lets-encrypt-r3.der), [pem](/certs/lets-encrypt-r3.pem), [txt](/certs/lets-encrypt-r3.txt)
    * [Cross-signed by Dst Root Ca X3](https://crt.sh/?id=3479778542): [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt))
* Ενεργή, περιορισμένη διαθεσιμότητα
  * Let's Encrypt E1 (`ECDSA P-384, O = Let's Encrypt, CN = E1`)
    * [Cross-signed by DST Root CA X3](https://crt.sh/?id=3334671964): [der](/certs/lets-encrypt-e1.der), [pem](/certs/lets-encrypt-e1.pem), [txt](/certs/lets-encrypt-e1.txt)
* Αντίγραφο Ασφαλείας
  * Let's Encrypt R4 (`RSA 2048, O = Let's Encrypt, CN = R4`)
    * [Cross-signed by DST Root CA X3](https://crt.sh/?id=3334561877): [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
    * [Cross-signed by Dst Root Ca X3](https://crt.sh/?id=3479778543): [der](/certs/lets-encrypt-r4-cross-signed.der), [pem](/certs/lets-encrypt-r4-cross-signed.pem), [txt](/certs/lets-encrypt-r4-cross-signed.txt))
  * Let's Encrypt E2 (`ECDSA P-384, O = Let's Encrypt, CN = E2`)
    * [Cross-signed by DST Root CA X3](https://crt.sh/?id=3334671963): [der](/certs/lets-encrypt-e2.der), [pem](/certs/lets-encrypt-e2.pem), [txt](/certs/lets-encrypt-e2.txt)
* Έχει Αποσυρθεί
  * Let's Encrypt Authority X1 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X1`)
    * [Cross-signed by DST Root CA X3](https://crt.sh/?id=9314792): [der](/certs/letsencryptauthorityx1.der), [pem](/certs/letsencryptauthorityx1.pem), [txt](/certs/letsencryptauthorityx1.txt)
    * [Cross-signed by Dst Root Ca X3](https://crt.sh/?id=10235198): [der](/certs/lets-encrypt-x1-cross-signed.der), [pem](/certs/lets-encrypt-x1-cross-signed.pem), [txt](/certs/lets-encrypt-x1-cross-signed.txt)
  * Let's Encrypt Authority X2 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X2`)
    * [Cross-signed by DST Root CA X3](https://crt.sh/?id=12721505): [der](/certs/letsencryptauthorityx2.der), [pem](/certs/letsencryptauthorityx2.pem), [txt](/certs/letsencryptauthorityx2.txt)
    * [Cross-signed by Dst Root Ca X3](https://crt.sh/?id=10970235): [der](/certs/lets-encrypt-x2-cross-signed.der), [pem](/certs/lets-encrypt-x2-cross-signed.pem), [txt](/certs/lets-encrypt-x2-cross-signed.txt)
  * Let's Encrypt Authority X3 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X3`)
    * [Cross-signed by DST Root CA X3](https://crt.sh/?id=47997543): [der](/certs/letsencryptauthorityx3.der), [pem](/certs/letsencryptauthorityx3.pem), [txt](/certs/letsencryptauthorityx3.txt)
    * [Cross-signed by Dst Root Ca X3](https://crt.sh/?id=15706126): [der](/certs/lets-encrypt-x3-cross-signed.der), [pem](/certs/lets-encrypt-x3-cross-signed.pem), [txt](/certs/lets-encrypt-x3-cross-signed.txt)
  * Let's Encrypt Authority X4 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X4`)
    * [Cross-signed by DST Root CA X3](https://crt.sh/?id=47997546): [der](/certs/letsencryptauthorityx4.der), [pem](/certs/letsencryptauthorityx4.pem), [txt](/certs/letsencryptauthorityx4.txt)
    * [Cross-signed by Dst Root Ca X3](https://crt.sh/?id=15710291): [der](/certs/lets-encrypt-x4-cross-signed.der), [pem](/certs/lets-encrypt-x4-cross-signed.pem), [txt](/certs/lets-encrypt-x4-cross-signed.txt)

# Διασταυρούμενη Υπογραφή

## Ενδιάμεση

Καθένας από τους μεσάζοντες μας αντιπροσωπεύει ένα ενιαίο ζεύγος κλειδιών δημόσιου και ιδιωτικού. Το ιδιωτικό κλειδί αυτού του ζεύγους δημιουργεί την υπογραφή για όλα τα πιστοποιητικά οντότητας (γνωστά και ως πιστοποιητικά φύλλων), i.. τα πιστοποιητικά που εκδίδουμε για χρήση στον διακομιστή σας.

Οι διαμεσολαβητές μας RSA υπογράφονται από ISRG Root X1. ISRG Root X1 είναι ευρέως αξιόπιστη σε αυτό το σημείο, αλλά οι διαμεσολαβητές μας RSA εξακολουθούν να υπογράφονται από το IdenTrust's "[DST Root CA X3](https://crt.sh/?id=8395)" (τώρα ονομάζεται "TrustID X3 Root") για πρόσθετη συμβατότητα πελάτη. Η ρίζα IdenTrust έχει περάσει πλέον και έτσι έχει καλύτερη συμβατότητα με παλαιότερες συσκευές και λειτουργικά συστήματα (π.χ. Windows XP, Android 7). Μπορείτε να [κατεβάσετε το "TrustID X3 Root" από το IdenTrust](https://www.identrust.com/support/downloads) (ή, εναλλακτικά, μπορείτε [να κατεβάσετε ένα αντίγραφο από εμάς](/certs/trustid-x3-root.pem.txt)).

Έχοντας διασταυρούμενες υπογραφές σημαίνει ότι κάθε ένας από τους διαμεσολαβητές μας RSA έχει δύο πιστοποιητικά που αντιπροσωπεύουν το ίδιο κλειδί υπογραφής. Το ένα υπογράφεται από DST Root CA X3 και το άλλο υπογράφεται από ISRG Root X1. Ο ευκολότερος τρόπος για να διακρίνουμε τα δύο είναι κοιτάζοντας το πεδίο Εκδότη τους.

Κατά τη ρύθμιση παραμέτρων ενός διακομιστή ιστού, ο πάροχος του διακομιστή ρυθμίζει όχι μόνο το πιστοποιητικό οντότητας τέλους, αλλά και μια λίστα ενδιάμεσων που θα βοηθήσουν τους περιηγητές να επαληθεύσουν ότι το πιστοποιητικό οντότητας έχει μια αλυσίδα εμπιστοσύνης που οδηγεί σε ένα αξιόπιστο πιστοποιητικό ρίζας. Σχεδόν όλοι οι φορείς εκμετάλλευσης διακομιστών θα επιλέξουν να εξυπηρετήσουν μια αλυσίδα που περιλαμβάνει το ενδιάμεσο πιστοποιητικό με θέμα "R3" και Εκδότη "ISRG Root X1". Το προτεινόμενο λογισμικό Let's Encrypt client, [Certbot](https://certbot.org), θα κάνει αυτήν τη ρύθμιση απρόσκοπτα.

## Roots
Παρόμοια με τους μεσάζοντες, τα πιστοποιητικά ρίζας μπορούν να υπογράψουν, συχνά για να αυξηθεί η υπολογιστικότητα του πελάτη. Η ρίζα ECDSA μας, ISRG Root X2 δημιουργήθηκε το φθινόπωρο του 2020 και είναι το πιστοποιητικό ρίζας για την ιεραρχία ECDSA. Αντιπροσωπεύεται από δύο πιστοποιητικά: ένα που είναι αυτο-υπογεγραμμένο και ένα που υπογράφεται από ISRG Root X1.

Όλα τα πιστοποιητικά υπογεγραμμένα από το ενδιάμεσο ECDSA "E1" θα έρχονται με μια αλυσίδα που περιλαμβάνει ένα ενδιάμεσο πιστοποιητικό του οποίου το θέμα είναι "ISRG Root X2" και του οποίου ο εκδότης είναι "ISRG Root X1". Σχεδόν όλοι οι φορείς εκμετάλλευσης διακομιστών θα επιλέξουν να εξυπηρετήσουν αυτή την αλυσίδα καθώς προσφέρει την πιο compatability έως ότου το ISRG Root X2 είναι ευρέως αξιόπιστο.

# Πιστοποιητικό Υπογραφής OCSP

Το παρόν πιστοποιητικό χρησιμοποιείται για την υπογραφή απαντήσεων OCSP για τους ενδιάμεσους φορείς του Let's Encrypt Authority, ώστε να μην χρειαστεί να φέρουμε το βασικό κλειδί online για να υπογράψουμε αυτές τις απαντήσεις. Ένα αντίγραφο αυτού του πιστοποιητικού περιλαμβάνεται αυτόματα σε αυτές τις απαντήσεις OCSP, έτσι ώστε οι συνδρομητές δεν χρειάζεται να κάνουν τίποτα με αυτό. Περιλαμβάνεται εδώ μόνο για ενημερωτικούς σκοπούς.

* [Cross-signed by DST Root CA X3](https://crt.sh/?id=2929281974): [der](/certs/isrg-root-ocsp-x1.der), [pem](/certs/isrg-root-ocsp-x1.pem), [txt](/certs/isrg-root-ocsp-x1.txt)

Οι νεότεροι μεσάζοντες μας δεν έχουν διευθύνσεις URL OCSP (οι πληροφορίες ανάκλησής τους είναι αντί να εξυπηρετούνται μέσω CRL), so we have not issued an OCSP Signing Cert from ISRG Root X2.

# Certificate Transparency

Είμαστε αφοσιωμένοι στη διαφάνεια των λειτουργιών μας και στα πιστοποιητικά που εκδίδουμε. Υποβάλλουμε όλα τα πιστοποιητικά στην [Διαφάνεια Πιστοποιητικού καταγράφει](https://www.certificate-transparency.org/) καθώς τα εκδίδουμε. Μπορείτε να δείτε όλα τα εκδοθέντα Let's Encrypt certificates μέσω αυτών των συνδέσμων:

* [Εκδόθηκε από Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Εκδόθηκε από Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)
* [Παραχωρήθηκε από Ε1](https://crt.sh/?Identity=%25&iCAID=183283)
* [Παραχωρήθηκε από R3](https://crt.sh/?Identity=%25&iCAID=183267)

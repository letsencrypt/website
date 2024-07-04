---
title: lencr.org
slug: lencr.org
date: 2020-12-04
lastmod: 2020-12-04
show_lastmod: 1
---


# Τι είναι το lencr.org;

`lencr.org` είναι ένας τομέας που ανήκει στο Let's Encrypt. Το χρησιμοποιούμε για να φιλοξενήσουμε OCSP, CRL, και πιστοποιητικά εκδότη: όλες τις διευθύνσεις URL που εμφανίζονται στα πιστοποιητικά.

Χρησιμοποιήσαμε για χρήση μακρύτερων URL όπως `http://ocsp.int-x3.letsencrypt.org/`. Ωστόσο, όταν εκδίδουμε [νέα πιστοποιητικά ρίζας και ενδιάμεσων πιστοποιητικών][1], θέλαμε να τα κάνουμε όσο το δυνατόν μικρότερα. Κάθε σύνδεση HTTPS στο διαδίκτυο (δισεκατομμύρια ανά ημέρα) πρέπει να στείλει ένα αντίγραφο ενός πιστοποιητικού, έτσι ώστε κάθε byte έχει σημασία. Επιλέξαμε `lencr.org` λόγω της ομοιότητάς του με το όνομά μας: **L**et's **ENCR**ypt. We pronounce it much like the fictional region of [Lancre][] in Terry Pratchett's _Discworld_ novels.

[1]: https://letsencrypt.org/2020/09/17/new-root-and-intermediates.html
[Lancre]: https://discworld.fandom.com/wiki/Lancre

---
शीर्षक: ट्रस्ट की श्रृंखला
linkTitle: चैन ऑफ ट्रस्ट (रूट और इंटरमीडिएट प्रमाण पत्र)
स्लग: प्रमाण पत्र
top_graphic: 5
अंतिम बार: 2020-09-07
---

{{<lastmod>}}

[! [ISRG सर्टिफिकेट पदानुक्रम आरेख, सितंबर 2020 तक] (/ certs / isrg-hierarchy-2020.png)] (/ certs / isrg-hierarchy-2020.png)

# रूट प्रमाण पत्र

हमारी जड़ें सुरक्षित रूप से ऑफ़लाइन रखी गई हैं। हम अगले खंड में इंटरमीडिएट के ग्राहकों को अंतिम-इकाई प्रमाण पत्र जारी करते हैं।
अतिरिक्त संगतता के लिए जैसा कि हम अपने नए रूट X2 को विभिन्न रूट प्रोग्राम में सबमिट करते हैं, हमने रूट एक्स 1 से इसे क्रॉस-साइन भी किया है।

* सक्रिय
  * ISRG रूट X1 (`RSA 4096, O = इंटरनेट सुरक्षा अनुसंधान समूह, CN = ISRG रूट X1`)
    * स्व-हस्ताक्षरित: [der] (/ certs / isrgrootx1.der), [pem] (/ certs / isrgrootx1.pem), [txt] (/ certs / isrgrootx1.txt)
* आगामी
  * ISRG रूट X2 (`ECDSA P-384, O = इंटरनेट सुरक्षा अनुसंधान समूह, CN = ISRG रूट X2`)
    * स्व-हस्ताक्षरित: [der] (/ certs / isrg-root-x2.der), [pem] (/ certs / isrg-root-x2.pem), [txt] (/ certs / .rg-root-x2)। टेक्स्ट)
    * ISRG रूट X1 द्वारा क्रॉस-हस्ताक्षरित: [der] (/ certs / isrg-root-x2-cross-sign.der), [pem] (/ certs / isrg-root-x2-cross-sign.pem), [] txt] (/ प्रमाणपत्र / isrg-रूट x2-पार signed.txt)

हमने अपनी सक्रिय जड़ों के लिए प्रमाणपत्रों का परीक्षण करने के लिए वेबसाइटें स्थापित की हैं।

* ISRG रूट X1
  * [मान्य] (https://valid-isrgrootx1.letsencrypt.org/)
  * [निरस्त] (https://revoked-isrgrootx1.letsencrypt.org/)
  * [एक्सपायर्ड] (https://expired-isrgrootx1.letsencrypt.org/)

# इंटरमीडिएट प्रमाण पत्र

सामान्य परिस्थितियों में, लेट्स एनक्रिप्ट द्वारा जारी किए गए सर्टिफिकेट "आरएस एनक्रिप्ट अथॉरिटी एक्स 3" या "आर 3" दोनों आरएसए इंटरमीडिएट से आएंगे।
हमने एक नया ईसीडीएसए इंटरमीडिएट ("ई 1") भी जारी किया है, जिसे हम जल्द ही जारी करना शुरू करेंगे। यह पृष्ठ अपडेट किया जाएगा जब वह काम पूरा हो जाएगा।

हमारे अन्य मध्यवर्ती ("चलो एनक्रिप्ट अथॉरिटी एक्स 4", "ई 2", और "आर 4") आपदा वसूली के लिए आरक्षित हैं और इसका उपयोग केवल हमारे प्राथमिक मध्यवर्ती के साथ जारी करने की क्षमता खोना चाहिए।
हम अब X1 और X2 इंटरमीडिएट का उपयोग नहीं करते हैं।

IdenTrust ने अतिरिक्त संगतता के लिए हमारे RSA मध्यवर्ती को क्रॉस-साइन किया है।

* सक्रिय
  * आइए, एन 3 को एनक्रिप्ट करें (`आरएसए 2048, ओ = आइए एनक्रिप्ट करें, सीएन = आइए एनक्रिप्ट अथॉरिटी एक्स 3 ए)
    * ISRG रूट X1 द्वारा हस्ताक्षरित: [der] (/ certs / letencryptauthorityx3.der), [pem] (/ certs / letencryptauthorityx3.pem), [txt] (/ certs / letencryptauthorityx3.txt)
    * IdenTrust द्वारा क्रॉस-साइन इन करें: [der] (/ certs / let-एन्क्रिप्ट-x3-cross-sign.der), [pem] (/ certs / let-एन्क्रिप्ट-x3-cross-sign.pem), [txt] (/certs/lets-encrypt-x3-cross-signed.txt)
  * आर 3 को एनक्रिप्ट करें (`आरएसए 2048, ओ = आइए एनक्रिप्ट करें, सीएन = आर 3`)
    * ISRG रूट X1 द्वारा हस्ताक्षरित: [der] (/ certs / let-एन्क्रिप्ट-r3.der), [pem] (/ certs / let-एन्क्रिप्ट-r3.pem), [txt] (/ certs / let-एन्क्रिप्ट-) r3.txt)
    * IdenTrust द्वारा क्रॉस-हस्ताक्षरित: जल्द ही आ रहा है
* आगामी
  * आइए एन्क्रिप्ट करें E1 (`ECDSA P-384, O = आइए एन्क्रिप्ट करें, CN = E1`)
    * ISRG रूट X2 द्वारा हस्ताक्षरित: [der] (/ certs / let-एन्क्रिप्ट-e1.der), [pem] (/ certs / let-एन्क्रिप्ट-e1.pem), [txt] (/ certs / let-एन्क्रिप्ट-) e1.txt)
* बैकअप
  * आइए, प्राधिकरण X4 को एनक्रिप्ट करें (`RSA 2048, O = आइए एनक्रिप्ट करें, CN = लेट्स एनक्रिप्ट अथॉरिटी X4`)
    * ISRG रूट X1 द्वारा हस्ताक्षरित: [der] (/ certs / letencryptauthorityx4.der), [pem] (/ certs / letencryptauthorityx4.pem), [txt] (/ certs / letencryptauthorityx4.txt)
    * IdenTrust द्वारा क्रॉस-हस्ताक्षरित: [der] (/ certs / let-एन्क्रिप्ट-x4-cross-sign.der), [pem] (/ certs / let-एन्क्रिप्ट-x4-cross-sign.pem), [txt] (/certs/lets-encrypt-x4-cross-signed.txt)
  * आर 4 को एन्क्रिप्ट करें (`आरएसए 2048, ओ = आइए एनक्रिप्ट करें, सीएन = आर 4`)
    * ISRG रूट X1 द्वारा हस्ताक्षरित: [der] (/ certs / let-एन्क्रिप्ट-r4.der), [pem] (/ certs / let-एन्क्रिप्ट-r4.pem), [txt] (/ certs / let-एन्क्रिप्ट-) r4.txt)
    * IdenTrust द्वारा क्रॉस-हस्ताक्षरित: जल्द ही आ रहा है
  * आइए एनक्रिप्ट करें E2 (`ECDSA P-384, O = आइए एनक्रिप्ट करें, CN = E2`)
    * ISRG रूट X2 द्वारा हस्ताक्षरित: [der] (/ certs / let-एन्क्रिप्ट-e2.der), [pem] (/ certs / let-एन्क्रिप्ट-e2.pem), [txt] (/ certs / let-एन्क्रिप्ट-) e2.txt)
* अवकाश प्राप्त
  * आइए एनक्रिप्ट अथॉरिटी एक्स 1 (`आरएसए 2048, ओ = आइए एनक्रिप्ट करें, सीएन = आइए एनक्रिप्ट अथॉरिटी एक्स 1)
    * ISRG रूट X1 द्वारा हस्ताक्षरित: [der] (/ certs / letencryptauthorityx1.der), [pem] (/ certs / letencryptauthorityx1.pem), [txt] (/ certs / letencryptauthorityx1.txt)
    * IdenTrust द्वारा क्रॉस-हस्ताक्षरित: [der] (/ certs / let-एन्क्रिप्ट-X1-क्रॉस-हस्ताक्षर-धारक), [pem] (/ certs / let-एन्क्रिप्ट-X1-क्रॉस-हस्ताक्षर किए.पेम), [txt (/certs/lets-encrypt-x1-cross-signed.txt)
  * आइए, प्राधिकरण X2 को एनक्रिप्ट करें (`RSA 2048, O = आइए एनक्रिप्ट करें, CN = लेट एनक्रिप्ट अथॉरिटी X2`)
    * ISRG रूट X1 द्वारा हस्ताक्षरित: [der] (/ certs / letencryptauthorityx2.der), [pem] (/ certs / letencryptauthorityx2.pem), [txt] / / certs / letencryptauthorityx2.txt)
    * IdenTrust द्वारा क्रॉस-हस्ताक्षरित: [der] (/ certs / let-एन्क्रिप्ट-x2-cross-sign.der), [pem] (/ certs / let-एन्क्रिप्ट-x2-cross-sign.pem), [txt] (/certs/lets-encrypt-x2-cross-signed.txt)

# क्रॉस साइनिंग

हमारे प्रत्येक मध्यवर्ती एक ही सार्वजनिक / निजी का प्रतिनिधित्व करते हैं
कुंजी जोड़ी। उस जोड़ी की निजी कुंजी सभी अंत-इकाई के लिए हस्ताक्षर उत्पन्न करती है
सर्टिफिकेट (जिसे लीफ सर्टिफिकेट के नाम से भी जाना जाता है), यानी जो सर्टिफिकेट हम जारी करते हैं
अपने सर्वर पर उपयोग के लिए।

हमारे RSA मध्यवर्ती IS द्वारा हस्ताक्षरित हैं


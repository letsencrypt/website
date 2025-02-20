---
author: Josh Aas
date: 2025-02-20T00:00:00Z
slug: first-short-lived-cert-issued
title: "We Issued Our First Six Day Cert"
excerpt: "Hitting a milestone on our path toward optional shorter-lived certs."
display_default_footer: true
display_newsletter_embed: false
---

Earlier this year we [announced](https://letsencrypt.org/2025/01/16/6-day-and-ip-certs/) our intention to introduce short-lived certificates with lifetimes of six days as an option for our subscribers. Yesterday we issued our first short-lived certificate. You can see the certificate at the bottom of our post, or [here](https://search.censys.io/certificates/8265479af7bb04b347260a54db915fb294ebaacd79cdb43d86d27336b690ad26) thanks to Certificate Transparency logs. We issued it to ourselves and then immediately revoked it so we can observe the certificate's whole lifecycle. This is the first step towards making shorter-lived certificates available to all subscribers.

The next step is for us to make short-lived certificates available to a small set of our subscribers so we can make sure our systems scale as expected prior to general availability. We expect this next phase to begin during Q2 of this year.

We expect short-lived certificates to be generally available by the end of this year.

## How To Get Six-Day Certificates

Once short-lived certificates are an option for you, you'll need to use an ACME client that supports ACME [certificate profiles](https://letsencrypt.org/docs/profiles/) and select the short-lived certificate profile ("shortlived"). The `lego` client recently [added](https://github.com/go-acme/lego/releases/tag/v4.22.0) this functionality.

In the meantime, the best way to prepare to take advantage of short-lived certificates is to make sure your ACME client is reliably renewing certificates in an automated fashion. If that's working well then there should be no costs to switching to short-lived certificates.

You'll also want to be sure your ACME client is running frequently - both for the sake of renewing short-lived certificates and so as to take advantage of [ACME Renewal Information (ARI)](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari/). ARI allows Let's Encrypt to notify your client if it should renew early for some reason. ARI checks should happen at least once per day, and short-lived certificates should be renewed every two to three days, so we recommend having your client run at least once per day.

## Shorter Certificate Lifetimes Are Good for Security

When the private key associated with a certificate is compromised, the recommendation has always been to have the certificate revoked so that people will know not to use it. Unfortunately, certificate revocation doesn't work very well. This means that certificates with compromised keys (or other issues) may continue to be used until they expire. The longer the lifetime of the certificate, the longer the potential for use of a problematic certificate.

The primary advantage of short-lived certificates is that they greatly reduce the potential compromise window because they expire relatively quickly. This reduces the need for certificate revocation, which has historically been unreliable. Our six-day certificates will not include OCSP or CRL URLs. Additionally, short-lived certificates practically require automation, and we believe that automating certificate issuance is important for security.

## Questions

If you have questions or comments about our plans, feel free to let us know on our [community forums](https://community.letsencrypt.org/).

We'd like to thank [Open Technology Fund](https://www.opentech.fund/) for supporting this work.

## Our First 6-Day Certificate

PEM format:

```
-----BEGIN CERTIFICATE-----
MIIDSzCCAtGgAwIBAgISA7CwFcGk4mQWEXMacRtxHeDvMAoGCCqGSM49BAMDMDIx
CzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MQswCQYDVQQDEwJF
NjAeFw0yNTAyMTkxNzMwMDFaFw0yNTAyMjYwOTMwMDBaMAAwWTATBgcqhkjOPQIB
BggqhkjOPQMBBwNCAAQoSItt2V1aocI5dxrKR8iLfmm0KiVvOhiwKByzu2kLeC7C
0BdfAgtwdICdkuEhAXokhXLq6DNZZgmh5T4flVwZo4IB9zCCAfMwDgYDVR0PAQH/
BAQDAgeAMBMGA1UdJQQMMAoGCCsGAQUFBwMBMAwGA1UdEwEB/wQCMAAwHwYDVR0j
BBgwFoAUkydGmAOpUWiOmNbEQkjbI79YlNIwVQYIKwYBBQUHAQEESTBHMCEGCCsG
AQUFBzABhhVodHRwOi8vZTYuby5sZW5jci5vcmcwIgYIKwYBBQUHMAKGFmh0dHA6
Ly9lNi5pLmxlbmNyLm9yZy8wKAYDVR0RAQH/BB4wHIIaaGVsbG93b3JsZC5sZXRz
ZW5jcnlwdC5vcmcwEwYDVR0gBAwwCjAIBgZngQwBAgEwggEFBgorBgEEAdZ5AgQC
BIH2BIHzAPEAdgDM+w9qhXEJZf6Vm1PO6bJ8IumFXA2XjbapflTA/kwNsAAAAZUf
d/zOAAAEAwBHMEUCIFNd51TfSNiJrO+294t49C5ANc4oC7gTUzf7xnlNlhKsAiEA
wi5hfiC9SsKLxlTQ0sctUxhLmdYh40r6ECWQS/yWw2AAdwDgkrP8DB3I52g2H95h
uZZNClJ4GYpy1nLEsE2lbW9UBAAAAZUfd/0TAAAEAwBIMEYCIQCs2NuZIUIloOaH
1t9eXDKb8bjoWESBPsK4i2BxMvEIswIhAOMNaQNyr1YkzrcNUz15qGV0oVLg5BJN
+ikWxXOdcRHFMAoGCCqGSM49BAMDA2gAMGUCMDANqy7G09AIwzXcd7SNl7uFwhC+
xlfduvp1PeEDHc/FA9K3mRYkGXuKtzNdOh7wcAIxALjEMDmBQiwXbB447oGkaZAe
0rqxA3EtNV5wj0obeObluj/NgUsVEG9OqiBIoggFRw==
-----END CERTIFICATE-----
```

`openssl x509 -text` output:

```
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            03:b0:b0:15:c1:a4:e2:64:16:11:73:1a:71:1b:71:1d:e0:ef
        Signature Algorithm: ecdsa-with-SHA384
        Issuer: C=US, O=Let's Encrypt, CN=E6
        Validity
            Not Before: Feb 19 17:30:01 2025 GMT
            Not After : Feb 26 09:30:00 2025 GMT
        Subject:
        Subject Public Key Info:
            Public Key Algorithm: id-ecPublicKey
                Public-Key: (256 bit)
                pub:
                    04:28:48:8b:6d:d9:5d:5a:a1:c2:39:77:1a:ca:47:
                    c8:8b:7e:69:b4:2a:25:6f:3a:18:b0:28:1c:b3:bb:
                    69:0b:78:2e:c2:d0:17:5f:02:0b:70:74:80:9d:92:
                    e1:21:01:7a:24:85:72:ea:e8:33:59:66:09:a1:e5:
                    3e:1f:95:5c:19
                ASN1 OID: prime256v1
                NIST CURVE: P-256
        X509v3 extensions:
            X509v3 Key Usage: critical
                Digital Signature
            X509v3 Extended Key Usage:
                TLS Web Server Authentication
            X509v3 Basic Constraints: critical
                CA:FALSE
            X509v3 Authority Key Identifier:
                93:27:46:98:03:A9:51:68:8E:98:D6:C4:42:48:DB:23:BF:58:94:D2
            Authority Information Access:
                OCSP - URI:http://e6.o.lencr.org
                CA Issuers - URI:http://e6.i.lencr.org/
            X509v3 Subject Alternative Name: critical
                DNS:helloworld.letsencrypt.org
            X509v3 Certificate Policies:
                Policy: 2.23.140.1.2.1
            CT Precertificate SCTs:
                Signed Certificate Timestamp:
                    Version   : v1 (0x0)
                    Log ID    : CC:FB:0F:6A:85:71:09:65:FE:95:9B:53:CE:E9:B2:7C:
                                22:E9:85:5C:0D:97:8D:B6:A9:7E:54:C0:FE:4C:0D:B0
                    Timestamp : Feb 19 18:28:32.078 2025 GMT
                    Extensions: none
                    Signature : ecdsa-with-SHA256
                                30:45:02:20:53:5D:E7:54:DF:48:D8:89:AC:EF:B6:F7:
                                8B:78:F4:2E:40:35:CE:28:0B:B8:13:53:37:FB:C6:79:
                                4D:96:12:AC:02:21:00:C2:2E:61:7E:20:BD:4A:C2:8B:
                                C6:54:D0:D2:C7:2D:53:18:4B:99:D6:21:E3:4A:FA:10:
                                25:90:4B:FC:96:C3:60
                Signed Certificate Timestamp:
                    Version   : v1 (0x0)
                    Log ID    : E0:92:B3:FC:0C:1D:C8:E7:68:36:1F:DE:61:B9:96:4D:
                                0A:52:78:19:8A:72:D6:72:C4:B0:4D:A5:6D:6F:54:04
                    Timestamp : Feb 19 18:28:32.147 2025 GMT
                    Extensions: none
                    Signature : ecdsa-with-SHA256
                                30:46:02:21:00:AC:D8:DB:99:21:42:25:A0:E6:87:D6:
                                DF:5E:5C:32:9B:F1:B8:E8:58:44:81:3E:C2:B8:8B:60:
                                71:32:F1:08:B3:02:21:00:E3:0D:69:03:72:AF:56:24:
                                CE:B7:0D:53:3D:79:A8:65:74:A1:52:E0:E4:12:4D:FA:
                                29:16:C5:73:9D:71:11:C5
    Signature Algorithm: ecdsa-with-SHA384
    Signature Value:
        30:65:02:30:30:0d:ab:2e:c6:d3:d0:08:c3:35:dc:77:b4:8d:
        97:bb:85:c2:10:be:c6:57:dd:ba:fa:75:3d:e1:03:1d:cf:c5:
        03:d2:b7:99:16:24:19:7b:8a:b7:33:5d:3a:1e:f0:70:02:31:
        00:b8:c4:30:39:81:42:2c:17:6c:1e:38:ee:81:a4:69:90:1e:
        d2:ba:b1:03:71:2d:35:5e:70:8f:4a:1b:78:e6:e5:ba:3f:cd:
        81:4b:15:10:6f:4e:aa:20:48:a2:08:05:47
```
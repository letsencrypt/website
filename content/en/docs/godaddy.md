---
title: "Let's Encrypt Certificates on GoDaddy Hosting"
slug: godaddy
lastmod: 2025-08-11
show_lastmod: 1
---

We get a lot of questions about how to use Let’s Encrypt on GoDaddy. GoDaddy doesn’t support the [ACME protocol](https://tools.ietf.org/html/rfc8555) for automated certificate issuance and renewal. Instead, GoDaddy offers automated renewal with their own certificates, which are an [added-cost feature](https://www.godaddy.com/web-security/ssl-certificate).

We don’t currently recommend using our certificates with GoDaddy because it's difficult and the process can't be automated. We think automated renewals are an important part of certificate management. Using software to automate renewal makes it much less likely that your certificate will expire without being replaced.

If you'd still like to try using Let’s Encrypt certificates with GoDaddy shared hosting, you can look into one of the following options:

1. Use [CertSage](https://certsage.com/) from Griffin Software. Other Let's Encrypt users on GoDaddy have had success with it. 
2. GoDaddy [provides instructions](https://www.godaddy.com/help/install-a-lets-encrypt-certificate-on-your-cpanel-hosting-account-28023). We cannot vouch for their accuracy or correctness. Keep in mind, following these instructions is time-consuming and you are expected to do it regularly, prior to each certificate expiring.

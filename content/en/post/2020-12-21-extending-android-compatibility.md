---
author: Josh Aas and Aaron Gable
date: 2020-12-21T00:00:00Z
excerpt: "We’re happy to announce that we have developed a way for older Android devices to retain their ability to visit sites that use Let's Encrypt certificates after our cross-signed intermediates expire. We are no longer planning any changes in January that may cause compatibility issues for Let’s Encrypt subscribers."
title: "Extending Android Device Compatibility for Let's Encrypt Certificates"
slug: extending-android-compatibility
---

We’re happy to announce that we have developed a way for older Android devices to retain their ability to visit sites that use Let's Encrypt certificates after our cross-signed intermediates expire. We are no longer planning any changes in January that may cause compatibility issues for Let’s Encrypt subscribers.

A recurring theme in [our posts](https://letsencrypt.org/2020/11/06/own-two-feet.html) about our upcoming chain switch has been our concern over the effects on users of Android operating systems prior to 7.1.1, whose devices don’t trust our ISRG Root X1. Thanks to some innovative thinking from our community and our wonderful partners at IdenTrust, we now have a solution that allows us to maintain wide compatibility. Critical to our mission as a nonprofit is to help create a more secure and privacy-respecting Web for as many people as possible. This work brings us closer to that goal.

IdenTrust has agreed to issue a 3-year cross-sign for our ISRG Root X1 from their DST Root CA X3. The new cross-sign will be somewhat novel because it extends beyond the expiration of DST Root CA X3. This solution works because Android intentionally does not enforce the expiration dates of certificates used as trust anchors. ISRG and IdenTrust reached out to our auditors and root programs to review this plan and ensure there weren’t any compliance concerns.

As such, we will be able to provide subscribers with a chain which contains both ISRG Root X1 and DST Root CA X3, ensuring uninterrupted service to all users and avoiding the potential breakage we have been concerned about.

We will not be performing our previously-planned chain switch on January 11th, 2021. Instead, we will be switching to provide this new chain by default in late January or early February. The transition should have no impact on Let’s Encrypt subscribers, much like our switch to our R3 intermediate earlier this month.

<center><img src="/images/2020.12.21-android-compat-cert-chain.png" alt="Let's Encrypt Issuance Chains" width="600"></center>

Some additional technical details follow.

**I’m an ACME client developer, what do I need to do?** If your client handled the X3 to R3 transition smoothly, then you shouldn’t need to take action. Ensure that your client correctly uses the intermediate certificate provided by the ACME API at the end of issuance, and doesn’t retrieve intermediates by other means (e.g. hardcoding them, reusing what is on disk already, or fetching from AIA URLs).

**I’m a Let’s Encrypt subscriber, what do I need to do?** In the vast majority of cases, nothing. If you want to double check, please ensure that your ACME client is up-to-date. 

**I use an old Android device, what do I need to do?** Nothing! We’re trying to ensure that this change is completely invisible to end-users.

**What exactly is changing?** Today, when a subscriber fetches their certificate from our API, we provide the following chain by default:
Subscriber Certificate < -- R3 < -- DST Root CA X3
After this change, we will instead provide this chain by default:
Subscriber Certificate < -- R3 < -- ISRG Root X1 < -- DST Root CA X3
This does mean that the default chain we provide to subscribers will be larger than before, because it contains two intermediates instead of just one. This will make TLS handshakes larger and slightly less efficient, but the tradeoff is worthwhile for the extra compatibility.

**But isn’t DST Root CA X3 expiring?** The self-signed certificate which represents the DST Root CA X3 keypair is expiring. But browser and OS root stores don’t contain certificates per se, they contain “trust anchors”, and the standards for verifying certificates allow implementations to choose whether or not to use fields on trust anchors. Android has intentionally chosen not to use the notAfter field of trust anchors. Just as our ISRG Root X1 hasn’t been added to older Android trust stores, DST Root CA X3 hasn’t been removed. So it can issue a cross-sign whose validity extends beyond the expiration of its own self-signed certificate without any issues.

**What happens when the new cross-sign expires?** This new cross-sign will expire in early 2024. Prior to that, perhaps as early as June 2021, we will be making a similar change to what we intended to make this January. When we make that change, subscribers will have the option to continue using DST Root CA X3 by configuring their ACME client to specifically request it. If you are a Let’s Encrypt subscriber who is already working to mitigate the chain switch (e.g. by configuring alternate chains or encouraging your users on old Android devices to install Firefox), continue that work so you’ll be well-positioned in the future.

**What about the alternate chain?** Today, some ACME clients are able to instead request an alternate chain, if their user has configured it. We currently provide the option of getting the chain:
Subscriber Certificate < -- R3 < -- ISRG Root X1
We will continue to offer this same chain as an alternate. However, note that most ACME clients don't yet have a way to select this alternate chain (for example, Certbot selects chains by looking to see if they contain a given Issuer Name, but this chain doesn’t contain any Issuer Names which the high compatibility chain above doesn’t). We’ll be working with ACME client developers to create more flexible chain selection mechanisms going forward.

**What does this have to do with the upcoming ECDSA chain?** This change is unrelated to our upcoming issuance from the ECDSA-based ISRG Root X2 and E1 intermediate. We look forward to using those to provide smaller, more efficient certificates and chains, but that future offering is not related to this change.

**I have more questions, how can I get them answered?** Please refer your questions to our [community forum](https://community.letsencrypt.org/).

In the future we hope to share more technical details about how and why this plan works, demonstrate why the expiration of DST Root CA X3 doesn’t affect the security of the web, and what this plan means long-term for our subscribers and end-users on the web.

We depend on contributions from our supporters in order to provide our services. If your company or organization would like to [sponsor](https://letsencrypt.org/become-a-sponsor/) Let’s Encrypt please email us at [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org). We ask that you make an [individual contribution](https://letsencrypt.org/donate/) if it is within your means.

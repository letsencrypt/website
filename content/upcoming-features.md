---
title: Upcoming Features
slug: upcoming-features
top_graphic: 1
---


## ECDSA Root and Intermediates

* ETA: Q3 2018

Currently Let's Encrypt only signs end-entity certificates with RSA intermediates. Let's Encrypt will generate an ECDSA root and intermediates which can be used to sign end-entity certificates.

# Completed Features

## Embed SCT receipts in certificates

* Enabled: March 29, 2018

## Wildcard Certificates

* Enabled: March 13, 2018

## ACME v2 API

* Enabled: March 13, 2018

## IDN Support

* Enabled: October 20, 2016

Let's Encrypt now supports issuance for Internationalized Domain Names (IDNs).

## Full IPv6 Support

* Enabled: July 26, 2016

Initially, only parts of the Let's Encrypt API infrastructure could communicate via IPv6. This prevented IPv6-only systems from being able to fully interact with Let's Encrypt. This has been resolved - IPv6 support has been enabled for all functionality.

## Windows XP Certificate Compatibility

* Enabled: March 25, 2016

Resolved an issue with our certificate chain that prevented Let's Encrypt certificates from being accepted by browsers on Windows XP.

## ECDSA Signing Support

* Enabled: February 10, 2016

Added the ability for Let's Encrypt to sign ECDSA keys with Let's Encrypt's RSA intermediates. Support for signing ECDSA keys with a full ECDSA cert chain will be added later.

## ACME DNS Challenge Support

* Enabled: January 20, 2016

Let's Encrypt allows validation via DNS records as defined in the ACME specification.

---
layout: page
title: Client Options
permalink: /docs/client-options/
top_graphic: 1
date: 2016-07-02T00:00
---

Last updated: {{ page.date | date: "%B %d, %Y" }} \| [See all Documentation](/docs/)

# Recommended Client

We recommend that most people start with the [certbot](https://certbot.eff.org/) client. It can simply get a cert for you or also help you install, depending on what you prefer. It’s easy to use, works on many operating systems, and has great documentation.

If certbot does not meet your needs, or you’d simply like to try something else, there are many more clients to choose from below.

# Alternative Clients

## Bash

- [GetSSL](https://github.com/srvrco/getssl) (bash, also automates certs on remote hosts via ssh) 
- [acme.sh](https://github.com/Neilpang/acme.sh) (Compatible to bash, dash and sh)
- [letsencrypt.sh](https://github.com/lukas2511/letsencrypt.sh) (Compatible to bash and zsh)
- [gheift/letsencrypt.sh](https://github.com/gheift/letsencrypt.sh)

## Browser

- [Get HTTPS for free](https://gethttpsforfree.com)
- [ZeroSSL](https://ZeroSSL.com) (Fully in-browser process, inc. CSR generation)

## C
- [Letskencrypt](https://kristaps.bsd.lv/letskencrypt/)

## Go

- [Caddy](https://caddyserver.com)
- [Lego](https://github.com/xenolf/lego)
- [GoACME](https://github.com/google/goacme)
- [hlandau/acme](https://github.com/hlandau/acme)
- [ericchiang/letsencrypt](https://github.com/ericchiang/letsencrypt)

## HAProxy

- [HAProxy ACME validation plugin](https://github.com/janeczku/haproxy-acme-validation-plugin)

## nginx

- [lua-resty-auto-ssl](https://github.com/GUI/lua-resty-auto-ssl)

## Node.js

- [Daplie/letsencrypt-cli](https://github.com/Daplie/letsencrypt-cli)
- [Daplie/letsencrypt-express](https://github.com/Daplie/letsencrypt-express)

## Perl

- [le.pl](https://github.com/do-know/Crypt-LE) (aka [ZeroSSL](https://ZeroSSL.com/))

## PHP

- [kelunik/acme-client](https://github.com/kelunik/acme-client)
- [CertLE](https://github.com/skoerfgen/CertLE)
- [AcmePHP](https://github.com/acmephp/cli)
- [LE Manager](https://github.com/analogic/lemanager)
- [WordPress Plugin](https://github.com/tollmanz/lets-encrypt-wp)
- [Let's Encrypt for Hiawatha](https://github.com/hsleisink/hiawatha/tree/master/extra/letsencrypt)

## Python

- [No Sudo Client](https://github.com/diafygi/letsencrypt-nosudo)
- [ACME Tiny](https://github.com/diafygi/acme-tiny)
- [simp_le](https://github.com/kuba/simp_le)
- [mail-in-a-box/letsencrypt_simpleclient](https://github.com/mail-in-a-box/letsencrypt_simpleclient)
- [ManuaLE](https://github.com/veeti/manuale) (Python 3)
- [Let's ACME](https://github.com/neurobin/letsacme)
- [letsencryptshell](https://mojzis.com/software/letsencryptshell/)

## Ruby

- [unixcharles/acme-client](https://github.com/unixcharles/acme-client)
- [Multi-Server ACME Cert Management Dashboard](https://github.com/myfreeweb/freshcerts)
- [Let's Encrypt CLI](https://github.com/zealot128/ruby-letsencrypt-cli)
- [Ruby on Rails Plugin](https://github.com/lgromanowski/letsencrypt-plugin)
- [Acmesmith, An effective ACME client: Manage keys on the cloud (AWS and more)](https://github.com/sorah/acmesmith)

## Windows

- [ACMESharp](https://github.com/ebekker/ACMESharp) (.NET, PowerShell)
- [letsencrypt-win-simple](https://github.com/Lone-Coder/letsencrypt-win-simple) (.NET)
- [Certify](https://github.com/webprofusion/Certify) GUI (.NET, WinForms)
- [oocx/acme.net](https://github.com/oocx/acme.net) (.NET)
- [kelunik/acme-client](https://github.com/kelunik/acme-client) (PHP)

# Libraries

## Go

- [Lego](https://github.com/xenolf/lego)
- [hlandau/acme](https://github.com/hlandau/acme/tree/master/acmeapi)

## Java

- [zero11it/acme-client](https://github.com/zero11it/acme-client)
- [shred/acme4j](https://github.com/shred/acme4j)

## Node.js

- [Daplie/letsencrypt](https://github.com/Daplie/node-letsencrypt)
- [letsencrypt/boulder](https://github.com/letsencrypt/boulder/tree/master/test/js)

## Perl

- [Crypt::LE](https://github.com/do-know/Crypt-LE)
- [sludin/Protocol-ACME](https://github.com/sludin/Protocol-ACME)

## PHP

- [kelunik/acme-client](https://github.com/kelunik/acme)

## Python

- the Python [acme](https://github.com/certbot/certbot/tree/master/acme)
  module is part of the Certbot tree, but is also used by a number of other
  clients and is available as a standalone package
  via [PyPI](https://pypi.python.org/pypi/acme), [Debian](https://packages.debian.org/search?keywords=python-acme), 
  [Ubuntu](https://launchpad.net/ubuntu/+source/python-acme), [Fedora](https://bodhi.fedoraproject.org/updates/?packages=python-acme) and other distributions. 
- [mail-in-a-box/letsencrypt_simpleclient](https://github.com/mail-in-a-box/letsencrypt_simpleclient) (Python 3)
- [txacme](https://github.com/mithrandi/txacme) (Twisted client for Python 2 / 3)

## Ruby

- [unixcharles/acme-client](https://github.com/unixcharles/acme-client)

## Windows

- [ebekker/ACMESharp](https://github.com/ebekker/ACMESharp) (.NET, PowerShell)

# Projects integrating with Let's Encrypt

- [Caddy](https://caddyserver.com/)
- [Own-Mailbox](https://www.own-mailbox.com/)
- [Daplie](https://daplie.com/walnut)
- [Cloudfleet](https://cloudfleet.io/)
- [Aerys](https://github.com/kelunik/aerys-acme)
- [CentminMod LEMP Stack](https://centminmod.com/acmetool)
- [Mail-in-a-Box](https://mailinabox.email/)
- [Froxlor Server Management Panel](https://www.froxlor.org/)
- [Mesosphere DCOS](https://mesosphere.com/blog/2016/04/06/lets-encrypt-dcos/)
- [Virtualmin Web Hosting Control Panel](https://www.virtualmin.com/)

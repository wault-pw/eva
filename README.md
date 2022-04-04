# eva

[![Test](https://github.com/wault-pw/eva/actions/workflows/ci.yml/badge.svg)](https://github.com/wault-pw/eva/actions/workflows/ci.yml)

[English](https://cloud.wault.pw), [Chinese](https://cloud.wault.cn.com)

To avoid storing data on the server, the Wault **password manager** encrypts and decrypts data inside the browser. The keys for all encryption processes are derived from the password, which is never sent to the server.

In simple terms, Wault password manager is an online service that knows nothing about its users. Wault looks like an ordinary web application, but hides a powerful cryptographic mechanism entirely created and executed in your browser.

Based on this idea, we developed and implemented a web application architecture that supports your privacy. The main idea was to create a trust-free service, where users could trust the data within the browser, regardless of external sources.

![Wault password manager](/docs/screenshot.png)

## Docker setup

The simplest [docker](https://hub.docker.com/r/shlima/wault) installation 
(implies you are using local Postgres), looking the following. First, you should create an 
empty database `psql -c 'CREATE DATABASE alice'`.

```bash
docker run --rm -e PG_DSN="postgres://user@host.docker.internal:5432/alice?sslmode=disable&timezone=utc" -p 3000:3000 shlima/wault 
```

Production ready setup should be like this one. Please provide your own random keys.
- `SSE_KEY` for server side encryption
- `JWT_KEY` for signing JWT cookies
- `COOKIE_SECURE` set to `true` if you run wault instance behind the HTTPS

```bash
docker run --rm \
-e PG_DSN="postgres://user@host.docker.internal:5432/alice?sslmode=disable&timezone=utc" \
-e SSE_KEY=bf02ee811878d6cd9eebb823e54d2bdc318b4fc676df9c3f709f8c9c6ca8fff0 \
-e JWT_KEY=7cfa6c528a3060810ae8337382b99a9eaaf305a8055d4739df8312155a0d93d8 \
-e COOKIE_SECURE=false \
-e LOCALE=en \
-e PRODUCTION=true \
-p 3000:3000 \
shlima/wault
```

<a href="https://www.producthunt.com/posts/wault-encrypted-anon-password-manager?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-wault&#0045;encrypted&#0045;anon&#0045;password&#0045;manager" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=337572&theme=dark" alt="Wault&#0058;&#0032;encrypted&#0044;&#0032;anon&#0046;&#0032;password&#0032;manager - SRP6a&#0044;&#0032;AES&#0044;&#0032;RSA&#0044;&#0032;HMAC | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

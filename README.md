# eva

[![Test](https://github.com/wault-pw/eva/actions/workflows/ci.yml/badge.svg)](https://github.com/wault-pw/eva/actions/workflows/ci.yml)

To avoid storing data on the server, the Wault **password manager** encrypts and decrypts data inside the browser. The keys for all encryption processes are derived from the password, which is never sent to the server. 

In simple terms, Wault password manager is an online service that knows nothing about its users. Wault looks like an ordinary web application, but hides a powerful cryptographic mechanism entirely created and executed in your browser. 

Based on this idea, we developed and implemented a web application architecture that supports your privacy. The main idea was to create a trust-free service, where users could trust the data within the browser, regardless of external sources.

![Wault password manager](/docs/screenshot.png)

```bash
docker run \
-e ALICE_URL=http://localhost:8080 \
-p3000:3000 \
ghcr.io/wault-pw/eva
```

## e2e locally
How to run e2e test locally? First, run backend with `mount-cypress` option:
```bash
go run main.go server --ver666 --mount-cypress
```

Then run eva with unsecure (but fast) encryption scheme and run cypress tests
```bash
VER666=1 yarn dev
make test:e2e
```

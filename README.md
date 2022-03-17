# eva

[![Test](https://github.com/wault-pw/eva/actions/workflows/ci.yml/badge.svg)](https://github.com/wault-pw/eva/actions/workflows/ci.yml)

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

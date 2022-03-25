## e2e locally
How to run e2e test locally? First, run [backend](https://github.com/wault-pw/alice) 
with `mount-cypress` option:

```bash
go run main.go server --ver666 --mount-cypress
```

Then run eva with unsecure (but fast) encryption scheme and run cypress tests
```bash
VER666=1 yarn dev
make test:e2e
```

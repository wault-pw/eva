ARG BUILD=node:17-alpine
ARG ISO=nginx

FROM ${BUILD} as build
WORKDIR /app
COPY . .
ARG VERSION
ARG COMMIT
# fix for https://stackoverflow.com/questions/69394632/webpack-build-failing-with-err-ossl-evp-unsupported
ENV NODE_OPTIONS=--openssl-legacy-provider
ENV BUILD_DEPS make
RUN apk add --update --no-cache $BUILD_DEPS
RUN yarn install && \
    make generate:mpa generate:spa generate:licenses && \
    rm -rf node_modules

# nginx is used to serve pages
FROM ${ISO} as iso
WORKDIR /app
COPY --from=build /app/dist .
COPY scripts scripts
COPY docker/docker-entrypoint.sh .
COPY docker/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["/app/docker-entrypoint.sh"]
STOPSIGNAL SIGQUIT
CMD ["nginx", "-g", "daemon off;"]

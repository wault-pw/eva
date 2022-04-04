ARG BUILD=node:17-alpine
ARG ISO=nginx:alpine

FROM ${BUILD} as build
WORKDIR /app
COPY . .

ARG VERSION
ENV BUILD_DEPS make
RUN apk add --update --no-cache $BUILD_DEPS
ENV ALICE_URL=":ALICE_URL:"
ENV LOCALE=":LOCALE:"
ENV STATUS_PAGE=":STATUS_PAGE:"
ENV TERMS_PAGE=":TERMS_PAGE:"
ENV PRIVACY_PAGE=":PRIVACY_PAGE:"
ENV FEATURE_PAGE=":FEATURE_PAGE:"
ENV SECURITY_PAGE=":SECURITY_PAGE:"
ENV EMAIL=":EMAIL:"
RUN yarn install --verbose --production=true --prefer-offline --frozen-lockfile
RUN make generate:mpa generate:spa

# nginx is used to serve pages
FROM ${ISO} as iso
WORKDIR /app
COPY --from=build /app/dist /app/eva
COPY scripts scripts
COPY docker/docker-entrypoint.sh .
COPY docker/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["/app/docker-entrypoint.sh"]
STOPSIGNAL SIGQUIT
CMD ["nginx", "-g", "daemon off;"]

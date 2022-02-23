PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
REGISTRY_DOMAIN=ghcr.io
REGISTRY_NAME=ghcr.io/oka-is/eva
VERSION:=$(shell cat VERSION)

proto:
	protoc \
		--plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
		--js_out="import_style=commonjs,binary:desc" \
		--ts_out="desc" \
		--proto_path=protos \
		alice_v1.proto

generate\:mpa:
	rm -rf dist/*
	VERSION=":VERSION:" yarn run generate

generate\:spa:
	node ./scripts/spa.js dist/index.html > dist/backup.html

docker\:build: export TAG=$(VERSION)
docker\:build:
	docker build --no-cache -f ./Dockerfile -t ${REGISTRY_NAME}:${TAG} .
	docker tag ${REGISTRY_NAME}:${TAG} ${REGISTRY_NAME}:latest

docker\:push: export TAG=$(VERSION)
docker\:push:
	@echo $(REGISTRY_PASSWORD) | docker login ${REGISTRY_DOMAIN} --username ${REGISTRY_USERNAME} --password-stdin
	docker push ${REGISTRY_NAME}:${TAG}
	docker push ${REGISTRY_NAME}:latest

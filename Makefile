PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
REGISTRY_NAME=ghcr.io/wault-pw/eva
REGISTRY_NAME_BUNDLE=shlima/wault
VERSION:=$(shell cat VERSION)

proto:
	protoc \
		--plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
		--js_out="import_style=commonjs,binary:src/desc" \
		--ts_out="src/desc" \
		--proto_path=protos \
		alice_v1.proto

test\:unit:
	yarn run test:unit

test\:e2e:
	yarn run test:e2e

generate\:spa:
	node ./scripts/spa.js dist/index.html > dist/backup.html

generate\:mpa:
	rm -rf dist/*
	yarn build
	node ./scripts/integrity.js dist/index.html > dist/index0.html
	mv dist/index0.html dist/index.html

build: export TAG=$(VERSION)
build:
	docker build --no-cache -f ./Dockerfile -t ${REGISTRY_NAME}:${TAG} --build-arg VERSION=${VERSION} .
	docker tag ${REGISTRY_NAME}:${TAG} ${REGISTRY_NAME}:latest

push: export TAG=$(VERSION)
push:
	docker push ${REGISTRY_NAME}:${TAG}
	docker push ${REGISTRY_NAME}:latest

build\:bundle: export TAG=$(VERSION)
build\:bundle:
	docker build --no-cache -f ./DockerfileBundle -t ${REGISTRY_NAME_BUNDLE}:${TAG} --build-arg VERSION=${VERSION} .
	docker tag ${REGISTRY_NAME_BUNDLE}:${TAG} ${REGISTRY_NAME_BUNDLE}:latest

push\:bundle: export TAG=$(VERSION)
push\:bundle:
	docker push ${REGISTRY_NAME_BUNDLE}:${TAG}
	docker push ${REGISTRY_NAME_BUNDLE}:latest

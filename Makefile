PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"

proto:
	protoc \
		--plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
		--js_out="import_style=commonjs,binary:desc" \
		--ts_out="desc" \
		--proto_path=protos \
		alice_v1.proto

generate:
	rm -rf dist/*
	yarn run generate

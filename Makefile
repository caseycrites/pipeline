BUILD_NUMBER ?= 0

all: version

version:
	m4 -D__BUILD__=$(BUILD_NUMBER) lib/pipeline/version.js.m4 > lib/pipeline/version.js

.PHONY: all version

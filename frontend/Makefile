# export PATH := /usr/local/node/10.15.3/bin:${PATH}
# NPM := $(shell command -v cnpm 2> /dev/null)
# ifndef NPM
#	NPM := npm --registry=https://registry.npm.taobao.org
# endif


dist: src/*
	/usr/bin/yarn
	/usr/bin/yarn cache dir
	/usr/bin/yarn run build

build: dist
	tar -czvf R.tar.gz dist/*

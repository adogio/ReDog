ReDog : webpackServer

tscBuild :
	tsc

testRun :
	node test/test.js

clean :
	rm -rf dogDOM/*.js dogDOM/*.js.map
	rm -rf src/*.js src/*.js.map
	rm -rf dist/*.js dist/*.js.map

webpack :
	node_modules/.bin/webpack

webpackServer :
	node_modules/.bin/webpack-dev-server --open
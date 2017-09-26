ReDog : tscBuild testRun


tscBuild :
	tsc

testRun :
	node test/test.js

clean :
	rm -rf dogDOM/*.js dogDOM/*.js.map
	rm -rf src/*.js src/*.js.map
	rm -rf dist/*.js dist/*.js.map
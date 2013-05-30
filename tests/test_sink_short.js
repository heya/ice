/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
(["module", "../test", "./simulator", "../sinks/short"],
function(module, ice, simulator, shortSink){
	"use strict";

	var ice = ice.specialize(module);
	ice.setNamedTransports("default", [{log: shortSink}]);

	// local tests

	ice.info("Info");
	ice.warn("Warn");
	try{
		ice.error("Error");
	}catch(e){
		ice.info(e);
	}

	ice.test(1 < 2, "Test #1");
	eval(ice.TEST("1 < 2"));
	ice.test(3 < 2, "Test #2");
	eval(ice.TEST("3 < 2"));

	ice.assert(1 < 2, "Test #1");
	eval(ice.ASSERT("1 < 2"));
	try{
		ice.assert(3 < 2, "Test #2");
	}catch(e){
		ice.info(e);
	}
	try{
		eval(ice.ASSERT("3 < 2"));
	}catch(e){
		ice.info(e);
	}

	// simulated test

	simulator("info", ["Info"]);
	simulator("warn", ["Warn"]);
	try{
		simulator("error", ["Error"]);
	}catch(e){
		simulator("info", [e]);
	}

	simulator("test", [1 < 2, "Test #1"]);
	simulator("TEST", ["1 < 2"]);
	simulator("test", [3 < 2, "Test #2"]);
	simulator("TEST", ["3 < 2"]);

	simulator("assert", [1 < 2, "Test #1"]);
	simulator("ASSERT", ["1 < 2"]);
	try{
		simulator("assert", [3 < 2, "Test #2"]);
	}catch(e){
		simulator("info", [e]);
	}
	try{
		simulator("ASSERT", ["3 < 2"]);
	}catch(e){
		simulator("info", [e]);
	}
});

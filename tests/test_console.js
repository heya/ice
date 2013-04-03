/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
(["module", "../test", "../sinks/console"], function(module, ice, consoleSink){
	"use strict";

	var ice = ice.specialize(module);
	ice.setNamedTransports("default", [{log: consoleSink}]);

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
});

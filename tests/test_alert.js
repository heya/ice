/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
(["module", "../test", "../sinks/alert"], function(module, logger, alertSink){
	"use strict";

	var logger = logger.getLogger(module);
	logger.setNamedTransports("default", [{log: alertSink}]);

	// local tests

	logger.info("Info");
	logger.warn("Warn");
	try{
		logger.error("Error");
	}catch(e){
		logger.info(e);
	}

	logger.test(1 < 2, "Test #1");
	eval(logger.test("1 < 2"));
	logger.test(3 < 2, "Test #2");
	eval(logger.test("3 < 2"));

	logger.assert(1 < 2, "Test #1");
	eval(logger.assert("1 < 2"));
	try{
		logger.assert(3 < 2, "Test #2");
	}catch(e){
		logger.info(e);
	}
	try{
		eval(logger.assert("3 < 2"));
	}catch(e){
		logger.info(e);
	}
});

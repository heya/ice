(function(factory){
	if(typeof define != "undefined"){ // AMD
		require(["module", "../test", "../sinks/alert"], factory);
	}else if(typeof module != "undefined"){ // node.js
		factory(module, require("../test"), require("../sinks/alert"));
	}
})(function(module, logger, alertSink){
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

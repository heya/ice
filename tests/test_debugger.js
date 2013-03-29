(function(factory){
	if(typeof define != "undefined"){ // AMD
		require(["module", "../test", "../transports/debugger"], factory);
	}else if(typeof module != "undefined"){ // node.js
		factory(module, require("../test"), require("../transports/debugger"));
	}
})(function(module, logger, debuggerTransport){
	"use strict";

	var logger = logger.getLogger(module);
	logger.setNamedTransports("default", [{log: debuggerTransport}]);

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

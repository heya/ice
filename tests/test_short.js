(function(factory){
	if(typeof define != "undefined"){ // AMD
		require(["module", "../test", "./simulator", "../sinks/short"], factory);
	}else if(typeof module != "undefined"){ // node.js
		factory(module, require("../test"), require("./simulator"), require("../sinks/short"));
	}
})(function(module, logger, simulator, shortSink){
	"use strict";

	var logger = logger.getLogger(module);
	logger.setNamedTransports("default", [{log: shortSink}]);

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

	// simulated test

	simulator("info", ["Info"]);
	simulator("warn", ["Warn"]);
	try{
		simulator("error", ["Error"]);
	}catch(e){
		simulator("info", [e]);
	}

	simulator("test", [1 < 2, "Test #1"]);
	simulator("test", ["1 < 2"]);
	simulator("test", [3 < 2, "Test #2"]);
	simulator("test", ["3 < 2"]);

	simulator("assert", [1 < 2, "Test #1"]);
	simulator("assert", ["1 < 2"]);
	try{
		simulator("assert", [3 < 2, "Test #2"]);
	}catch(e){
		simulator("info", [e]);
	}
	try{
		simulator("assert", ["3 < 2"]);
	}catch(e){
		simulator("info", [e]);
	}
});

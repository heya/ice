(function(factory){
	if(typeof define != "undefined"){ // AMD
		define(["module", "../main"], factory);
	}else if(typeof module != "undefined"){ // node.js
		module.exports = factory(module, require("../main"));
	}
})(function(module, logger){
	"use strict";

	var logger = logger.getLogger(module);

	function simulator(methodName, args){
		if((methodName === "assert" || methodName === "test") && typeof args[0] == "string"){
			eval(logger[methodName].apply(logger, args));
		}else{
			logger[methodName].apply(logger, args);
		}
	}

	return simulator;
});
/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
(["module", "../main"], function(module, logger){
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
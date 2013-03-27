(function(factory){
	if(typeof define != "undefined"){ // AMD
		define(["./main"], factory);
	}else if(typeof module != "undefined"){ // node.js
		module.exports = factory(require("./main"));
	}
})(function(logger){
	"use strict";

	function quoteString(text){
		return text.replace(/['"\\]/g, "\\$&");
	}

	function addConditional(logger, level, name, defaultName){
		logger.addLevel(level, name, function assert(condition, text, custom){
			if(typeof condition == "string" && (arguments.length < 2 || typeof text == "string")){
				// condition should be evaluated
				return "if(!(" + condition + ")){ " + (text || defaultName || "logger") + "._log('" + name +
					"', null, '" + quoteString(condition) + "', null, new Error('LOG')); }";
			}
			// condition was literal
			if(condition){ return; }
			// if fails
			if(typeof text == "string"){
				return this._log(name, text, null, custom || null, new Error("LOG"));
			}
			return this._log(name, null, null, text || custom || null, new Error("LOG"));
		});
	}

	addConditional(logger, 300, "assert");
	logger._addCond = addConditional;

	return logger;
});

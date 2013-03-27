(function(factory){
	if(typeof define != "undefined"){ // AMD
		define([], factory);
	}else if(typeof module != "undefined"){ // node.js
		module.exports = factory();
	}
})(function(){
	"use strict";

	return function exceptionTransport(logger, meta, text, condition, custom){
		var error = new Error(meta.name.toUpperCase() + ": " + (text || condition || "anonymous"));
		error.logger = logger;
		error.meta   = meta;
		error.text   = text;
		error.condition = condition;
		error.custom = custom;
		throw error;
	};
});

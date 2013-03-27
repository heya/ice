(function(factory){
	if(typeof define != "undefined"){ // AMD
		define(["./assert"], factory);
	}else if(typeof module != "undefined"){ // node.js
		module.exports = factory(require("./assert"));
	}
})(function(logger){
	"use strict";

	logger._addCond(logger, 200, "test");

	return logger;
});

(function(factory){
	if(typeof define != "undefined"){ // AMD
		define([], factory);
	}else if(typeof module != "undefined"){ // node.js
		module.exports = factory();
	}
})(function(){
	"use strict";

	return function debuggerTransport(logger, meta, text, condition, custom){
		var flag = false;
		debugger;
		// set flag to true to stop logging and return back to the logging site
		return flag;
	};
});

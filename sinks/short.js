(function(factory){
	if(typeof define != "undefined"){ // AMD
		define([], factory);
	}else if(typeof module != "undefined"){ // node.js
		module.exports = factory();
	}
})(function(){
	"use strict";

	return function shortSink(ice, meta, text, condition, custom){
		console.log(meta.name.toUpperCase() + ": " + (text || condition || "-") +
			(meta.filename ? " in " + meta.filename : "") +
			(meta.filename && meta.id && meta.filename != meta.id ? " as " + meta.id : ""));
	};
});

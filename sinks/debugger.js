/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
([], function(){
	"use strict";

	return function debuggerSink(ice, meta, text, condition, custom){
		var flag = false;
		debugger;
		// set flag to true to stop logging and return back to the logging site
		return flag;
	};
});

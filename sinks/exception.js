/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
([], function(){
	"use strict";

	return function exceptionSink(ice, meta, text, condition, custom){
		var error = new Error(meta.name.toUpperCase() + ": " + (text || condition || "anonymous"));
		error.ice = ice;
		error.meta   = meta;
		error.text   = text;
		error.condition = condition;
		error.custom = custom;
		throw error;
	};
});

/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
(["module", "../ice"], function(module, ice){
	"use strict";

	var ice = ice.specialize(module);

	function simulator(methodName, args){
		eval(ice[methodName].apply(ice, args));
	}

	return simulator;
});
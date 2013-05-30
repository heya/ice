/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
(["module", "../test", "../console"], function(module, ice, console){
	"use strict";

	ice = ice.specialize(module);
	console = console.specialize(ice);

	// local tests

	console.info("Info");
	console.warn("Warn");
	try{
		console.error("Error");
	}catch(e){
		console.info(e);
	}

	console.log("Formatting: %d%, %s, %j", 99, "Ouch!", {x: 1});
});

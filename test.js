/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
(["./assert"], function(ice){
	"use strict";

	ice._addCond(ice.Ice, 200, "test");

	return ice;
});

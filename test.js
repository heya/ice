/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
(["./assert"], function(logger){
	"use strict";

	logger._addCond(logger.Logger, 200, "test");

	return logger;
});

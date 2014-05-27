/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
(["./ice"], function(ice){
	"use strict";

	function quoteString(text){
		return text.replace(/['"\\]/g, "\\$&");
	}

	ice.Ice.prototype._addCond = function addConditional(Ice, level, name){
		// function version
		Ice.prototype[name] = function assert(condition, text, custom){
			if(condition){ return; }
			// if fails
			if(typeof text == "string"){
				return this._log(name, text, null, custom || null, new Error("LOG"));
			}
			return this._log(name, null, null, text || custom || null, new Error("LOG"));
		};
		// eval version
		Ice.prototype[name.toUpperCase()] = function assert(condition, text){
			return "if(!(" + condition + ")){ " + (text || this.selfName || "ice") + "._log('" + name +
				"', null, '" + quoteString(condition) + "', null, new Error('LOG')); }";
		};
	};

	ice._addCond(ice.Ice, 300, "assert");

	return ice;
});

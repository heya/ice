(function(_,f){window.heya.ice.assert=f(window.heya.ice.main);})
(["./main"], function(ice){
	"use strict";

	function quoteString(text){
		return text.replace(/['"\\]/g, "\\$&");
	}

	function showVariables(code, selfName){
		// borrowed from heya-ctr / lambda.js / crackLambda()
		var vars = code.
				replace(/(?:\b[A-Z]|\.[a-zA-Z_$])[a-zA-Z_$\d]*\b|\b[a-zA-Z_$][a-zA-Z_$\d]*:|\b(?:function|return|if|else|switch|case|while|for|do|break|continue|var|try|catch|finally|throw|with|debugger|default|this|true|false|null|undefined|typeof|instanceof|in|delete|new|void|arguments|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|escape|eval|isFinite|isNaN|parseFloat|parseInt|unescape|window|document)\b|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g, "").
				match(/(\b[a-z_$][a-z_$\d]*\b)/gi) || [];
		var result = [], resultSet = {};
		for(var i = 0, n = vars.length; i < n; ++i){
			var name = vars[i], key = "-" + name;
			if(name != selfName && !resultSet[key]){
				result.push("'" + vars[i] + "':" + vars[i]);
				resultSet[key] = 1;
			}
		}
		return "{" + result.join(",") + "}";
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
				"', null, '" + quoteString(condition) + "', " +
				showVariables(condition, text || this.selfName || "ice") + ", new Error('LOG')); }";
		};
	};

	ice._addCond(ice.Ice, 300, "assert");

	return ice;
});

(function(_,f){window.heya.ice.console=f(window.heya.ice.main);})
(["./main"], function(ice){
	"use strict";

	function format(args){
		var result = "", msg = args[0], i = 0;
		if(typeof msg == "string"){
			result = msg.replace(/%[difsj]/g, function(pattern){
				if(pattern == "%s"){
					return "" + args[++i];
				}
				if(pattern == "%j"){
					return JSON.stringify(args[++i]);
				}
				return "" + (+args[++i]);
			});
		}
		var rest = [];
		for(++i; i < args.length; ++i){
			rest.push("" + args[i]);
		}
		if(!rest.length){
			return result;
		}
		if(result){
			return result + " " + rest.join(" ");
		}
		return rest.join(" ");
	}

	function log(name){
		return function(){
			var args = Array.prototype.slice.call(arguments, 0);
			this.ice[name](format(args), args);
		};
	}

	function Console(specialIce){
		this.ice = specialIce || ice;
	}

	var cp = Console.prototype = {
		log:   log("info"),
		info:  log("info"),
		warn:  log("warn"),
		error: log("error"),
		specialize: function(specialIce){
			return new Console(specialIce);
		}
	};

	if(typeof console == "object"){
		for(var name in console){
			if(!cp.hasOwnProperty(name)){
				cp[name] = console[name];
			}
		}
	}

	return new Console();
});

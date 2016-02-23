(function(_,f,g){g=window;g=g.heya||(g.heya={});g=g.ice||(g.ice={});g=g.sinks||(g.sinks={});g.exception=f();})
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

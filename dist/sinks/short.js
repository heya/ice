(function(_,f,g){g=window;g=g.heya||(g.heya={});g=g.ice||(g.ice={});g=g.sinks||(g.sinks={});g.short=f();})
([], function(){
	"use strict";

	return function shortSink(ice, meta, text, condition, custom){
		console.log(meta.name.toUpperCase() + ": " + (text || condition || "-") +
			(meta.filename ? " in " + meta.filename : "") +
			(meta.filename && meta.id && meta.filename != meta.id ? " as " + meta.id : ""));
	};
});

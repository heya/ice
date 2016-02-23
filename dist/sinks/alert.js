(function(_,f,g){g=window;g=g.heya||(g.heya={});g=g.ice||(g.ice={});g=g.sinks||(g.sinks={});g.alert=f();})
([], function(){
	"use strict";

	return function alertSink(ice, meta, text, condition, custom){
		alert(meta.name.toUpperCase() + ": " + (text || condition || "-") +
			(meta.filename ? " in " + meta.filename : "") +
			(meta.filename && meta.id && meta.filename != meta.id ? " as " + meta.id : ""));
	};
});

(function(_,f,g){g=window;g=g.heya||(g.heya={});g=g.ice||(g.ice={});g=g.sinks||(g.sinks={});g.console=f();})
([], function(){
	"use strict";

	return function consoleSink(ice, meta, text, condition, custom){
		console.log(meta.name + ": " + meta.level + " on " +
			meta.time.toUTCString() + " in " + meta.filename +
			(meta.filename !== meta.id ? " as " + meta.id : ""));
		if(text){
			console.log(meta.name + ": text - " + text);
		}
		if(condition){
			console.log(meta.name + ": cond - " + condition);
		}
		if(custom){
			console.log(meta.name + ": custom - ", custom);
		}
		if(meta.stack){
			console.log(meta.name + ": stack");
			console.log(meta.stack);
			console.log(meta.name + ": end of stack");
		}
	};
});

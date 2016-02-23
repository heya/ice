(function(_,f,g){g=window;g=g.heya||(g.heya={});g=g.ice||(g.ice={});g=g.sinks||(g.sinks={});g.debugger=f();})
([], function(){
	"use strict";

	return function debuggerSink(ice, meta, text, condition, custom){
		var flag = false;
		debugger;
		// set flag to true to stop logging and return back to the logging site
		return flag;
	};
});

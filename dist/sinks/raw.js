(function(_,f,g){g=window;g=g.heya||(g.heya={});g=g.ice||(g.ice={});g=g.sinks||(g.sinks={});g.raw=f();})
([], function(){
	"use strict";

	return function rawSink(limit){
		var queue = [];
		return {
			limit: limit,
			getQueue: function(){
				return queue;
			},
			clearQueue: function(){
				queue.length && queue.splice(0, queue.length);
			},
			log: function rawTransport(ice, meta, text, condition, custom){
				while(queue.length >= limit){
					queue.shift();
				}
				queue.push({ice: ice, meta: meta, text: text, condition: condition, custom: custom});
			}
		};
	};
});

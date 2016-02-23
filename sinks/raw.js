/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
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

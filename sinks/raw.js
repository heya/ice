(function(factory){
	if(typeof define != "undefined"){ // AMD
		define([], factory);
	}else if(typeof module != "undefined"){ // node.js
		module.exports = factory();
	}
})(function(){
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
			log: function rawTransport(logger, meta, text, condition, custom){
				while(queue.length >= limit){
					queue.shift();
				}
				queue.push({logger: logger, meta: meta, text: text, condition: condition, custom: custom});
			}
		};
	};
});

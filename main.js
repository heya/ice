(function(factory){
	if(typeof define != "undefined"){ // AMD
		define(["./transports/short", "./transports/console",
			"./transports/exception"], factory);
	}else if(typeof module != "undefined"){ // node.js
		module.exports = factory(require("./transports/short"),
			require("./transports/console"), require("./transports/exception"));
	}
})(function(shortTransport, consoleTransport, exceptionTransport){
	"use strict";

	var defaultLoggerSettings = {
			levels: {
				info:   0,
				warn:   100,
				//test:   200,	// defined separately in test.js
				//assert: 300,	// defined separately in assert.js
				error:  400
			},
			filter: 0,
			transports: [
				{
					filter: [0, 200],
					log:    shortTransport
				},
				{
					filter: 200,
					log:    consoleTransport
				},
				{
					filter: 300,
					log:    exceptionTransport
				}
			]
		};

	function Logger(meta, logger){
		logger = logger || defaultLoggerSettings;
		// initialization
		this.meta = {};
		this.filter = logger.filter;
		this.transports = logger.transports.slice(0);
		this._addCond = logger._addCond;
		// fill the meta
		if(meta){
			if(meta.id)      { this.meta.id = meta.mid || meta.id || ""; }
			if(meta.filename){ this.meta.filename = meta.filename || meta.uri || meta.url || ""; }
		}
		// set levels
		this.levels = {};
		var levels = logger.levels;
		for(var level in levels){
			if(levels.hasOwnProperty(level)){
				this.addLevel(levels[level], level, logger[level]);
			}
		}
	}

	Logger.prototype = {
		declaredClass: "logger/Logger",
		// main internal function, which actually logs data
		_log: function _log(name, text, condition, custom, excp){
			// check the level
			var level = this.levels[name];
			if(typeof this.filter == "number" && level < this.filter ||
					this.filter && this.filter instanceof Array &&
						(this.filter[0] > level || level >= this.filter[1]) ||
					typeof this.filter == "function" &&
						!this.filter(this, name, text, condition, custom)){
				return;
			}
			// prepare meta data
			var meta = {
					name:  name,
					level: level,
					stack: excp.stack || null,
					time:  new Date()
				};
			for(var k in this.meta){
				if(this.meta.hasOwnProperty(k) && !meta[k]){
					meta[k] = this.meta[k];
				}
			}
			// go over transports
			for(var i = 0; i < this.transports.length; ++i){
				var t = this.transports[i];
				// check the level
				if(typeof t.filter == "number" && level < t.filter ||
						t.filter && t.filter instanceof Array &&
							(t.filter[0] > level || level >= t.filter[1]) ||
						typeof t.filter == "function" &&
							!t.filter(this, name, text, condition, custom)){
					continue;
				}
				if(t.log(this, meta, text, condition, custom)){
					break;
				}
			}
		},
		// user-level methods
		addLevel: function addLevel(level, name, method){
			this.levels[name] = level;
			this[name] = method || function(text, custom){
				var t, e;
				if(text && text instanceof Error){
					t = text.message;
					e = text;
				}else{
					t = text;
					e = new Error("LOG");
				}
				this._log(name, t || "", null, custom || null, e);
			};
		},
		getLogger: function getLogger(meta){
			return new Logger(meta, this);
		}
	};

	// default logger

	return new Logger({id: "*default*"}, defaultLoggerSettings);
});

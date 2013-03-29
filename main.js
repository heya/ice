(function(factory){
	if(typeof define != "undefined"){ // AMD
		define(["module", "./transports/short", "./transports/console",
			"./transports/exception"], factory);
	}else if(typeof module != "undefined"){ // node.js
		module.exports = factory(module, require("./transports/short"),
			require("./transports/console"), require("./transports/exception"));
	}
})(function(module, shortTransport, consoleTransport, exceptionTransport){
	"use strict";

	var transports = {
			"default": [
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
		},
		levels = {
			info:     0,
			warn:   100,
			test:   200,
			assert: 300,
			error:  400
		},
		defaultLoggerSettings = {
			filter:    0,
			name:      "logger",
			transport: "default"
		};

	function Logger(meta, logger){
		logger         = logger || defaultLoggerSettings;
		this.filter    = logger.filter || 0;
		this.selfName  = logger.selfName || "logger";
		this.transport = logger.transport || "default";
		this.meta      = {};
		if(meta){
			if(meta.id)      { this.meta.id = meta.mid || meta.id || ""; }
			if(meta.filename){ this.meta.filename = meta.filename || meta.uri || meta.url || ""; }
		}
	}

	Logger.prototype = {
		declaredClass: "logger/Logger",
		Logger: Logger,
		// static methods
		getTransports: function getLoggers(){
			return transports;
		},
		getNamedTransports: function getLoggerTransports(name){
			return transports[name] || transports["default"];
		},
		setNamedTransports: function setLoggerTransports(name, newTransports){
			if(newTransports){
				transports[name] = newTransports;
			}else{
				delete transports[name];
			}
		},
		// main internal function, which actually logs data
		_log: function _log(name, text, condition, custom, excp){
			// check the level
			var level = levels[name];
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
			var transports = this.getNamedTransports(this.transport);
			for(var i = 0; i < transports.length; ++i){
				var t = transports[i];
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
		getLogger: function getLogger(meta){
			return new Logger(meta, this);
		}
	};

	function addLevel(Logger, level, name){
		Logger.prototype[name] = function(text, custom){
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
	}

	// add standard levels
	addLevel(Logger,   0, "info");
	addLevel(Logger, 100, "warn");
	addLevel(Logger, 400, "error");

	// default logger

	var logger = new Logger({id: "*default*"}, defaultLoggerSettings);

	// process configuration options, if available

	var availableTransports = {
			"short": shortTransport,
			"console": consoleTransport,
			"exception": exceptionTransport
		};

	if(typeof module.config == "function"){
		var config = module.config();
		if(config){
			if(typeof config.filter == "number" || config.filter){
				logger.filter = config.filter;
			}
			if(config.transports){
				for(var k in config.transports){
					if(config.transports.hasOwnProperty(k)){
						var t = config.transports[k], y = [];
						for(var i = 0; i < t.length; ++i){
							var x = t[i];
							if(x.log && availableTransports.hasOwnProperty(x.log)){
								y.push({filter: x.filter, log: availableTransports[x.log]});
							}
						}
						logger.setNamedTransports(k, y);
					}
				}
			}
		}
	}

	return logger;
});

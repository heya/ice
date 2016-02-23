(function(_,f,m){m={};m.id=m.filename="main.js";window.heya.ice.main=f(m,window.heya.ice.sinks.short,window.heya.ice.sinks.console,window.heya.ice.sinks.exception);})
(["module", "./sinks/short", "./sinks/console", "./sinks/exception"],
function(module, shortSink, consoleSink, exceptionSink){
	"use strict";

	var transports = {
			"default": [
				{
					filter: [0, 200],
					log:    shortSink
				},
				{
					filter: 200,
					log:    consoleSink
				},
				{
					filter: 300,
					log:    exceptionSink
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
		defaultIceSettings = {
			filter:    0,
			name:      "ice",
			transport: "default"
		};

	function Ice(meta, ice){
		ice = ice || defaultIceSettings;
		this.filter    = ice.filter || 0;
		this.selfName  = ice.selfName || "ice";
		this.transport = ice.transport || "default";
		this.meta      = {};
		if(meta){
			if(meta.id)      { this.meta.id = meta.mid || meta.id || ""; }
			if(meta.filename){ this.meta.filename = meta.filename || meta.uri || meta.url || ""; }
		}
	}

	Ice.prototype = {
		declaredClass: "ice/Ice",
		Ice: Ice,
		// static methods
		getTransports: function getTransports(){
			return transports;
		},
		getNamedTransports: function getNamedTransports(name){
			return transports[name] || transports["default"];
		},
		setNamedTransports: function setNamedTransports(name, newTransports){
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
		specialize: function specialize(meta){
			return new Ice(meta, this);
		}
	};

	function addLevel(Ice, level, name){
		Ice.prototype[name] = function(text, custom){
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
	addLevel(Ice,   0, "info");
	addLevel(Ice, 100, "warn");
	addLevel(Ice, 400, "error");

	// default ice

	var ice = new Ice({id: "*default*"}, defaultIceSettings);

	// process configuration options, if available

	var availableSinks = {
			"short": shortSink,
			"console": consoleSink,
			"exception": exceptionSink
		};

	if(typeof module.config == "function"){
		var config = module.config();
		if(config){
			if(typeof config.filter == "number" || config.filter){
				ice.filter = config.filter;
			}
			if(config.transports){
				for(var k in config.transports){
					if(config.transports.hasOwnProperty(k)){
						var t = config.transports[k], y = [];
						for(var i = 0; i < t.length; ++i){
							var x = t[i];
							if(x.log && availableSinks.hasOwnProperty(x.log)){
								y.push({filter: x.filter, log: availableSinks[x.log]});
							}
						}
						ice.setNamedTransports(k, y);
					}
				}
			}
		}
	}

	return ice;
});

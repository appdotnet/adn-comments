!function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(name, definition)
  else this[name] = definition()
}('messaging', function (ready) {

  var _ = window._ || require('lodash');
  var settings = {
    xdomain: '*',
    ie : navigator.userAgent.toLowerCase().indexOf('msie') > -1,
    scrollToTop: true
  };

  var bind = function (el, evt, func, prop) {
    if (window.addEventListener) {
      el.addEventListener(evt, func, prop);
    } else if (window.attachEvent) {
      el.attachEvent("on" + evt, func);
    }
  };


  var MessageHandler = function (conf, methods) {
    this.settings = _.extend({}, settings, conf);
    this.methods = methods;
  };

  MessageHandler.prototype.handle = function (e) {
    var matches = false;

    if (this.settings.xdomain !== '*') {
      var regex = new RegExp(this.settings.xdomain + '$');
      if (!e.origin) {
        throw new Error("messageHandler( elem, e): There is no origin.  You are viewing the page from your file system.  Please run through a web server.");
      }

      if (e.origin.match(regex)) {
        matches = true;
      } else {
        throw new Error("messageHandler( elem, e): The orgin " + e.origin + " doesn't match the responsiveiframe  xdomain "+this.settings.xdomain+".");
      }

    }

    if (this.settings.xdomain === '*' || matches) {
      var message = JSON.parse(e.data);
      var method = message.method;
      var args = message.args;
      if (!this.methods[method]) {
        throw new Error("Missing method " + method + " from handlers.");
      }

      this.methods[method].apply(window, args);
    }
    return false;
  };

  MessageHandler.prototype.send = function (method, args) {
    if (!window.parent.postMessage) {
      return;
    };

    var message = {
      method: method,
      args: args,
    };
    message = JSON.stringify(message);
    window.parent.postMessage(message, this.settings.target_url);
  };

  var initMessaging = function (conf, methods) {
    var messanger = new MessageHandler(conf, methods);

    if (window.postMessage) {
      bind(window, 'message', _.bind(messanger.handle, messanger), false);
    }

    return messanger;
  };

  return {
    initMessaging: initMessaging,
  };
});



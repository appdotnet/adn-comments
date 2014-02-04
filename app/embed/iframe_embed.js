!function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(name, definition)
  else this[name] = definition()
}('iframeEmbed', function () {

  var messaging = window.messaging;

  var ResponsiveIframe = function (messanger) {
    this.messanger = messanger;
  };

  var bind = function (el, evt, func, prop) {
    if (window.addEventListener) {
      el.addEventListener(evt, func, prop);
    } else if (window.attachEvent) {
      el.attachEvent("on" + evt, func);
    }
  };

var D = document;
var getBodyHeight = function () {

  var height;
  var scrollHeight;
  var offsetHeight;

  if (D.height) {

    height = D.height;

  } else if (D.body) {

    if (D.body.scrollHeight) {
      height = scrollHeight = D.body.scrollHeight;
    }

    if (D.body.offsetHeight) {
      height = offsetHeight = D.body.offsetHeight;
    }

    if (scrollHeight && offsetHeight) {
      height = Math.max(scrollHeight, offsetHeight);
    }
  }

  return height;
}

var getViewPortHeight = function () {

    var height = 0;

    if (window.innerHeight) {
        height = window.innerHeight - 18;
    } else if ((D.documentElement) && (D.documentElement.clientHeight)) {
        height = D.documentElement.clientHeight;
    } else if ((D.body) && (D.body.clientHeight)) {
        height = D.body.clientHeight;
    }

    return height;
}



  ResponsiveIframe.prototype.allowResponsiveEmbedding = function () {
      bind(window, 'load', _.bind(this.setHeight, this), false);
      // bind(window, 'resize', _.bind(this.setHeight, this), false);
      var _this = this;
      setInterval(function () {
        var bodyHeight = getBodyHeight();
        var viewportHeight = getViewPortHeight();
        var diff = bodyHeight - viewportHeight;
        if (diff > 50) {
          _this.setHeight();
        }
      }, 1000);
  };

  ResponsiveIframe.prototype.setHeight = function () {
    this.messanger.send('setHeight', [getBodyHeight() + 10]);
  };


  return function (config) {
    var messanger = messaging.initMessaging({
      target_url: config.target_url
    });

    return new ResponsiveIframe(messanger);
  };

});



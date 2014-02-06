'use strict';
(function () {
    // Deps
    var _ = require('lodash');
    var messaging = require('messaging');

    // Config/Option parsing
    var current_url = window.location + '';
    var config = {
        comments_root: ADN_CONFIG.app_root_url,
        comments_url: current_url,
        comments_origin: current_url,
    };

    var valid_config_keys = ADN_CONFIG.valid_config_keys.join(' ');

    local_config =  window.ADN_COMMENTS_CONFIG || {};
    config = _.extend({}, config, local_config);

    // Create query string which passes configuration options to coments widget
    var encode_config = {};
    _.forEach(config, function (val, key) {
      if (valid_config_keys.indexOf(key) < 0) {
        return;
      }
      encode_config[key] = encodeURIComponent(val);
    });
    var query_string = [];
    _.forEach(encode_config, function (val, key) {
      query_string.push(key + '=' + val);
    });
    query_string = query_string.join('&');

    // Embed the iframe that will contain the coments widget
    var scriptTag = document.getElementById('adn-comments');

    var iframeSrc = config.comments_root + '/index.html?' + query_string;
    var iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '200px';
    iframe.style.border = 'none';
    iframe.frameborder = '0';
    iframe.marginwidth = '0';
    iframe.marginheight = '0';
    iframe.scrolling = 'no';
    iframe.src = iframeSrc;
    var parent = scriptTag.parentNode;
    parent.appendChild(iframe);

    messaging.initMessaging({
        xdomain: config.comments_root,
    }, {
        setHeight: function (height) {
            iframe.style.height = height + 'px';
        }
    });

})();

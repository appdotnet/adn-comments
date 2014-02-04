'use strict';
(function () {
    var config = {
        comments_root: ADN_CONFIG.app_root_url,
        comments_url: window.location + ''
    };
    var _ = require('lodash');
    var messaging = require('messaging');
    local_config =  window.ADN_COMMENTS_CONFIG || {};
    config = _.extend({}, config, local_config);

    var domready = require('domready');
    var scriptTag = document.getElementById('adn-comments');
    // Need to embed an iframe, and when its loaded get a DOM reference to it.
    var iframeSrc = config.comments_root + '?comments_url=' + config.comments_url;
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

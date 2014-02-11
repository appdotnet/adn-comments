'use strict';

var cometApp = angular.module('cometApp', [
    'ngCookies',
    'ngSanitize',
    'ui.router',
    'angularLocalStorage',
    'adn',
    'angularFileUpload',
    'ui.bootstrap',
]);


cometApp.config(function($stateProvider, $urlRouterProvider, $rootScopeProvider, $locationProvider, $anchorScrollProvider, ADNConfigProvider) {
    $locationProvider.html5Mode(true);
    $rootScopeProvider.digestTtl(20);
    $anchorScrollProvider.disableAutoScrolling();
    // For any unmatched url, redirect to /
    // $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    // $stateProvider.state('index', {
    //     url: "/",
    //     templateUrl: "views/main.html",
    //     controller: 'MainCtrl'
    // });

    var config = {};
    $.each(ADN_CONFIG.valid_config_keys, function (i, key) {
      if (purl().param(key)) {
        config[key] = purl().param(key);
      }
    });
    ADNConfigProvider.setConfig(config);

});

// This needs to happen outside of the angular digest cycle otherwise it gets popup blocked
window.promptLogin = function() {
    window.open('/auth.html', 'auth', 'height=600,width=700');
    return false;
};

var inIframe = function () {
  try {
    return (window.self !== window.top);
  } catch (err) {
    return true;
  }
}

cometApp.run(function($rootScope, Auth, $state, $location, ADNConfig) {
    var config = {
      target_url: ADNConfig.get('comments_origin')
    };

    // If we are in an iFrame expose API
    if (inIframe()) {
      var responsiveIframe = window.iframeEmbed(config);
      responsiveIframe.allowResponsiveEmbedding();
    }

    $rootScope.auth = Auth;

    window.authCallback = function(hash) {
        var accessToken = purl('http://example.com/' + hash).fparam('access_token');
        if (accessToken) {
            Auth.login(accessToken);
            // $state.go('index');
        } else {
            //$state.go('index.login_error');
            return;
        }
    };
});

$('body').on('click', '[itemscope="https://app.net/schemas/Post"] a', function () {
  var href = $(this).attr('href');
  if (href) {
    window.top.location = href;
    return false;
  }
});

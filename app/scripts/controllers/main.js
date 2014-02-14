'use strict';

angular.module('cometApp').factory('ADN', function($http, $q, ApiClient, Auth, ADNConfig) {
    if (!Auth.currentUser().loggedIn) {
      ADNConfig.config.api_client_root = 'https://comet.app.net/stream/0/';
    }

    return {
        commentsForURL: function(url, crosspost_url) {
            var params = {
                include_annotations: 1,
            };
            if (crosspost_url) {
                params.crosspost_url = url;
            } else {
                params.links = url;
            }
            return ApiClient.get({
                url: 'posts/search',
                params: params
            });
        },
        postsForThread: function(post_id, min_id) {
            var params = {
                count: 50,
                include_annotations: 1
            };
            if (min_id) {
              params.before_id = min_id;
            }
            return ApiClient.get({
                url: 'posts/' + post_id + '/replies',
                params: params
            });
        },
        postsForUrl: function(url, min_id) {
            var params = {
                crosspost_url: url,
                annotation_types: 'com.rumproarious.comment',
                include_annotations: 1,
                count: 50
            };

            if (min_id) {
                params.before_id = min_id;
            }

            return ApiClient.get({
                url: 'posts/search',
                params: params
            });
        },
        starPost: function (postId) {
          return ApiClient.post({
            url: 'posts/' + postId + '/star',
          });
        },
        unstarPost: function (postId) {
          return ApiClient.delete({
            url: 'posts/' + postId + '/star',
          });
        },
        repostPost: function (postId) {
          return ApiClient.post({
            url: 'posts/' + postId + '/repost',
          });
        },
        unrepostPost: function (postId) {
          return ApiClient.delete({
            url: 'posts/' + postId + '/repost',
          });
        },
        dataAboutMe: function () {
          return ApiClient.get({
            url: '/users/me'
          });
        },
        getAllPostsForUrl: function (url) {
            var deferred = $q.defer();
            var _this = this;
            var posts = [];
            var get_posts = function (min_id) {
                _this.postsForUrl(url, min_id).then(function (data) {
                    var meta = data.data.meta;
                    var posts = data.data.data;
                    deferred.notify(posts);
                    if (meta.more) {
                        get_posts(meta.min_id);
                    } else {
                        deferred.resolve();
                    }
                });
            };
            get_posts();
            return deferred.promise;
        },
        getAllPostsForThreadId: function (post_id) {
            var deferred = $q.defer();
            var _this = this;
            var posts = [];
            var get_posts = function (min_id) {
                _this.postsForThread(post_id, min_id).then(function (data) {
                    var meta = data.data.meta;
                    var posts = data.data.data;
                    deferred.notify(posts);
                    if (meta.more) {
                        get_posts(meta.min_id);
                    } else {
                        deferred.resolve();
                    }
                });
            };
            get_posts();
            return deferred.promise;
        }
    }
});

angular.module('cometApp').filter('fromNow', function() {
    moment.lang('en', {
        relativeTime : {
            future: "in %s",
            past:   "%s ago",
            s:  "s",
            m:  "1m",
            mm: "%dm",
            h:  "1h",
            hh: "%dh",
            d:  "1d",
            dd: "%dd",
            M:  "1m",
            MM: "%dm",
            y:  "1y",
            yy: "%dy"
        }
    });
    return function(dateString) {
        var day_ago = moment().subtract('d', 1);
        var time = moment(dateString);
        if (time.isBefore(day_ago)) {
            return time.format('MMM D');
        } else {
            return time.fromNow(true);
        }
    };
});

angular.module('cometApp').controller('MainCtrl', function($scope, ADN, $sce, $state, ADNConfig, Auth) {

    var trusted = {};
    var hideComments = /<a href=\"[^\"]*\">see comment<\/a> \[[^\]]*\]/i;
    $scope.config = {
      default_at_reply: ADNConfig.get('default_at_reply'),
      body_font_color: ADNConfig.get('body_font_color', '#333'),
      link_font_color: ADNConfig.get('link_font_color', '#428bca'),
      accent_color: ADNConfig.get('accent_color', '#ccc'),
      font_family: ADNConfig.get('font_family', '"Helvetica Neue",Helvetica,Arial,sans-serif'),
    };
    setTimeout(function () {
      var html = $('[data-style-generator]').html();
      $('#dynamicStyle').text(html);
    }, 50);
    $scope.getSafeHtml = function(html) {
        html = html.replace(hideComments, '');
        return trusted[html] || (trusted[html] = $sce.trustAsHtml(html));
    };
    var log10 = function (val) {
      return Math.log(val) / Math.LN10;
    }
    var balance = function (num) {
      return log10(num);
    };
    var html = 'And, in fact, Ive already posted a blog post using this commenting system <a href="https://alpha.app.net/voidfiles" itemprop="mention" data-mention-id="3" data-mention-name="voidfiles">@voidfiles</a>: <a href="http://phoneboy.com/2014/01/26/comet-adn-comments-test/">http://phoneboy.com/2014/01/26/comet-adn-comments-test/</a> <a href="http://rumproarious.com/2014/01/25/comet-my-adn-hack-project/">see comment</a> [rumproarious.com]'
    var hnWeight = function(days, add, gravity) {
      add = add || 2;
      gravity = gravity || 1.8;
      // console.log('hnWeight', days, add, gravity, Math.pow((days + add), gravity));
      return Math.pow((days + add), gravity);
    };

    var scorePost = function (post) {
      var stars = (post.num_stars || 0) * 1.5;
      var replies = (post.num_replies || 0) * .5;
      var reposts = (post.num_reposts || 0) * 2;
      var followers = (post.user && post.user.counts.followers) || 1;
      var allAddedUp = Math.max((stars + replies + reposts + followers), 1);
      var score;
      if (allAddedUp < 2) {
        score = 1;
      } else {
        score = balance(allAddedUp);
      }

      // console.log(score, allAddedUp, stars, replies, reposts, followers);
      return score;
    };

    var sortByScore = function (posts) {
        var now = moment.utc();
        var posts = _.sortBy(posts, function(p) {
            var timeDiffInDays = now.diff(p.created_at_parsed, 'days');
            var weight = hnWeight(timeDiffInDays)
            var score = p.score;
            // console.log('final post score', score / weight, p.id, weight, p.score);
            return (score / weight) * -1;
        });

        return posts;
    };

    $scope.sortMethods = [
      'Newest',
      'Oldest',
      'Best'
    ];

    $scope.sortMethod = 'Newest';

    $scope.setSortMethod = function (method) {
      $scope.sortMethod = method;
    };

    $scope.posts = [];
    var postsById = {};
    $scope.allPosts = [];

    $scope.globalRootPost = false;

    var handleChildPost = function (parent, post) {
        post.localThreadId = parent.id;
        if (sort === 'reverse') {
          parent.replies.unshift(post);
        } else if (sort === 'hn') {
          parent.replies.push(post);
          parent.replies = sortByScore(parent.replies);
        } else {
          parent.replies.push(post);
        }
    };

    var indexAndUpdatePost = function (value) {
      var newPost = false;
      if (_.indexOf($scope.allPosts, value.id) === -1) {
          $scope.allPosts.push(value.id);
          newPost = true;
      }
      var current_post = postsById[value.id];

      if (current_post) {
        angular.extend(current_post, value);
        value = current_post
      } else {
        postsById[value.id] = value;
      }

      return newPost;
    };

    var addExtraData = function (value) {
      if (!value.replies) {
          value.replies = [];
      }

      if (value.deleted) {
        value.html = '<span class="muted">[deleted]</span>';
      }

      if (!value.created_at_parsed) {
        value.created_at_parsed = moment(value.created_at);
      }

      if (sort === 'hn') {
        value.score = scorePost(value);
      }

      if (value.annotations) {
          value.annotations = _.groupBy(value.annotations, function (annotation) { return annotation.type; });
      }

      if (!value.imgUrl) {
          if (value.annotations && value.annotations['net.app.core.oembed']) {

            if (value.annotations['net.app.core.oembed'][0].value.thumbnail_large_url) {
              value.imgUrl = value.annotations['net.app.core.oembed'][0].value.thumbnail_large_url;
            }
            if (value.annotations['net.app.core.oembed'][0].value.thumbnail_url) {
              value.imgUrl = value.annotations['net.app.core.oembed'][0].value.thumbnail_url;
            }
          }
      }

    };

    var setupThread = function (value) {
      // Make faux root posts all in one thread so we can use user streaming to get live updates to comments
      // var comment_annotation = value.annotations && value.annotations['com.rumproarious.comment'] && value.annotations['com.rumproarious.comment'][0].value;
      // if (comment_annotation && comment_annotation.root_post === 1) {
      //   if (!$scope.globalRootPost) {
      //     $scope.globalRootPost = value.thread_id;
      //   }

      //   value.thread_id = value.id;
      //   return;
      // }
      // if (comment_annotation && comment_annotation.thread_id) {
      //   value.thread_id = comment_annotation.thread_id;
      //   return;
      // }
    };

    var sort = 'hn';
    var missingParents = [];
    var insertIntoViewStructure = function (value) {
      if (value.thread_id === value.id) {
          value.localThreadId = value.id;
          if (sort === 'reverse') {
            $scope.posts.unshift(value);
          } else if (sort === 'hn') {
            $scope.posts.push(value);
            $scope.posts = sortByScore($scope.posts);
          } else {
            $scope.posts.push(value);
          }
      } else {
          var parent = postsById[value.thread_id];
          if (parent) {
            handleChildPost(parent, value);
          } else {
            missingParents.push(value);
          }
      }
      var stillMissing = [];
      angular.forEach(missingParents, function (value) {
        var parent = postsById[value.thread_id];
        if (parent) {
          handleChildPost(parent, value);
        } else {
          stillMissing.push(value);
        }
      });
      missingParents = stillMissing;
    };

    var addPosts = function(posts) {
        var posts = _.sortBy(posts, function(p) {
            return p.id
        });

        angular.forEach(posts, function(value) {
          var newPost = indexAndUpdatePost(value);
          addExtraData(value);
          setupThread(value);
          if (newPost) {
            insertIntoViewStructure(value);
          }
        });
    };

    $scope.showCommentBox = true;
    $scope.toggleReply = function(post) {
        if (post.showReply) {
            post.showReply = false;
        } else {
            post.showReply = true;
        }
        return false;
    };

    $scope.starPost = function (post) {
      if (!post.you_starred) {
        post.you_starred = true;
        post.num_stars += 1;
        ADN.starPost(post.id).then(function () {}, function () {
          post.you_starred = false;
          post.num_stars -= 1;
        });
      } else {
        post.you_starred = false;
        post.num_stars -= 1;
        ADN.unstarPost(post.id).then(function () {}, function () {
          post.you_starred = true;
          post.num_stars += 1;
        });
      }
      return false;
    };

    $scope.repostPost = function (post) {
      if (!post.you_reposted) {
        post.you_reposted = true;
        post.num_reposts += 1;
        ADN.repostPost(post.id).then(function () {}, function () {
          post.you_reposted = false;
          post.num_reposts -= 1;
        });
      } else {
        post.you_reposted = false;
        post.num_reposts -= 1;
        ADN.unrepostPost(post.id).then(function () {}, function () {
          post.you_reposted = true;
          post.num_reposts += 1;
        });
      }
      return false;
    };

    $scope.urlForUserFromPost = function(post) {
        return 'https://alpha.app.net/' + post.user.username;
    }

    $scope.usernameFromPost = function(post) {
        return post.user.username;
    }

    $scope.avatarFromPost = function(post) {
        return post.user.avatar_image.url;
    };

    var fetchAllPostsForThread = function (post_od) {
        ADN.getAllPostsForThreadId(post_od).then(function () {

        }, function () {}, function (posts) {
            addPosts(posts);
        });
    };

    var fetchPostData = function () {
        if (!ADNConfig.get('comments_url')) {
          return;
        }
        ADN.getAllPostsForUrl(ADNConfig.get('comments_url')).then(function () {

        }, function () {}, function (posts) {
            addPosts(posts);
            angular.forEach(posts, function (post) {
              if (post.id === post.thread_id) {
                fetchAllPostsForThread(post.id);
              }
            });
        });
    };
    $scope.userData = {};
    var getMe = function () {
      ADN.dataAboutMe().then(function (resp) {
        $scope.userData = resp.data.data;
      });
    }
    if (Auth.currentUser().loggedIn) {
      getMe();
    }
    $scope.postText = ADNConfig.get('comments_url');
    $scope.$on('login', function () {
      ADNConfig.config.api_client_root = 'https://alpha-api.app.net/stream/0/';
      fetchPostData();
      getMe();
    });
    $scope.$on('logout', fetchPostData);
    $scope.$on('new-post', function (_, post) {
        addPosts([post]);
    });
    fetchPostData();
});

angular.module('cometApp').controller('LoginModalInstanceCtrl', function ($scope, $modalInstance) {
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

cometApp.directive('cometComentBox', function () {
  return {
    restrict: 'AE',
    templateUrl: 'views/includes/commentBox.html',
    controller: function($scope, $upload, $q, $modal, ADNConfig, ApiClient, Auth) {
      var MAX_CHARS = 256;

      var resetText = function () {
        var text = '';
        if ($scope.replyToUsername) {
          text = '@' + $scope.replyToUsername + ' '
        }

        $scope.comment = {
          text: text
        };
      };

      resetText();
      $scope.auth = Auth;
      $scope.chars = $scope.comment.text.length;

      var MARKDOWN_LINK_REGEXP = /\[([^\]]+)\]\((\S+(?=\)))\)/;

      var parse_markdown_links = function (text) {
          var oldText;

          function handleReplacement(_, anchor, url, pos) {
              return anchor;
          }

          do {
              oldText = text;
              text = oldText.replace(MARKDOWN_LINK_REGEXP, handleReplacement);
          } while (text !== oldText);

          return text;
      };

      var ellipse = function(string, max_chars, ellipse) {
        max_chars = max_chars || 20;
        ellipse = ellipse || '…';
        if (string.length <= max_chars) {
          return string;
        }

        max_chars = max_chars - ellipse.length;

        string = string.slice(0, max_chars);

        return string + ellipse;

      };

      $scope.charCount = function () {
        text = parse_markdown_links($scope.comment.text);
        var count = MAX_CHARS - text.length;
        if (!$scope.replyTo) {
          var postText = ellipse($scope.postText);
          count -= (postText.length + 1);
        }
        return count;
      };

      var createPost = function (text, reply_to, file_data) {
        if (!$scope.replyTo) {
          var postText = ellipse($scope.postText);
          text = text + ' ['+ postText +'](' + $scope.postText + ')';
        }

        var comment_annotation = {
          type: 'com.rumproarious.comment',
          value: {}
        };

        if ($scope.rootPost()) {
          comment_annotation.value.root_post = 1;
        } else {
          comment_annotation.value.thread_id = $scope.threadId;
        }

        var post = {
          include_annotations: 1,
          text: text,
          entities: {
            links: [],
            parse_links: true,
            parse_markdown_links: true
          },
          annotations: [{
            type: 'net.app.core.crosspost',
            value: {
              canonical_url: ADNConfig.get('comments_url')
            }
          }, comment_annotation]
        };

        if (file_data) {
          if (file_data.kind === 'image') {
              post.annotations.push({
                  type: "net.app.core.oembed",
                  value: {
                      "+net.app.core.file": {
                          file_token: file_data.file_token,
                          format: "oembed",
                          file_id: file_data.id
                      }
                  }
              });
          } else {
              post.annotations.push({
                  type: "net.app.core.attachments",
                  value: {
                      "+net.app.core.file_list": [{
                          file_token: file_data.file_token,
                          format: "metadata",
                          file_id: file_data.data.id
                      }]
                  }
              });
          }
        }

        if ($scope.replyTo) {
          post.reply_to = $scope.replyTo;
        }

        return ApiClient.postJson({
          url: 'posts',
          data: post,
          params: {
            include_annotations: 1
          }
        });
      };

      var modalInstance;
      $scope.openLoginController = function () {

        modalInstance = $modal.open({
          templateUrl: 'views/includes/loginModalPrompt.html',
          controller: 'LoginModalInstanceCtrl',
          backdrop: false,
        });

      };

      $scope.createComment = function () {
        if (!Auth.currentUser().loggedIn) {
          $scope.openLoginController();
          return false;
        }
        $scope.creatingPost = true;
        var _create = function (fileData) {
          createPost($scope.comment.text, $scope.reply_to, fileData).then(function (data) {
            var post = data.data.data;
            resetText();
            $scope.$emit('new-post', post);
            $scope.removeFile();
            $scope.creatingPost = false;
            if (!$scope.alwaysReveal()) {
              $scope.reveal = false;
            }
          }, function () {
            $scope.creatingPost = false;
          });
        };

        // If we have some files in progress wait until they have been uplaoded
        if ($scope.hasFiles) {
          $scope.uploadStatus.promise.then(_create);
        } else {
          _create();
        }
      };

      $scope.$on('login', function () {

        if (modalInstance) {
          modalInstance.dismiss('cancel');
          $scope.createComment();
        }
      });

      $scope.removeFile = function () {
        $scope.hasFiles = false;
        $scope.uploadDone = false;
        $scope.precentDone = 0;
        if ($scope.uploadStatus) {
          $scope.uploadStatus.resolve();
        }
        $scope.uploadStatus = $q.defer();
      };

      $scope.removeFile();

      $scope.onFileSelect = function($files) {
        $scope.hasFiles = true;
        $scope.precentDone = 0;
        var file = $files[0];
        $scope.file = file;
        $scope.fileName = file.name;
        $scope.upload = $upload.upload({
          url: 'https://alpha-api.app.net/stream/0/files',
          method: 'POST',
          headers: {'Authorization': 'Bearer ' + Auth.currentUser().accessToken},
          data: {
            type: 'com.rumproarious.comment.file',
          },
          fileFormDataName: 'content',
          file: file,
          progress: function (evt) {
            $scope.precentDone = parseInt(100.0 * evt.loaded / evt.total);
          }
        }).success(function(data, status, headers, config) {
          $scope.uploadDone = true;
          $scope.uploadStatus.resolve(data.data);
        }).error(function () {
          $scope.hasFiles = false;
          $scope.precentDone = 0;
        });
      };

    },
    scope: {
      'replyTo': '=',
      'replyToUsername': '=',
      'reveal': '=',
      'alwaysReveal': '&',
      'postText': '=',
      'rootPost': '&',
      'threadId': '=',
    },
  };
});

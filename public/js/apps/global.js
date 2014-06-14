"use strict";

// Global defenition
if (typeof App != "object") {
    window.App = {}
}

App.BaseUrl = location.protocol + '//' + location.host;
App.API_BaseUrl = 'http://api.findbuzzer.local:9696/v1';
App.User = {};
App.Mustache = $.Mustache;
App.Mustache.directory = App.BaseUrl + '/mustache';


if(window.isLogin) {

  var currentUser = $.jStorage.get('current_user');

  if( _.isObject(currentUser) ) {

    App.User.session = currentUser;

    console.log(App.User.session);

  } else {
    $.ajax({
        url : App.API_BaseUrl + '/users/show'
      , type: 'GET'
      , data: {
          user_id : window.userID
        }
      , cache: true
      , async: false
      , success: function (res) {
        var data = res.data;

        App.User.session = res.data;

        $.jStorage.set("current_user", App.User.session);
      }
    });
  }
};

NProgress.configure({ ease: 'ease', speed: 500, trickle: false });
NProgress.start();

$(window).load(function() {
  // executes when complete page is fully loaded, including all frames, objects and images
  NProgress.done();
});

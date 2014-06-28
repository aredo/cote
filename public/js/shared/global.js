"use strict";

// Global defenition
if (typeof App != "object") {
    window.App = {}
}

App.BaseUrl = 'http://cdn.findbuzzer.local:8080';
App.API_BaseUrl = 'http://api.findbuzzer.local:9696/v1';
App.User = {};
App.Mustache = $.Mustache;
App.Mustache.directory = App.BaseUrl + '/mustache';
App.pageContainerId = "page"
App.brandLogoId = 'brandLogo'

// $.ajaxSetup({
//     headers: { 'Authorization': "token:" + md5('1234567') }
// });

if(window.isLogin) {

  var currentUser = $.jStorage.get('current_user');

  if( _.isObject(currentUser) ) {

    App.User.session = currentUser;

  } else {
    $.ajax({
        url : App.API_BaseUrl + '/users/show'
      , data: {
          user_id : window.userID
        }
      , cache: true
      , async: false
    })
    .done( function (res) {
      var data = res.data;

      App.User.session = res.data;

      $.jStorage.set("current_user", App.User.session);
    });
  }
};

NProgress.configure({
    ease: 'ease'
  , speed: 500
  , trickle: false
  , showSpinner: false
});

NProgress.start();

$(window).load(function() {
  // executes when complete page is fully loaded, including all frames, objects and images
  NProgress.done();
});

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

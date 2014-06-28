App.User = _.extend( App.User, {
  init: function () {
    var User = App.User;
    User.tabSettings();
    User.postUpdateProfile();

    $.Mustache.load(User.mustacheTemplateDir)
      .fail(function () {
        console.log('Failed to load templates from <code>' + User.mustacheTemplateDir + '</code>');
      })
      .done(function () {
        // for Advertiser users
        User.getUpdateProfile();
        // Self.commentProposalDeck();
      });
  },
  message: {
    update_profile : 'Your profile just updated!'
  },
  mustacheTemplateDir: App.BaseUrl + "/mustache/user/settings.mustache",
  tabSettingDOM: $('#tabSetting'),
  tabSettingContentDOM: $('#tabSettingContent'),
  tabSettings: function() {
    var hash = window.location.hash;

    hash && $('ul.nav a[href="' + hash + '"]').tab('show');

    App.User.tabSettingDOM.find('a').click(function (e) {

      $(this).tab('show');

      var scrollmem = $('body').scrollTop();

      $('body').scrollTop(scrollmem);

      try{
        window.history.pushState({}, document.title, this.hash);

      } catch(e) {
        window.location.hash = this.hash;
      }

    });
  },
  getUpdateProfile: function () {
    var user_session = App.User.session;
    var tabProfile = App.User.tabSettingContentDOM.find('div#profile');

    tabProfile.html($.Mustache.render('profileSetting', user_session));

    tabProfile.find('input.gender[value="' + user_session.gender + '"]').prop('checked', true);
    $('select[name="country"] option').filter(function() {
      return $(this).val().toUpperCase() == user_session.country;
    }).prop('selected', true);

    // bind submit events to form profile
    App.User.postUpdateProfile();
  },
  postUpdateProfile: function () {
    $('form#basicProfile').submit(function (e) {
        e.preventDefault();
      })
      .validate({
        rules: {
          username: {
            required : true
          },
          email: {
            required : true
          },
          firstname: {
            required : true
          },
          lastname: {
            required : true
          },
          country: {
            required: true
          }
        },
        submitHandler : function(form) {
          var _self = $(form);
          var dataUpdating = _self.serializeObject();
          delete  dataUpdating.submit;

          console.log(dataUpdating);

          $.ajax({
            url  : App.API_BaseUrl + '/users/update',
            type : 'POST',
            data : dataUpdating,
            beforeSend: function (xhr) {
              NProgress.start();
            }
          })
          .done( function (res) {
            NProgress.done();
            // console.log(App.User.message.update_profile)
            Notifier.show();
          })
          .fail( function (jqXHR, textStatus) {

            NProgress.done();

            Notifier.show(jqXHR.responseJSON.message, 'err');
          })
          .always(function (res) {
            NProgress.set(0.4);
          })
        } // end of submitHandler
      });
  }
});

$(function() {
  App.User.init();
});

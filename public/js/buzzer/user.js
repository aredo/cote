App.User = _.extend( App.User, {
  init: function () {
    this.settingProfile();
  },
  settingProfile: function() {
    var hash = window.location.hash;

    hash && $('ul.nav a[href="' + hash + '"]').tab('show');

    $('#tabSetting a').click(function (e) {

      $(this).tab('show');

      var scrollmem = $('body').scrollTop();

      $('body').scrollTop(scrollmem);

      window.location.hash = this.hash;

    });
  }
});

$(function() {
  App.User.init();
});

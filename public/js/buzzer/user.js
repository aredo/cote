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

      console.log(this.hash);

      try{
        window.history.pushState({}, document.title, this.hash);

      } catch(e) {
        window.location.hash = this.hash;
      }

    });
  }
});

$(function() {
  App.User.init();
});

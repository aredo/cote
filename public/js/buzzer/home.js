
var Sidebar = {
  init: function () {
    this.snapper();
    this.bindLogoClick();
    var Snapper = this.snapper();
    Snapper.off('drag');
  },
  addEvent : function addEvent(element, eventName, func) {
    if (element.addEventListener) {
        return element.addEventListener(eventName, func, false);
    } else if (element.attachEvent) {
        return element.attachEvent("on" + eventName, func);
    }
  },
  snapper: function() {
    var snapper = new Snap({
      element: document.getElementById(App.pageContainerId),
      disable: 'right',
      dragger: document.getElementById('draggerSnap'),
      maxPosition: 280,
      minPosition: -280,
    });

    return snapper;
  },
  bindLogoClick: function() {
    var Snapper = Sidebar.snapper();


    Sidebar.addEvent(document.getElementById(App.brandLogoId), 'click', function(e) {

      var stateSnap = Snapper.state();

      if(stateSnap.state === 'closed') {
        Snapper.open('left');
      } else {
        Snapper.close();
      }
      e.preventDefault();
    });
  }
}
$(function() {
  Sidebar.init();
});

"use strict";

Polymer({
  is: 'gobstones-ide',
  properties: {
    showCode: {
      type: Boolean,
      value: true
    }
  },
  listeners: {
    "show-code-changed": "_showCodeChanged",
    "show-boards-changed": "_showBoardsChanged"
  },

  buttonCssClass: function buttonCssClass(show) {
    return !show ? "button-disabled" : "";
  },

  _showCodeChanged: function _showCodeChanged(_ref) {
    var detail = _ref.detail;

    this.showCode = detail;
  },

  _showBoardsChanged: function _showBoardsChanged(_ref2) {
    var detail = _ref2.detail;

    var documentWidth = $(document).width();
    $(".panel-left").width(detail ? documentWidth * 0.6 : documentWidth);
    $(window).trigger("resize");
  }
});
"use strict";

Polymer({
  is: 'gobstones-ide',
  listeners: {
    "show-code-changed": "_showCodeChanged",
    "show-boards-changed": "_showBoardsChanged"
  },

  buttonCssClass: function buttonCssClass(show) {
    return !show ? "button-disabled" : "";
  },

  _showCodeChanged: function _showCodeChanged(_ref) {
    var detail = _ref.detail;

    this._resizeLeftPanel(detail, 0);
  },

  _showBoardsChanged: function _showBoardsChanged(_ref2) {
    var detail = _ref2.detail;

    this._resizeLeftPanel(detail, $(document).width());
  },

  _resizeLeftPanel: function _resizeLeftPanel(show, size) {
    $(".panel-left").width(show ? $(document).width() * 0.6 : size);
    $(window).trigger("resize");
  }
});
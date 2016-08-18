"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stylist = function () {
  function Stylist() {
    _classCallCheck(this, Stylist);

    this.DEFAULT_PERCENTAGE = 0.6;
    this.INITIAL_SCALE = 1;
  }

  _createClass(Stylist, [{
    key: "setPanelAsResizable",
    value: function setPanelAsResizable(panelCssClass, boardCssClass) {
      var _this = this;

      $(document).ready(function () {
        $(panelCssClass).resizable({
          resizeHeight: false
        });

        setTimeout(function () {
          $(panelCssClass + " .ui-resizable-s").hide();
          $(panelCssClass + " .ui-resizable-se").hide();

          _this.scaleBoard(_this.DEFAULT_PERCENTAGE);
        }, 0);
      });

      this.beResponsive(panelCssClass, boardCssClass);
    }
  }, {
    key: "beResponsive",
    value: function beResponsive(panelCssClass, boardCssClass) {
      var _this2 = this;

      $(window).resize(function () {
        // keep aspect ratio on window resize:
        var documentWidth = $(document).width();
        if (!_this2.lastSize) {
          _this2.lastSize = documentWidth;
          return;
        }

        var leftPanel = $(panelCssClass);
        var percentage = leftPanel.width() / _this2.lastSize;

        leftPanel.width(percentage * documentWidth);
        _this2.lastSize = documentWidth;

        // adapt board size to panel:
        // // TODO: this.scaleBoard(percentage, boardCssClass);
      });
    }
  }, {
    key: "scaleBoard",
    value: function scaleBoard(percentage, boardCssClass) {
      var scaleDiff = -(percentage / this.DEFAULT_PERCENTAGE) + 1;
      var scale = this.INITIAL_SCALE + scaleDiff;
      $(".gbs_board").css("transform", "scale(" + scale + ")");
    }
  }]);

  return Stylist;
}();
//# sourceMappingURL=stylist.js.map

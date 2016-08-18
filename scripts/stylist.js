"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stylist = function () {
  function Stylist() {
    _classCallCheck(this, Stylist);
  }

  _createClass(Stylist, [{
    key: "setPanelAsResizable",
    value: function setPanelAsResizable(cssClass) {
      $(document).ready(function () {
        $(cssClass).resizable({
          resizeHeight: false
        });

        setTimeout(function () {
          $(cssClass + " .ui-resizable-s").hide();
          $(cssClass + " .ui-resizable-se").hide();
        }, 0);
      });

      this.keepAspectRatioOnWindowResize(cssClass);
    }
  }, {
    key: "keepAspectRatioOnWindowResize",
    value: function keepAspectRatioOnWindowResize(cssClass) {
      var _this = this;

      $(window).resize(function () {
        var documentWidth = $(document).width();
        if (!_this.lastSize) {
          _this.lastSize = documentWidth;
          return;
        }

        var leftPanel = $(cssClass);
        var percentage = leftPanel.width() / _this.lastSize;

        leftPanel.width(percentage * documentWidth);
        _this.lastSize = documentWidth;
      });
    }
  }]);

  return Stylist;
}();
//# sourceMappingURL=stylist.js.map

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stylist = function () {
  function Stylist() {
    _classCallCheck(this, Stylist);

    this.DEFAULT_PERCENTAGE = 0.6;
    this.TOOLBAR_HEIGHT = 102;
    this.CELL_SIZE = 59;
    this.BOARD_CSS_CLASS = ".theBoard";
    this.BOARD_CONTAINER_CSS_CLASS = ".theBoardContainer";
    this.BOARD_CONTAINER_OFFSET = 8;
    this.BOARD_CONTAINER_VERTICAL_MARGIN = 20;
    this.LEFT_PANEL_CSS_CLASS = ".panel-left";
  }

  _createClass(Stylist, [{
    key: "setPanelAsResizable",
    value: function setPanelAsResizable(boardDimensions) {
      var _this = this;

      $(document).ready(function () {
        _this._makeResizable();
        setTimeout(function () {
          $(_this.LEFT_PANEL_CSS_CLASS + " .ui-resizable-s").hide();
          $(_this.LEFT_PANEL_CSS_CLASS + " .ui-resizable-se").hide();

          _this.updateBoardSize(boardDimensions);
        }, 0);
      });

      $(window).resize(function () {
        _this._beResponsive();
      });
    }
  }, {
    key: "updateBoardSize",
    value: function updateBoardSize(boardDimensions) {
      this._saveBoardSize(boardDimensions);
      this._beResponsive();
    }
  }, {
    key: "_beResponsive",
    value: function _beResponsive() {
      var percentage = this._keepAspectRatioOnWindowResize(this.LEFT_PANEL_CSS_CLASS);
      this._scaleAndCenterBoard(percentage);
    }
  }, {
    key: "_keepAspectRatioOnWindowResize",
    value: function _keepAspectRatioOnWindowResize() {
      var documentWidth = $(document).width();
      if (!this.lastDocumentWidth) {
        this.lastDocumentWidth = documentWidth;
        return this.DEFAULT_PERCENTAGE;
      }

      var percentage = this._getPercentage();

      var leftPanel = $(this.LEFT_PANEL_CSS_CLASS);
      leftPanel.width(documentWidth * percentage);
      this.lastDocumentWidth = documentWidth;

      return percentage;
    }
  }, {
    key: "_scaleAndCenterBoard",
    value: function _scaleAndCenterBoard(percentage) {
      var scale = this._getScale(percentage);
      $(this.BOARD_CSS_CLASS).css("transform", "scale(" + scale + ")");
      this._centerBoard(percentage, scale);
    }
  }, {
    key: "_centerBoard",
    value: function _centerBoard(percentage, scale) {
      // center vertically
      var middleY = this._getRightPanelHeight() / 2;
      var offsetY = this.currentBoardHeight / 2;
      $(this.BOARD_CSS_CLASS).css("margin-top", middleY - offsetY + "px");

      // center horizontally
      $(".theBoardContainer").width(0); // avoid increasing container width
      var panelWidth = this._getRightPanelWidth(percentage);
      var middleX = panelWidth / 2;
      var microMarginFix = -(-0.000975862 * this.boardDimensions.x + 0.131475862) * this.CELL_SIZE * scale;
      var offsetX = this.BOARD_CONTAINER_OFFSET + this.currentBoardWidth * scale / 2 + microMarginFix;

      $(this.BOARD_CONTAINER_CSS_CLASS).css("margin-left", middleX - offsetX + "px");
    }
  }, {
    key: "_makeResizable",
    value: function _makeResizable() {
      $(this.LEFT_PANEL_CSS_CLASS).resizable({
        resizeHeight: false
      });
    }
  }, {
    key: "_saveBoardSize",
    value: function _saveBoardSize(boardDimensions) {
      var boardSize = this._getBoardSize(boardDimensions);
      this.currentBoardWidth = boardSize.width;
      this.currentBoardHeight = boardSize.height;
      this.boardDimensions = boardDimensions;
    }
  }, {
    key: "_getBoardSize",
    value: function _getBoardSize(boardDimensions) {
      return {
        width: 39 + boardDimensions.x * this.CELL_SIZE,
        height: 39 + boardDimensions.y * this.CELL_SIZE
      };
    }
  }, {
    key: "_getPercentage",
    value: function _getPercentage() {
      var leftPanel = $(this.LEFT_PANEL_CSS_CLASS);
      return leftPanel.width() / this.lastDocumentWidth;
    }
  }, {
    key: "_getRightPanelWidth",
    value: function _getRightPanelWidth(percentage) {
      return $(document).width() * (1 - percentage);
    }
  }, {
    key: "_getRightPanelHeight",
    value: function _getRightPanelHeight() {
      return $(document).height() - this.TOOLBAR_HEIGHT - this.BOARD_CONTAINER_VERTICAL_MARGIN;
    }
  }, {
    key: "_getScale",
    value: function _getScale(percentage) {
      var panelWidth = this._getRightPanelWidth(percentage);
      var scaleX = panelWidth / this.currentBoardWidth;

      var panelHeight = this._getRightPanelHeight();
      var scaleY = panelHeight / this.currentBoardHeight;

      return Math.min(scaleX, scaleY);
    }
  }]);

  return Stylist;
}();
//# sourceMappingURL=stylist.js.map

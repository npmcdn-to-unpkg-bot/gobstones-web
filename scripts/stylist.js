"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stylist = function () {
  function Stylist() {
    _classCallCheck(this, Stylist);

    this.DEFAULT_PERCENTAGE = 0.6;
    this.TOOLBAR_HEIGHT = 102;
    this.BOARD_CSS_CLASS = ".theBoard";
    this.BOARD_CONTAINER_CSS_CLASS = ".theBoardContainer";
    this.BOARD_CONTAINER_OFFSET = 8;
    this.LEFT_PANEL_CSS_CLASS = ".panel-left";
  }

  _createClass(Stylist, [{
    key: "setPanelAsResizable",
    value: function setPanelAsResizable(boardDimensions) {
      var _this = this;

      var boardSize = this._getBoardSize(boardDimensions);

      $(document).ready(function () {
        _this._makeResizable();
        setTimeout(function () {
          $(_this.LEFT_PANEL_CSS_CLASS + " .ui-resizable-s").hide();
          $(_this.LEFT_PANEL_CSS_CLASS + " .ui-resizable-se").hide();

          _this._scaleAndCenterBoard(_this.DEFAULT_PERCENTAGE, boardSize);
        }, 0);
      });

      $(window).resize(function () {
        _this._beResponsive(boardSize);
      });
    }
  }, {
    key: "updateBoardSize",
    value: function updateBoardSize(boardDimensions) {
      var boardSize = this._getBoardSize(boardDimensions);

      var scale = this._getScale(this._getPercentage(), boardSize);
      this.currentBoardWidth = boardSize.width;
      this.currentBoardHeight = boardSize.height;

      this._beResponsive(boardSize);
    }
  }, {
    key: "_beResponsive",
    value: function _beResponsive(boardSize) {
      var percentage = this._keepAspectRatioOnWindowResize(this.LEFT_PANEL_CSS_CLASS);
      this._scaleAndCenterBoard(percentage, boardSize);
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
    value: function _scaleAndCenterBoard(percentage, boardSize) {
      var scale = this._getScale(percentage, boardSize);
      $(this.BOARD_CSS_CLASS).css("transform", "scale(" + scale + ")");
      this._centerBoard(percentage, boardSize, scale);
    }
  }, {
    key: "_centerBoard",
    value: function _centerBoard(percentage, boardSize, scale) {
      // center vertically
      var middleY = ($(document).height() - this.TOOLBAR_HEIGHT) / 2;
      var offsetY = this.currentBoardHeight / 2;
      $(this.BOARD_CSS_CLASS).css("margin-top", middleY - offsetY + "px");

      // center horizontally
      $(".theBoardContainer").width(0); // avoid increasing container width
      var panelWidth = this._getRightPanelWidth($(document).width(), percentage);
      var middleX = panelWidth / 2;
      var offsetX = this.BOARD_CONTAINER_OFFSET + this.currentBoardWidth * scale / 2;
      $(this.BOARD_CONTAINER_CSS_CLASS).css("margin-left", middleX - offsetX + "px");
    }
  }, {
    key: "_makeResizable",
    value: function _makeResizable() {
      var documentWidth = $(document).width();
      $(this.LEFT_PANEL_CSS_CLASS).resizable({
        resizeHeight: false
      });
    }
  }, {
    key: "_getBoardSize",
    value: function _getBoardSize(boardDimensions) {
      return {
        width: 39 + boardDimensions.x * 59,
        height: 39 + boardDimensions.y * 59
      };
    }
  }, {
    key: "_getRightPanelWidth",
    value: function _getRightPanelWidth(documentWidth, percentage) {
      return documentWidth * (1 - percentage);
    }
  }, {
    key: "_getPercentage",
    value: function _getPercentage() {
      var leftPanel = $(this.LEFT_PANEL_CSS_CLASS);
      return leftPanel.width() / this.lastDocumentWidth;
    }
  }, {
    key: "_getScale",
    value: function _getScale(percentage, boardSize) {
      // scaleY
      var documentWidth = $(document).width();
      var panelWidth = this._getRightPanelWidth(documentWidth, percentage);

      if (!this.currentBoardWidth) this.currentBoardWidth = boardSize.width;
      var scaleX = panelWidth / this.currentBoardWidth;

      // scaleY
      var documentHeight = $(document).height();
      var panelHeight = documentHeight - this.TOOLBAR_HEIGHT;
      if (!this.currentBoardHeight) this.currentBoardHeight = boardSize.height;
      var scaleY = panelHeight / this.currentBoardHeight;

      return Math.min(scaleX, scaleY);
    }
  }]);

  return Stylist;
}();
//# sourceMappingURL=stylist.js.map

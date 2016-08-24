"use strict";

Polymer({
  is: 'boards-panel',
  behaviors: [Polymer.AppLocalizeBehavior],
  properties: {
    language: { value: "es" },
    sizeX: {
      type: Number,
      value: 4,
      observer: "_updateSize"
    },
    sizeY: {
      type: Number,
      value: 4
    },
    size: {
      type: Object,
      computed: "_computeSize(sizeX, sizeY)",
      observer: "_updateSize"
    },
    selectedTab: {
      type: Number,
      value: 0
    },
    showCode: {
      type: Boolean,
      value: true
    },
    finalState: Object,
    error: Object
  },
  listeners: {
    "board-changed": "_clean"
  },

  attached: function attached() {
    this.loadResources(this.resolveUrl("../../locales.json"));
  },

  ready: function ready() {
    var _this = this;

    this.stylist = new Stylist();
    this.stylist.setPanelAsResizable(this.size);

    this._adapter = new ParserAndBoardAdapter();

    this._subscribeToEditor("execution-request", function () {
      _this._onRunRequest();
    });

    this._subscribeToEditor("execution-result", function (eventInfo) {
      _this._onResult(eventInfo);
    })._subscribeToEditor("compilation-error", function (eventInfo) {
      _this._onCompilationError(eventInfo);
    })._subscribeToEditor("execution-error", function (eventInfo) {
      _this._onExecutionError(eventInfo);
    })._subscribeToEditor("editor-dirty", function () {
      _this._clean();
    });
  },

  toggleShowCode: function toggleShowCode() {
    this.showCode = !this.showCode;
    this.fire("show-code-changed", this.showCode);
  },

  buttonCssClass: function buttonCssClass(element) {
    if (!this.domHost) return;
    return this.domHost.buttonCssClass(element);
  },

  isInitialBoardSelected: function isInitialBoardSelected(selectedTab) {
    return selectedTab === 0;
  },
  isFinalBoardSelected: function isFinalBoardSelected(selectedTab) {
    return selectedTab === 1;
  },
  isFinalBoardVisible: function isFinalBoardVisible(finalState, error) {
    return finalState || error;
  },

  _onRunRequest: function _onRunRequest() {
    this._clean();

    var initialStateEditor = this.$$("#initialStateEditor");
    var initialState = {
      header: initialStateEditor.header,
      table: this._adapter.adaptToParser(initialStateEditor.table),
      size: initialStateEditor.size
    };
    this.fire("initial-state", initialState);
  },

  _onResult: function _onResult(result) {
    var board = result.context.board();

    this._setFinalState({
      header: _.pick(board, "x", "y"),
      table: this._adapter.adaptToBoard(board.table)
    });
  },

  _onCompilationError: function _onCompilationError(error) {
    this._showToast(this.localize("the-program-has-errors"));
  },

  _onExecutionError: function _onExecutionError(error) {
    this.error = error;
    this.selectedTab = 1;
  },

  _setFinalState: function _setFinalState(finalState) {
    this.finalState = null;
    this.async(function () {
      this.finalState = finalState;
      this.selectedTab = 1;
    });
  },

  _clean: function _clean() {
    this.finalState = null;
    this.error = null;
    this.selectedTab = 0;
  },

  _showToast: function _showToast(message) {
    this.$.toast.text = message;
    this.$.toast.opened = true;
    this.$.toast.center();
  },

  _subscribeToEditor: function _subscribeToEditor(eventName, eventHandler) {
    var handler = function handler(event) {
      return eventHandler(event.detail);
    };
    this.async(function () {
      document.querySelector("#editor").addEventListener(eventName, handler);
    });
    return this;
  },

  _computeSize: function _computeSize(sizeX, sizeY) {
    var x = sizeX === "" ? this.size.x : this._limitSize(sizeX);
    var y = sizeY === "" ? this.size.y : this._limitSize(sizeY);
    if (sizeX !== "") this.sizeX = x;
    if (sizeY !== "") this.sizeY = y;
    return { x: x, y: y };
  },

  _limitSize: function _limitSize(n) {
    return Math.max(Math.min(n, 30), 1);
  },

  _updateSize: function _updateSize() {
    if (this.stylist) this.stylist.updateBoardSize(this.size);
  }
});
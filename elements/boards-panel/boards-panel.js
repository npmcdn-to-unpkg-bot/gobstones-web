"use strict";

Polymer({
  is: 'boards-panel',
  behaviors: [Polymer.AppLocalizeBehavior],
  properties: {
    finalState: Object,
    error: Object,
    language: { value: "es" }
  },
  listeners: {
    "board-changed": "_clean"
  },

  attached: function attached() {
    this.loadResources(this.resolveUrl("../locales/locales.json"));
  },

  ready: function ready() {
    var _this = this;

    new Stylist().setPanelAsResizable(".panel-left");

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

  _onRunRequest: function _onRunRequest() {
    this._clean();

    var initialStateEditor = this.$.initialStateEditor;
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
  },

  _setFinalState: function _setFinalState(finalState) {
    this.finalState = null;
    this.async(function () {
      this.finalState = finalState;
    });
  },

  _clean: function _clean() {
    this.finalState = null;
    this.error = null;
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
  }
});
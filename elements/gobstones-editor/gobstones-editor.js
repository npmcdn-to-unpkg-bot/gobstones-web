"use strict";

Polymer({
  is: "gobstones-editor",
  listeners: {
    "ace.editor-content": "onContentChange"
  },

  ready: function ready() {
    var _this = this;

    this._subscribeToBoards("initial-state", function (eventInfo) {
      _this._runCode(eventInfo.detail);
    });

    this.editor = this.$.ace.editor;
    this.parser = new Parser();

    this._setFatalities();
    this._subscribeToChangeEvents();

    this.stylist = new Stylist();
    this.setSize(14);
    $(window).resize(function () {
      _this._fixEditorHeight();
    });
  },

  onContentChange: function onContentChange(content) {
    var value = content.detail.value;
  },

  onRunCode: function onRunCode() {
    this.fire("execution-request");
  },

  setSize: function setSize(newSize) {
    var _this2 = this;

    this.customStyle["--editor-size"] = newSize + "px";
    this.updateStyles();
    setTimeout(function () {
      _this2._fixEditorHeight();
    }, 500);
  },

  _runCode: function _runCode(initialState) {
    this.editor.getSession().clearAnnotations();
    var sourceCode = this.editor.getValue();

    var ast = this._parse(sourceCode);
    if (ast.error) return;
    var context = this._interpret(ast, initialState);
    if (context.error || context.on) return;

    this.fire("execution-result", { context: context });
  },

  _parse: function _parse(sourceCode) {
    try {
      return this.parser.parse(sourceCode);
    } catch (e) {
      // Parser errors
      this._reportError(e, e.error);

      // var AceRange = ace.require('ace/range').Range;
      // this.editor.getSession().addMarker(new AceRange(e.on.range.start.row, e.on.range.start.column, e.on.range.end.row, e.on.range.end.column), "error-line", "fullLine", true)

      this.fire("compilation-error", e.error);
      return e;
    }
  },

  _interpret: function _interpret(ast, initialState) {
    try {
      return this.parser.interpret(ast, initialState);
    } catch (e) {
      // Runtime errors
      if (e.error) this._reportError(e, e.error);

      // Business errors
      if (e.on) this._reportError(e, e.message);

      this.fire("execution-error", e.message);
      return e;
    }
  },

  _reportError: function _reportError(e, message) {
    this.editor.getSession().setAnnotations([{
      row: e.on.range.start.row,
      column: 0,
      text: message,
      type: "error"
    }]);
  },

  _subscribeToBoards: function _subscribeToBoards(eventName, eventHandler) {
    this.async(function () {
      document.querySelector("#boards").addEventListener(eventName, eventHandler);
    });
  },

  _subscribeToChangeEvents: function _subscribeToChangeEvents() {
    var _this3 = this;

    this.editor.getSession().on("change", function () {
      _this3.editor.getSession().setAnnotations([]);
      _this3.fire("editor-dirty");
    });
  },

  _setFatalities: function _setFatalities() {
    var _this4 = this;

    var ace = this.$.ace;
    ace.editor.commands.addCommand({
      name: "run-code",
      bindKey: { win: "ctrl+enter", mac: "command+enter" },
      exec: function exec() {
        _this4.onRunCode();
      }
    });
  },

  _fixEditorHeight: function _fixEditorHeight() {
    this.stylist.correctEditorHeight(this.editor);
  }
});
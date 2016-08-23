"use strict";

Polymer({
  is: 'left-menu',
  behaviors: [Polymer.AppLocalizeBehavior],
  properties: {
    language: { value: "es" }
  },

  attached: function attached() {
    this.loadResources(this.resolveUrl("../../locales.json"));
  },

  saveProgram: function saveProgram() {
    var code = this._getEditorElement().editor.getValue();
    this._saveFile(code, "program.gbs");
  },

  loadProgram: function loadProgram() {
    $("#fileToOpen").click();
  },

  onSelectFile: function onSelectFile(event) {
    var _this = this;

    this._readFile(event, function (code) {
      var editorElement = _this._getEditorElement();
      editorElement.editor.setValue(code);
      editorElement.onRunCode();
      $("paper-drawer-panel")[0].togglePanel();
    });
  },

  _saveFile: function _saveFile(content, name) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
  },

  _readFile: function _readFile(event, callback) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function () {
      var content = reader.result;
      callback(content);
    };
    reader.readAsText(input.files[0]);
  },

  _getEditorElement: function _getEditorElement() {
    return document.querySelector("#editor");
  }
});
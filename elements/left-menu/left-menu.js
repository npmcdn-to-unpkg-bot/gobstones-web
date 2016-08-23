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
    var editor = this._getEditor().editor;
    var code = editor.getValue();
    this._saveFile(code, "program.gbs");
  },

  loadProgram: function loadProgram() {
    alert("// TODO");
  },

  _saveFile: function _saveFile(content, name) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
  },

  _getEditor: function _getEditor() {
    return document.querySelector("#editor");
  }
});
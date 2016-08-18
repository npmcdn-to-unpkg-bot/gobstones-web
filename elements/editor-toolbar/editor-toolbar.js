"use strict";

Polymer({
  is: 'editor-toolbar',
  properties: {
    editorSize: {
      type: Number,
      value: 12
    }
  },

  ready: function ready() {
    this.HOP_SIZE = 3;
  },

  togglePanel: function togglePanel() {
    $("paper-drawer-panel")[0].togglePanel();
  },

  moreSize: function moreSize() {
    this.editorSize += this.HOP_SIZE;
    this._updateSize();
  },

  lessSize: function lessSize() {
    this.editorSize -= this.HOP_SIZE;
    this._updateSize();
  },

  _updateSize: function _updateSize() {
    if (this.editorSize <= 8) return;
    document.querySelector("#editor").setSize(this.editorSize);
  }
});
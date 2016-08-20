"use strict";

Polymer({
  is: 'editor-toolbar',
  properties: {
    editorSize: {
      type: Number,
      value: 12
    },
    showBoards: {
      type: Boolean,
      value: true
    }
  },

  ready: function ready() {
    this.HOP_SIZE = 3;
  },

  togglePanel: function togglePanel() {
    $("paper-drawer-panel")[0].togglePanel();
  },

  toggleShowBoards: function toggleShowBoards() {
    this.showBoards = !this.showBoards;
    this.fire("show-boards-changed", this.showBoards);
  },

  buttonCssClass: function buttonCssClass(element) {
    if (!this.domHost) return;
    return this.domHost.buttonCssClass(element);
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
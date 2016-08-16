"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parser = function () {
  function Parser() {
    _classCallCheck(this, Parser);

    var _window$gsWeblangCore = window.gsWeblangCore;
    var tokens = _window$gsWeblangCore.tokens;
    var interpreter = _window$gsWeblangCore.interpreter;
    var Lexer = _window$gsWeblangCore.lexer;
    var _Parser = _window$gsWeblangCore.parser;
    var Grammar = _window$gsWeblangCore.grammar;
    var Context = _window$gsWeblangCore.context;


    this.Context = Context;
    this.grammar = Grammar(_Parser, new Lexer(), tokens, interpreter);
  }

  _createClass(Parser, [{
    key: "parse",
    value: function parse(sourceCode) {
      return this.grammar.parseProgram(sourceCode);
    }
  }, {
    key: "interpret",
    value: function interpret(ast, initialState) {
      var context = this._createContext(initialState);
      this.grammar.interpret(ast, context);
      return context;
    }
  }, {
    key: "_createContext",
    value: function _createContext(initialState) {
      var context = new this.Context();
      context.board().sizeX = initialState.size.x;
      context.board().sizeY = initialState.size.y;
      context.init();

      _.assign(context.board(), {
        x: initialState.header.x,
        y: initialState.header.y,
        table: initialState.table
      });

      return context;
    }
  }]);

  return Parser;
}();
//# sourceMappingURL=parser.js.map

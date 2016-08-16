"use strict";

var editor = ace.edit("editor");
editor.setTheme("ace/theme/chrome");
editor.session.setMode("ace/mode/gobstones");
editor.getSession().setTabSize(4);
editor.setHighlightActiveLine(false);

(function () {

  function go(source) {
    var tokens = gsWeblangCore.tokens;
    var interpreter = gsWeblangCore.interpreter;
    var Lexer = gsWeblangCore.lexer;
    var Parser = gsWeblangCore.parser;
    var Grammar = gsWeblangCore.grammar;
    var Context = gsWeblangCore.context;

    var grammar = Grammar(Parser, new Lexer(), tokens, interpreter);
    var g = grammar(Parser, new Lexer(), tokens, interpreter);
    editor.getSession().clearAnnotations();

    var context = new Context();
    context.init();
    try {
      var ast = grammar.parseProgram(sourceCode);
      console.log(source);
      console.log(ast);
      try {
        grammar.interpret(ast, context);
      } catch (e) {
        console.log("INTERPRETER ERROR: ", e);
      }

      var string = context.board().printAscii();
      document.getElementById('result').innerHTML = string.replace(/&/g, '&amp;').replace(/[<]/g, '&lt;');
    } catch (e) {
      if (e) {
        console.log("CATCHED PARSER ERROR: ", e);
        editor.getSession().setAnnotations([{
          row: e.on.row,
          column: 0,
          text: e.error,
          type: "error" // also warning and information
        }]);
      }
    }
  }

  editor.on("input", function () {
    go(editor.getValue());
  });
})();
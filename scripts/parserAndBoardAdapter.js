"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParserAndBoardAdapter = function () {
  function ParserAndBoardAdapter() {
    _classCallCheck(this, ParserAndBoardAdapter);
  }

  _createClass(ParserAndBoardAdapter, [{
    key: "adaptToBoard",
    value: function adaptToBoard(table) {
      var mapColor = function mapColor(index, color) {
        return table[index].map(function (rows) {
          return rows.map(function (amount) {
            var cell = {};
            cell[color] = amount;
            return cell;
          });
        });
      };

      var blueColumns = mapColor(0, "blue");
      var redColumns = mapColor(1, "red");
      var blackColumns = mapColor(2, "black");
      var greenColumns = mapColor(3, "green");

      return _(blueColumns).zipWith(redColumns, blackColumns, greenColumns, _.merge).unzip().reverse().value();
    }
  }, {
    key: "adaptToParser",
    value: function adaptToParser(table) {
      var transposeOfTable = _(_.cloneDeep(table)).reverse().unzip().value();

      var unmapColor = function unmapColor(color) {
        return transposeOfTable.map(function (rows) {
          return rows.map(function (cell) {
            return cell[color];
          });
        });
      };

      return [unmapColor("blue"), unmapColor("red"), unmapColor("black"), unmapColor("green")];
    }
  }]);

  return ParserAndBoardAdapter;
}();
//# sourceMappingURL=parserAndBoardAdapter.js.map

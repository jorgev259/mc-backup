"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _uuid = require("uuid");

var _admZip = _interopRequireDefault(require("adm-zip"));

var date = new Date();

var _process$argv$slice = process.argv.slice(2),
    _process$argv$slice2 = (0, _slicedToArray2["default"])(_process$argv$slice, 3),
    _process$argv$slice2$ = _process$argv$slice2[0],
    input = _process$argv$slice2$ === void 0 ? 'input' : _process$argv$slice2$,
    _process$argv$slice2$2 = _process$argv$slice2[1],
    output = _process$argv$slice2$2 === void 0 ? 'output' : _process$argv$slice2$2,
    _process$argv$slice2$3 = _process$argv$slice2[2],
    name = _process$argv$slice2$3 === void 0 ? 'test' : _process$argv$slice2$3;

var id = (0, _uuid.v4)();

var inputFolder = _path["default"].resolve(input);

var tempFolder = _path["default"].resolve('./temp', id);

_fsExtra["default"].ensureDirSync(tempFolder);

_fsExtra["default"].copy(inputFolder, tempFolder).then( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var deleteFolders, zip, filename;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          deleteFolders = ['cache', 'crash-reports', 'logs', 'temp'];
          _context.next = 3;
          return Promise.all(deleteFolders.map(function (f) {
            return _fsExtra["default"].remove(_path["default"].join(tempFolder, f));
          }));

        case 3:
          zip = new _admZip["default"]();
          zip.addLocalFolder(tempFolder);
          filename = "".concat(date.getFullYear(), "-").concat(('0' + (date.getMonth() + 1)).slice(-2), "-").concat(('0' + date.getDate()).slice(-2), "_").concat(name, ".zip");
          zip.writeZip(_path["default"].resolve(output, filename), function (err) {
            if (err) throw new Error(err);

            _fsExtra["default"].removeSync(tempFolder);
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
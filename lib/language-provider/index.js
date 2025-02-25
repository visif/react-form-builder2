"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AppLanguages = void 0;
var _enUs = _interopRequireDefault(require("./entries/en-us"));
var _faIr = _interopRequireDefault(require("./entries/fa-ir"));
var _itIt = _interopRequireDefault(require("./entries/it-it"));
var _viVn = _interopRequireDefault(require("./entries/vi-vn"));
var AppLanguages = [{
  languageId: 'vietnamese',
  locale: 'vi',
  name: 'Vietnamese',
  icon: 'vn'
}, {
  languageId: 'english',
  locale: 'en',
  name: 'English',
  icon: 'us'
}, {
  languageId: 'italian',
  locale: 'it',
  name: 'Italiano',
  icon: 'it'
}, {
  languageId: 'persian',
  locale: 'ir',
  name: 'farsi',
  icon: 'ir'
}];
exports.AppLanguages = AppLanguages;
var AppLocale = {
  en: _enUs.default,
  vi: _viVn.default,
  it: _itIt.default,
  fa: _faIr.default
};
var _default = AppLocale;
exports.default = _default;
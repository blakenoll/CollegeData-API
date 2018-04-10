'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _casual = require('casual');

var _casual2 = _interopRequireDefault(_casual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mocks = {
  String: function String() {
    return 'It works!';
  },
  Query: function Query() {
    return {
      author: function author(root, args) {
        return { firstName: args.firstName, lastName: args.lastName };
      }
    };
  },
  Author: function Author() {
    return { firstName: function firstName() {
        return _casual2.default.first_name;
      }, lastName: function lastName() {
        return _casual2.default.last_name;
      } };
  },
  Post: function Post() {
    return { title: _casual2.default.title, text: _casual2.default.sentences(3) };
  }
};

exports.default = mocks;
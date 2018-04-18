'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connectors = require('./connectors');

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolvers = {
  Query: {
    allSchools: function allSchools(_, args) {
      return _connectors.GetSchools.getAll(args);
    }
  },

  School: {
    cost: function cost(School) {
      return School['2015.cost.attendance.academic_year'];
    },
    name: function name(School) {
      return School['school.name'];
    },
    city: function city(School) {
      return School['school.city'];
    },
    admissRate: function admissRate(School) {
      return School['2015.admissions.admission_rate.overall'] * 100;
    },
    url: function url(School) {
      return School['school.school_url'];
    }
  }
};

exports.default = resolvers;
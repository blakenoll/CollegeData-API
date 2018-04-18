'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetSchools = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _nodeGeocoder = require('node-geocoder');

var _nodeGeocoder2 = _interopRequireDefault(_nodeGeocoder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// REST API integration for Department of Education
var baseURL = 'https://api.data.gov/ed/collegescorecard/v1/schools?';
var apiKey = '&api_key=dM8fcIUTRoq9ieuaPORfcjGilVhjzsOoXTB2p0SB';

var options = {
  provider: 'google',
  apiKey: 'AIzaSyDOLHdOrsHQam6jC2bh1nWUYwiqMZBr35s'
};

var geocoder = (0, _nodeGeocoder2.default)(options);

// function to retrieve schools from scorecard
var GetSchools = {
  getAll: function getAll(args) {
    var schoolCity = args.city ? encodeURIComponent(args.city) : "";
    var schoolName = args.name ? encodeURIComponent(args.name) : "";
    var latitude = void 0,
        longitude = void 0;

    return geocoder.geocode(args.city).then(function (res) {
      console.log(res, res[0].latitude, res[0].longitude);
      var _res$ = res[0],
          latitude = _res$.latitude,
          longitude = _res$.longitude;

      console.log(latitude);
      return latitude, longitude;
    }).then(function (latitude, longitude) {
      console.log(latitude);
      return (0, _nodeFetch2.default)(baseURL + 'school.city=' + schoolCity + '&school.name=' + schoolName + '&school.degrees_awarded.predominant=3,4&2015.cost.attendance.academic_year__not=0&fields=id,school.name,school.city,2015.cost.attendance.academic_year,2015.admissions.admission_rate.overall,school.school_url&per_page=100&sort=school.name' + apiKey).then(function (res) {
        return res.json();
      }).then(function (res) {
        // console.log(res.results);
        return res.results;
      });
    });
  }
};

exports.GetSchools = GetSchools;
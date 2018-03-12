'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetSchools = exports.Post = exports.Author = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _casual = require('casual');

var _casual2 = _interopRequireDefault(_casual);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _nodeGeocoder = require('node-geocoder');

var _nodeGeocoder2 = _interopRequireDefault(_nodeGeocoder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = new _sequelize2.default('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite'
});

var AuthorModel = db.define('author', {
  firstName: { type: _sequelize2.default.STRING },
  lastName: { type: _sequelize2.default.STRING }
});

var PostModel = db.define('post', {
  title: { type: _sequelize2.default.STRING },
  text: { type: _sequelize2.default.STRING }
});

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

// create mock data with a seed
// casual.seed(123);

// db.sync({ force: true }).then(() => {
//   _.times(10, () => {
//     return AuthorModel.create({ 
//       firstName: casual.first_name,
//       lastName: casual.last_name,
//     }).then((author) => {
//       return author.createPost({
//         title: `A post by ${author.firstName}`,
//         text: casual.sentences(3),
//       });
//     });
//   });
// });

var Author = db.models.author;
var Post = db.models.post;

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
  getOne: function getOne(args) {
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

exports.Author = Author;
exports.Post = Post;
exports.GetSchools = GetSchools;
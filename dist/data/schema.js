'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTools = require('graphql-tools');

var _resolvers = require('./resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import mocks from './mocks';

var typeDefs = '\ntype Query {\n  author(firstName: String, lastName: String): Author\n  allAuthors: [Author]\n  allSchools(city: String, name: String, zipcode: Int): [School]\n  testString: String\n}\n\ntype Author {\n  id: Int\n  firstName: String\n  lastName: String\n  posts: [Post]\n}\n\ntype Post {\n  id: Int\n  title: String\n  text: String\n  views: Int\n  author: Author\n}\n\ntype School {\n  id: Int\n  name: String\n  city: String\n  cost: Int\n  admissRate: Float\n  url: String\n}\n\n';

var schema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs: typeDefs, resolvers: _resolvers2.default });

// addMockFunctionsToSchema({ schema, mocks });

exports.default = schema;
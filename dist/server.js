'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _apolloServerExpress = require('apollo-server-express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _schema = require('./data/schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GRAPHQL_PORT = 3001;

var graphQLServer = (0, _express2.default)();

graphQLServer.use((0, _cors2.default)());
graphQLServer.use('/graphql', _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)({ schema: _schema2.default }));
graphQLServer.use('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({ endpointURL: '/graphql' }));
graphQLServer.use('/', (0, _apolloServerExpress.graphiqlExpress)({ endpointURL: '/graphql' }));

graphQLServer.listen(process.env.PORT, function () {
  return console.log('GraphiQL is now running on http://localhost:' + process.env.PORT + '/graphiql');
});
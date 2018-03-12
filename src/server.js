import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './data/schema';

const GRAPHQL_PORT = 3001;

const graphQLServer = express();


graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
graphQLServer.use('/', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(process.env.PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${process.env.PORT}/graphiql`
  )
);

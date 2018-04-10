import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './resolvers'
// import mocks from './mocks';

const typeDefs = `
type Query {
  allSchools(city: String, name: String, zipcode: Int): [School]
}

type School {
  id: Int
  name: String
  city: String
  cost: Int
  admissRate: Float
  url: String
}

`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// addMockFunctionsToSchema({ schema, mocks });

export default schema;

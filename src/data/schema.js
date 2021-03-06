import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './resolvers'

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

export default schema;

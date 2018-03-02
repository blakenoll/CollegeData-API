import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './resolvers'
// import mocks from './mocks';

const typeDefs = `
type Query {
  author(firstName: String, lastName: String,): Author
  allAuthors: [Author]
  allSchools(city: String): [School]
  testString: String
}

type Author {
  id: Int
  firstName: String
  lastName: String
  posts: [Post]
}

type Post {
  id: Int
  title: String
  text: String
  views: Int
  author: Author
}

type School {
  id: Int
  school_name: String
  school_city: String
}

`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// addMockFunctionsToSchema({ schema, mocks });

export default schema;

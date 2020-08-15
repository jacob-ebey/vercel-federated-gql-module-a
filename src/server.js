import { buildFederatedSchema } from "@apollo/federation";
import { ApolloServer, gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    pingFederatedModule: String!
  }
`;

const resolvers = {
  Query: {
    pingFederatedModule: () => "pong"
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema({
    resolvers,
    typeDefs,
  }),
  subscriptions: false,
  introspection: true,
  playground: true
});

export default server;

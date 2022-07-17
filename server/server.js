import { ApolloServer } from "apollo-server";

import queries from "./typedefs-resolvers/queries.js";
import mutations from "./typedefs-resolvers/mutations.js";
import * as types from "./typedefs-resolvers/resolvers.js";

const typeDefs = [
  queries,
  mutations,
  types.resolverTypeDefs,
];

const resolvers = [
  types.resolver,
];

const server = new ApolloServer({ typeDefs, resolvers });

server.listen()
  .then(({ url }) => console.log(url));
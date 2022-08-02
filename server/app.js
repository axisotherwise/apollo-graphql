import { ApolloServer } from "apollo-server";

import queries from "./typedefs-resolvers/queries.js";
import mutations from "./typedefs-resolvers/mutations.js";
import * as types from "./typedefs-resolvers/user-resolver.js";

const typeDefs = [
  queries,
  mutations,
  types.resolverTypeDefs,
];

const resolvers = [
  types.resolver,
];

export default new ApolloServer({
  typeDefs,
  resolvers,
  cache: "bounded",
  formatError: (err) => {
    console.error(er);
  },
});
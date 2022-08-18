import { ApolloServer, gql } from "apollo-server";

import queries from "./typedefs-resolvers/queries.js";
import mutations from "./typedefs-resolvers/mutations.js";
import * as userResolver from "./typedefs-resolvers/user-resolver.js"; 

const typeDefs = [
  queries,
  mutations,
  userResolver.resolverTypeDefs,
];

const resolvers = [
  userResolver.resolver,
];

export default new ApolloServer({
  typeDefs,
  resolvers,
  cache: "bounded",
  formatError: (err) => {
    if (!err.originalError) return err;
    return {
      status: err.originalError.status,
      message: err.originalError.message, 
    };
  },
});
import express from "express";
import morgan from "morgan";
import chalk from "chalk";

import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { GraphQLUpload, graphqlUploadExpress } from "graphql-upload";

import queries from "./typedefs-resolvers/queries.js";
import mutations from "./typedefs-resolvers/mutations.js";
import * as userResolver from "./typedefs-resolvers/user-resolver.js"; 
import * as postResolver from "./typedefs-resolvers/post-resolver.js";

import context from "./context/verify.js";

const app = express();

app.set("port", process.env.NODE_ENV || 4000);

const path = "/graphql";

const typeDefs = [
  queries,
  mutations,
  userResolver.resolverTypeDefs,
  postResolver.resolverTypeDefs,
];

const resolvers = [
  userResolver.resolver,
  postResolver.resolver,
];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: "bounded",
  path: "/graphql",
  playGround: true,
  context,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault,
  ],
  formatError: (err) => {
    if (!err.originalError) return err;
    return {
      status: err.originalError.status,
      message: err.originalError.message,
    };
  },
});

await server.start();

server.applyMiddleware({
  app,
  path,
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.use(morgan("dev"));

app.listen(app.get("port"), () => console.log(chalk.bgMagentaBright("APOLLO-SERVER-EXPRESS START")));


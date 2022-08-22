import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    getUsers: [User!]
    getPosts: Posts!
  }
`;

export default typeDefs;
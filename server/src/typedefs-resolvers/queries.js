import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    getUsers: [Users!]
    getPost: Post!
    getPosts: [Posts!]
  }
`;

export default typeDefs;
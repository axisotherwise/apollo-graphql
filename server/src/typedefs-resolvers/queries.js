import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    getUsers: [User!]
    getPost(userInput: Int): [Post!]
    getPosts: [Posts!]
  }
`;

export default typeDefs;
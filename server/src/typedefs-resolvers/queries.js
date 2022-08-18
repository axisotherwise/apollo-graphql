import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    getUser: UserDetail
    getPosts: Posts!
  }
`;

export default typeDefs;
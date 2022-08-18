import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    getUser: UserDetail
  }
`;

export default typeDefs;
import { gql } from "apollo-server";

const typeDefs = gql`
  type Mutation {
    createUser(email: String, name: String): [User]
  }
`;

export default typeDefs;
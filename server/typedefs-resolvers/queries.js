import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    user: [User]
  }
`

export default typeDefs;
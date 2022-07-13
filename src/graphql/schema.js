import { buildSchema } from "graphql";

export default buildSchema(`
  type User {
    id: Int!
    email: String!
    name: String!
    createdAt: String
    updatedAt: String
  }

  type AuthData {
    token: String!
    email: String!
  }

  input UserInputData {
    email: String!
    name: String!
    password: String!
  }

  type RootQuery {
    login(email: String! password: String!): AuthData!
  }

  type RootMutation {
    createUser(userInput: UserInputData): User!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
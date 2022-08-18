import { gql } from "apollo-server";

const typeDefs = gql`
  type Mutation {
    createUser(userInput: UserInputData): User!
  } 
`;

// const typeDefs = gql`
//   type Mutation {
//     createUser(
//       email: String,
//       name: String,
//       password: String,
//       gender: String,
//       address: String
//     ): User!
//   } 
// `;

export default typeDefs;
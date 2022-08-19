import { gql } from "apollo-server";

const typeDefs = gql`
  type Mutation {
    createUser(userInput: UserInputData): [User]!
    createPost(userInput: PostInputData): Post!
    userLogin(userInput: UserLoginData): LoginResult
  }
`;

export default typeDefs;
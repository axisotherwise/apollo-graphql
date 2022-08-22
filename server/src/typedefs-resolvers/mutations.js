import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Mutation {
    createUser(userInput: UserInputData): [User]!
    createPost(userInput: PostInputData): Post!
    userLogin(userInput: UserLoginData): LoginResult
    uploadImage(userInput: UploadInputData): File!
  }
`;

export default typeDefs;
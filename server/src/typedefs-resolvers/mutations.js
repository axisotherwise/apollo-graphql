import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Mutation {
    createUser(userInput: UserInputData): [User]!
    createPost(userInput: PostInputData): PostResult
    createComment(userInput: CommentInputData): CommentResult
    userLogin(userInput: UserLoginData): LoginResult
  }
`;

export default typeDefs;
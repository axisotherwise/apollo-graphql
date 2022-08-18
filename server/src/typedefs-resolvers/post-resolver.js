import { gql } from "apollo-server";

const resolverTypeDefs = gql`
  type Posts {
    postId: Int!
    title: String!
    content: String!
    image: String!
    writer: String!
  }

  type Post {
    postId: Int!
  }

  input PostInputData {
    title: String
    content: String
    image: String!
    userId: Int
  }
`;

const resolver = {
  Query: {
    getPosts: async () => {
      try {
        return {
          postId: 1,
          title: "title",
          content: "content",
          image: "image",
          writer: "writer",
        };
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  },
  Mutation: {
    createPost: async (parent, { userInput }) => {
      try {
        console.log(userInput);
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  },
};

export {
  resolverTypeDefs,
  resolver,
};
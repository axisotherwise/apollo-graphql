import { gql } from "apollo-server";
import { GraphQLUpload } from "graphql-upload";

const resolverTypeDefs = gql`
  scalar Upload
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
  type File {
    id: Int
    filename: String
    mimetype: String
    encoding: String
  }
  input PostInputData {
    title: String
    content: String
    image: String!
    userId: Int
  }
  input UploadInputData {
    files: Upload!
  }
`;

const resolver = {
  Upload: GraphQLUpload,
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
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    uploadImage: async (parent, { file }) => {
      const result = await file;
      console.log(result);
    },
  },
};

export {
  resolverTypeDefs,
  resolver,
};
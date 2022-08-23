import { gql } from "apollo-server";
import { GraphQLUpload } from "graphql-upload";

import * as userService from "../services/user-service.js";
import * as postService from "../services/post-service.js";
import * as t from "../services/transaction-service.js";

const resolverTypeDefs = gql`
  type PostResult {
    success: Boolean
    message: String
    data: Data!
  }

  type Data {
    data: String!
  }
  
  type Post {
    post: [PostDetail!]
    comments: [Comments!]
  }

  type PostDetail {
    postId: Int!
    title: String!
    content: String!
  }

  type Comments {
    commentId: Int!
    comment: String!
    writer: String!
  }

  type Posts {
    post_id: Int!
    title: String!
    content: String!
    fk_user_email: String!
    image: String!
  }
  
  input PostInputData {
    title: String
    content: String
    image: String!
  }
`;

const resolver = {
  Query: {
    getPost: async (_, { userInput }) => {
      if (!userInput) {
        const error = new Error("게시글 없음");
        error.status = 418;
        throw error;
      }
      try {
        const post = await postService.getPost(userInput);
        const content = [];
        const comments = [];
        content.push({
          postId: post[0].post_id,
          title: post[0].title,
          content: post[0].content,
        });
        for (const [i, e] of post.entries(post)) {
          comments.push({
            commentId: e.comment_id,
            comment: e.comment,
            writer: e.fk_user_email,
          });
        }
        return {
          content,
          comments,
        };
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    getPosts: async () => {
      try {
        const posts = await postService.getPosts();
        const arr = [];
        posts.map(e => arr.push(e));
        return arr;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  },
  Mutation: {
    createPost: async (_, { userInput }, { user }) => {
      if (!user) {
        const error = new Error("노 유저");
        error.status = 418;
        throw error;
      }
      try {
        const post = await postService.createPost(
          userInput.title,
          userInput.content,
          userInput.image,
          user.email,
        );
        return {
          success: true,
          message: "성공",
        };
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
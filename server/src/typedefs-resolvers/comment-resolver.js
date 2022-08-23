import { gql } from "apollo-server";

import * as userService from "../services/user-service.js";
import * as postService from "../services/post-service.js";
import * as commentService from "../services/comment-service.js";

const resolverTypeDefs = gql`
  type CommentResult {
    success: Boolean!
    message: String!
  }
  input CommentInputData {
    comment: String
    fk_post_id: Int
  }
`;

const resolver = {
  Query: {

  },
  Mutation: {
    createComment: async (_, { userInput }, context, __) => {
      try {
        const exist = await postService.getPost(userInput.fk_post_id);
        if (exist.length <= 0) {
          const error = new Error("게시글 없음");
          error.status = 418;
          throw error;
        }
        const comment = await commentService.createComment(
          userInput.comment,
          context.user.email,
          userInput.fk_post_id
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
import db from "../db/index.js";

import * as postQuery from "../queries/post-query.js";

const conn = await db;

const getPost = async (postId) => {
  try {
    const [ post ] = await conn.query(
      postQuery.readPost,
      postId
    );
    return post;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getPosts = async () => {
  try {
    const [ posts ] = await conn.query(
      postQuery.readPosts
    );
    return posts;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const createPost = async (...result) => {
  try {
    const [ post ] = await conn.query(
      postQuery.createPost,
      result
    );
    return post;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export {
  getPost,
  getPosts,
  createPost,
};
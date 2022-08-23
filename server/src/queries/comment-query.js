const createComment = `
  INSERT INTO
    comment
    (comment, fk_user_email, fk_post_id)
  VALUES
    (?, ?, ?)
`;

export {
  createComment,
};
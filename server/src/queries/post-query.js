const readPost = `
  SELECT 
    P.post_id, P.title, P.content, P.fk_user_email, P.image
  FROM 
    post P
  JOIN user U
    ON P.fk_user_email = U.email
`;

const readPosts = `
  SELECT
    P.post_id AS "게시글 번호", P.title AS "제목", P.content AS "본문", P.fk_user_email AS "작성자",
      D.gender AS "작성자 성별", D.address AS "작성자 지역",
      C.comment_id AS "댓글 번호", C.comment AS "댓글", C.fk_user_email AS "댓글 작성자",
      UC.name AS "댓글 작성자 이름",
      DC.gender AS "댓글 작성자 성별", DC.address AS "댓글 작성자 주소"
  FROM
    (
      SELECT 
        P.fk_user_email, P.post_id, P.title, P.content
      FROM post P
    ) P
  LEFT JOIN 
    (
      SELECT 
        U.email, U.user_id 
      FROM user U
    ) U
        ON P.fk_user_email = U.email
  LEFT JOIN
    (
      SELECT 
        D.fk_user_id, D.gender, D.address 
      FROM detail D
    ) D 
        ON U.user_id = D.fk_user_id
  LEFT JOIN
    (
      SELECT 
        C.comment_id, C.comment, C.fk_user_email, C.fk_post_id 
      FROM comment C
    ) C
        ON C.fk_post_id = P.post_id
  LEFT JOIN
    (
      SELECT 
        UC.user_id, UC.email, UC.name
      FROM 
        user UC
    ) UC
        ON UC.email = C.fk_user_email
  LEFT JOIN
    (
      SELECT
        DC.gender, DC.address, DC.fk_user_id
      FROM detail DC
    ) DC
        ON DC.fk_user_id = UC.user_id
`;

const createPost = `
  INSERT INTO
    post
    (title, content, image, fk_user_email)
  VALUES
    (?, ?, ?, ?)
`;

export {
  readPosts,
  readPost,
  createPost,
};
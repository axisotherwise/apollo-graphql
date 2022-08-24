const findUserQuery = `
  SELECT
    U.user_id, U.email, U.name, U.password
  FROM 
    user AS U
  WHERE email = ?
`;

const findUserDetailQuery = `
  SELECT
    D.fk_user_id AS "idx", U.email, U.name,
    D.gender, D.address
  FROM
    user AS U
  RIGHT JOIN 
    (
      SELECT D.gender, D.address, D.created_at, D.fk_user_id
      FROM detail AS D
    ) D
  ON U.user_id = D.fk_user_id
  WHERE email = ?
`;

const getUsers = `
  SELECT
    U.user_id, U.email, U.name,
    D.gender, D.address
  FROM
    user AS U
  LEFT JOIN 
    (
      SELECT D.gender, D.address, D.created_at, D.fk_user_id
      FROM detail AS D
    ) D
  ON U.user_id = D.fk_user_id
`;

const createUserQuery = `
  INSERT INTO
    user
    (email, name, password)
  VALUES
    (?, ?, ?)
`;

const createUserDetailQuery = `
  INSERT INTO
    detail
    (gender, address, fk_user_id)
  VALUES
    (?, ?, ?)
`;

export {
  findUserQuery,
  findUserDetailQuery,
  getUsers,
  createUserQuery,
  createUserDetailQuery,
};
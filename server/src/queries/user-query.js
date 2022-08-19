const findUserQuery = `
  SELECT *
  FROM user
  WHERE email = ?
`;

const getUserQuery = `
  SELECT *
  FROM user
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
  getUserQuery,
  createUserQuery,
  createUserDetailQuery,
};
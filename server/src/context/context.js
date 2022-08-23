import * as jwt from "../modules/jwt.js";

const context = async ({ req }) => {
  let token = req.headers?.authorization;
  if (token === undefined) {
    return {
      user: null,
    };
  }
  try {
    token = await jwt.verifyToken(token);
    const user = {
      id: token.id,
      email: token.email,
    };
    return {
      user,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default context;
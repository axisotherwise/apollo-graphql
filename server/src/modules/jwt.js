import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const issueToken = async (user) => {
  if (!user) {
    const error = new Error("노 유저");
    error.status = 401;
    throw error;
  }
  try {
    const payload = {
      id: user.user_id,
      email: user.email,
    };
    const options = {
      expiresIn: "1h",
      issuer: "axisotherwise",
    };
    const token = jwt.sign(
      payload,
      process.env.SECRET,
      options,
    );
    return token;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const verifyToken = async (token) => {
  try {
    const verify = jwt.verify(
      token,
      process.env.SECRET,
    );
    return verify;
  } catch (err) {
    if (err.message === "jwt expired") {
      console.error(err);
      const error = new Error("토큰이 만료되었습니다.");
      error.status = 418;
      throw error;
    }
    console.error(err);
    const error = new Error("유효하지않은 토큰입니다.");
    error.status = 418;
    throw error;
  }
};

export {
  issueToken,
  verifyToken,
};
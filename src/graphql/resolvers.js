import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import errorHandler from "../utils/error.js";

export default {
  createUser: async function({ userInput }, req) {
    console.log(req.isAuth);
    const email = userInput.email;
    const name = userInput.name;
    const password = userInput.password;
    const error = new Error("User exists already");
    const errors = [];
      if (!validator.isEmail(userInput.email)) {
        errors.push({ message: "E-Mail is invalid" });
        throw errors;
      }
      if (validator.isEmpty(userInput.password)) {
        errors.push({ message: "비밀번호를 입력해주세요. "});
        throw errors;
      }
      if (errors.length > 0) {
        const error = new Error("Invalid Input");
        error.data = errors; // 오류 배열
        error.code = 422;
        throw error;
      }
      const exist = await User.findOne({ where: { email }});
      if (exist) {
        throw error;
      }
      const hash = await bcrypt.hash(password, 12);
      const user = await User.create({
        email,
        name,
        password: hash,
      });
      return {
        id: user.id,
        email: user.email,
        name: user.name,
      }
  },
  login: async function({ email, password }, req) {
    if (!req.isAuth) return errorHandler("Test error", 404);
    const exist = await User.findOne({ where: { email }});
    if (!exist) return errorHandler("User not found", 404);
    const result = await bcrypt.compare(password, exist.password);
    if (!result) return errorHandler("Password not match", 404);
    const token = jwt.sign({
      email: exist.email,
      name: exist.name,
    }, "secret", { expiresIn: "1h" });
    return {
      token,
      email: exist.email,
    };
  }
}
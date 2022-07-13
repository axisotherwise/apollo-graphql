import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = req.get("Authorization");
  try {
    if (!token) {
      req.isAuth = false;
      return next();
    }
    const decodeToken = jwt.verify(token, "secret");
    req.isAuth = true;
    return next();
  } catch (err) {
    console.error(err);
    return next(err);
  }
} 
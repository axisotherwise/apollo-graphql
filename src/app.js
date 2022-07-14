import express from "express";
import morgan from "morgan";
import graphql from "express-graphql";

import { sequelize } from "./models/index.js";
import graphqlSchema from "./graphql/schema.js";
import graphqlResolver from "./graphql/resolvers.js";
import verify from "./middlewares/auth.js";

const app = express();

app.set("port", 1000);
sequelize
  .sync()
  // .sync({ force: true })
  .then(() => console.log("db connect"))
  .catch(err => console.error(err));

// app.use((req, res, next) => {
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

app.use(verify);

app.use("/graphql", graphql({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
  graphiql: true, // graphql 테스트 페이지
  formatError(err) {
    if (!err.originalError) {
      return err;
    }
    console.log(err.originalError);
    const data = err.originalError.data;
    const message = err.message || 'An error occurred.';
    const code = err.originalError.code || 500;
    return { message: message, status: code, data: data };
  },
}));

app.listen(app.get("port"), () => console.log(1000));
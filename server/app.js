import express from "express";
import morgan from "morgan";

import { sequelize } from "./models/index.js";

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

app.listen(app.get("port"), () => console.log(1000));
import server from "./app.js";
import chalk from "chalk";

server.listen()
  .then(({ url }) => console.log(chalk.bgBlueBright("GRAPHQL-APOLLO SERVER ON")))
  .catch(err => console.error(err));
import server from "./app.js";

server.listen()
  .then(({ url}) => console.log(url))
  .catch(err => console.error(err));
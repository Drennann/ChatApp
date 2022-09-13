import dotenv from "./config.js";
import server from "./app.js"

server.listen(process.env.PORT);

console.log("server on port", process.env.PORT)
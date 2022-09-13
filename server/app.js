import express from "express";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";
import morgan from "morgan";
import {dirname, join} from "path";
import { fileURLToPath } from "url"; 

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const server = http.createServer(app);
const io = new SocketServer(server,{
    cors:{
        origin: "*"
    }
});

app.use(cors());
app.use(morgan("dev"))

io.on("connection", (socket) => {
    console.log(socket.id);
    
    socket.on("message", (message) => {
        socket.broadcast.emit("message", {
            from: socket.id,
            body: message
        });
    })

})

app.use(express.static(join(__dirname, "../frontend/build")));

export default server;
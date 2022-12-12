import chalkAnimation from "chalk-animation";
import express from "express";
import figlet from "figlet";
import { createServer } from "http";
import { Server } from "socket.io";
import log, { logColor } from "./functions/writeLog.js";
import { sessions } from "./globalVariables.js";
import socketConnection from "./scripts/socketConnection.js";
import cors from "cors";

const app = express();

let corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const server = createServer(app);
export const io = new Server(server, {
    transports: ["websocket", "polling"],
    cors: {
        origin: "*",
    },
});

app.get("/getRoomList", (req, res) => {
    res.send(sessions);
});

io.on("connection", socketConnection);

let port: number = parseInt(process.env.PORT) || 3030;
server.listen(port, () => {
    console.clear();
    figlet("* Back - end ! *", function (err, data) {
        if (err) {
            chalkAnimation.rainbow("Back-end !");
            return;
        }
        chalkAnimation.rainbow(data);
    });
    log(`Hey ! I woke up and I'm ready to work 💪 | ${port}\n`, logColor.Blue);
    // setInterval(()=>{log("Hey, i'm alive !!", 'Test')}, 5000)
});
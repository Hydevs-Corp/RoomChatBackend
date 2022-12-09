import * as crypto from "crypto";
import log, { logColor } from "../functions/writeLog.js";
import { sendMessageArgs } from "../globalInterfaces.js";
import { sessions } from "../globalVariables.js";
import { io } from "../main.js";

// TODO faire en sorte qu'il y ai un max de 25 messages

export default function sendMessage({ value, name, uid, sessionId, sid }: sendMessageArgs) {
    sessions[sessionId].messages.push({
        value,
        sender: {
            uid,
            name,
            sid
        },
        id: crypto.randomUUID(),
        timestamp: new Date(Date.now()),
    });
    io.to(sessionId).emit("message", sessions[sessionId]);
    log(`New message : ${value}`, logColor.Green);
    console.table(sessions[sessionId].messages);
    console.table(sessions[sessionId].users);
}
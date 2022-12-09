import log, { logColor } from "../functions/writeLog.js";
import { sessions } from "../globalVariables.js";
import { io } from "../main.js";

export default function deleteMessage(id: string, sessionId: string) {
    if (!sessionId) return;
    sessions[sessionId].messages = sessions[sessionId].messages.filter((el) => {
        if (el.id === id) {
            log(`Message suprimé : ${el.value}\nBy : ${el.sender.name}\n`, logColor.Red);
            return false;
        }
        return true;
    });
    io.emit("message", sessions[sessionId].messages);
}

import { Socket } from "socket.io";
import getUniqueId from "../functions/GetUniqueId.js";
import isNameTaken from "../functions/isNameTaken.js";
import log, { logColor } from "../functions/writeLog.js";
import { IWannaThisRoom, sendMessageArgs, SessionData, User } from "../globalInterfaces.js";
import { sessions } from "../globalVariables.js";
import { io } from "../main.js";
import deleteMessage from "./deleteMessage.js";
import sendMessage from "./sendMessage.js";

export let socketIdCorress = {};

const socketConnection = (socket: Socket<any>) => {
    log(`A user connected ${socket.id}`, logColor.Green);

    socket.on("linkSocket", (uid: string) => {
        socketIdCorress[socket.id] = uid;
    });

    socket.on("deleteMessage", deleteMessage);

    socket.on("sendMessage", ({ value, name, uid, sessionId }: sendMessageArgs) => {
        sendMessage({ value, name, uid, sessionId, sid: socket.id });
    });

    socket.on(
        "createRoom",
        ({ sessionData, userData }: { sessionData: SessionData; userData: User }, callback: Function) => {
            if (!isNameTaken(sessionData.name)) {
                let newId = getUniqueId();
                sessions[newId] = sessionData;
                joinARoom({ roomId: newId, userData }, callback);
            } else {
                callback({ message: "802 - This name is already taken", valid: false, data: undefined });
            }
        }
    );

    socket.on("JoinRoomByName", ({ name, userData }: { name: string; userData: User }, callback: Function) => {
        const session = isNameTaken(name);
        if (session) {
            joinARoom({ roomId: session.roomId, userData }, callback);
        } else {
            callback({ message: "404 - Room not found", valid: false, data: undefined });
        }
    });

    const joinARoom = ({ roomId, userData }: IWannaThisRoom, callback: Function) => {
        if (Object.keys(sessions).includes(roomId)) {
            socket.join(roomId);
            // ajouter à sessions users
            sessions[roomId].users.push(userData);

            callback({
                message: "C'est ok mon pote",
                valid: true,
                newRoomId: roomId,
                newRoomName: sessions[roomId].name,
            });
        } else {
            socket.emit("error", { error: true });
            callback({ message: "404 - Room not found", valid: true, data: undefined });
        }
    };

    socket.on("IWannaJoinThisRoom", joinARoom);

    socket.on("giveMeMessageList", (sessionId: string, callback: Function) => {
        sessionId && callback(sessions[sessionId]);
    });

    socket.on("IWannaLeaveThisRoom", ({ roomId, userData }: IWannaThisRoom) => {
        if (!roomId) return;
        if (!isNameTaken(sessions[roomId]?.name)) return;
        socket.leave(roomId);
        log(`${userData.name} juste leave ${sessions[roomId].name} channel`);
        const result = sessions?.[roomId]?.users?.filter((el, id) => {
            if (el.uid !== userData.uid) return true;
            if (socket.id !== el.sid) return true;
            return false
        });
        sessions[roomId].users = result;
    });
    socket.on("disconnect", (reason) => {
        log(`Someone has disconnected`);
        for (let session of Object.keys(sessions)) {
            const result = sessions?.[session]?.users?.filter((el, id) => {
                if (el.uid !== socketIdCorress[socket.id]) return true;
                if (socket.id !== el.sid) return true;
                return false;
            });
            sessions[session].users = result;
        }
    });
};

export default socketConnection;
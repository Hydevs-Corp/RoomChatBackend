import { SessionData } from "../globalInterfaces.js";
import { sessions } from "../globalVariables.js";

const isNameTaken = (name: string): false | {data:SessionData, roomId:string} => {
    for (let roomId of Object.keys(sessions)) {
        if (sessions?.[roomId]?.name === name) return {data:sessions?.[roomId], roomId}
    }
    return false
}

export default isNameTaken;
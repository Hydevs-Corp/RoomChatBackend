import PocketBase from "pocketbase";

export const pb = new PocketBase("https://louisrvl.fr/pocketbase/");

const authData = await pb.admins.authWithPassword(process.env.POCKETNASE_LOGIN, process.env.POCKETNASE_PASSWORD);

import { getTimeStamp } from "./getTimeStamp.js";

export enum logColor {
  None = "0",
  Black = "30",
  Red = "31",
  Green = "32",
  Yellow = "33",
  Blue = "34",
  Magenta = "35",
  Cyan = "36",
  White = "37",
}
export enum logGraphic {
  None = "0",
  Bold = "1",
  Dim = "2",
  Italic = "3",
  Underline = "4",
  Blinking = "5",
  Reverse = "7",
  Invisible = "8",
  Strikethrough = "9",
}

const log = (
  str: String = "\nAlive\n",
  color: logColor = logColor.None,
  graphic: logGraphic = logGraphic.None
) => {
  let timestamp = getTimeStamp();
  let refinedTimestamp = `${
    `${timestamp.d}`.length == 2 ? timestamp.d : "0" + timestamp.d
  }/${`${timestamp.m}`.length == 2 ? timestamp.m : "0" + timestamp.m}/${
    timestamp.yyyy
  } - ${`${timestamp.h}`.length == 2 ? timestamp.h : "0" + timestamp.h}:${
    `${timestamp.m}`.length == 2 ? timestamp.m : "0" + timestamp.m
  }:${`${timestamp.s}`.length == 2 ? timestamp.s : "0" + timestamp.s}`;

  let message = `\x1b[${graphic};${color}m[ ${refinedTimestamp} ] →\x1b[${logGraphic.None};${logColor.None}m\n${str} `;

  console.log(message);
};

export default log;

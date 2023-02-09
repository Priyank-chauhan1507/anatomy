/* eslint-disable eqeqeq */
import { getEGZZonesNew } from "../assets/data-files/EGZZones";

export const convertEGZToProperJson = (lateralityData) => {
  const newJSON = {};
  const modifiers = new Set();
  const EGZZones = getEGZZonesNew(lateralityData);

  EGZZones.forEach((datum) => {
    newJSON[datum["EGZT-ID"]] = {
      language: datum["LanguageCode"],
      type: datum["EGZType (+y,+x,-y,-x,+z,-z)"],
      pos_x: datum["plus x"],
      neg_x: datum["minus x"],
      pos_y: datum["plus y"],
      neg_y: datum["minus y"],
      pos_z: datum["plus z"] == "null" ? null : datum["plus z"],
      neg_z: datum["plus z"] == "null" ? null : datum["plus z"],
    };
    if (datum["plus x"] !== "null") {
      modifiers.add(datum["plus x"]);
    }
    if (datum["minus x"] !== "null") {
      modifiers.add(datum["minus x"]);
    }
    if (datum["plus y"] !== "null") {
      modifiers.add(datum["plus y"]);
    }
    if (datum["minus y"] !== "null") {
      modifiers.add(datum["minus y"]);
    }
    if (datum["plus z"] !== "null") {
      modifiers.add(datum["plus z"]);
    }
    if (datum["minus z"] !== "null") {
      modifiers.add(datum["minus z"]);
    }
  });

  return { data: newJSON, modifiers: Array.from(modifiers) };
};

export const downloadFile = (url = "", fileName = "") => {
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.target = "_blank";
  a.download = fileName;
  a.click();
  a.remove();
};

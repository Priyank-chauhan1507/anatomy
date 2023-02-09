import { v4 } from "uuid";
import { getBounds, getCoordsFromDeviation, getEGZInfo } from "./cf";
import { getNameFromId } from "./getNameFromId";
import { getHierarchy } from "./helpers";

const getAllUrlParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get("language") || "en";
  const listType = urlParams.get("listType");
  const shape = urlParams.get("shape");
  const color = urlParams.get("color");
  const chronology = urlParams.get("chronology");
  const items = urlParams.get("items");
  const patientInf = urlParams.get("patientInfo");
  const encounterInf = urlParams.get("encounterInfo");

  return {
    lang,
    listType,
    shape,
    color,
    chronology,
    items,
    patientInf,
    encounterInf,
  };
};

const getDefinedNameFromParams = (defined_name, names) => {
  for (let key in names) {
    if (!defined_name[key]) {
      defined_name[key] = names[key];
    }
  }

  return defined_name;
};

const getUrlGetParams = (urlParamsObject) => {
  let urlParamsString = "?";
  for (let key in urlParamsObject) {
    urlParamsString += `${key}=${encodeURIComponent(urlParamsObject[key])}&`;
  }
  // removing extra & symbol from the end
  urlParamsString = urlParamsString.slice(0, -1);
  return urlParamsString;
};

const getListFromURL = (
  itemsArr,
  listType,
  lateralityData,
  anatomicData,
  egztData
) => {
  const list = [];

  itemsArr.forEach(
    (
      {
        content_id,
        biopsy__type,
        pin_description,
        user__notes,
        devX,
        devY,
        defined_name,
      },
      index
    ) => {
      const coords = getCoordsFromDeviation(getBounds(content_id), {
        dev_x: devX,
        dev_y: devY,
      });

      const { names, ...attrInfo } = getEGZInfo(
        content_id,
        coords,
        coords,
        lateralityData,
        anatomicData,
        egztData
      );

      const { droppedPin__id } = v4();
      const user_defined_name = getDefinedNameFromParams(defined_name, names);

      // addMarker({
      // 	coords,
      // 	droppedPin__id,
      // 	listType,
      // 	subType: biopsy__type,
      // 	pin_description,
      // 	pinShape: shape,
      // 	left_to_right: languagesData[language]?.left_to_right === "TRUE",
      // });

      coords.x = Math.round(coords.x * 100) / 100;
      coords.y = Math.round(coords.y * 100) / 100;

      const newContent = {
        id: index + 1,
        biopsy__type,
        anatomic__site: getNameFromId(content_id, lateralityData, anatomicData),
        list__type: listType,
        user__notes,
        droppedPin__id,
        hierarchy: getHierarchy(
          content_id,
          coords,
          lateralityData,
          anatomicData,
          egztData
        ),
        content_id,
        pin_description,
        attrInfo,
        native_name: names,
        defined_name: user_defined_name,
        // Not passing in params, look into it
        // pin_on_sea: pinOnSea ? true : false,
        sub__type: biopsy__type,
      };

      list.push(newContent);
    }
  );

  return list;
};

export {
  getAllUrlParams,
  getDefinedNameFromParams,
  getUrlGetParams,
  getListFromURL,
};


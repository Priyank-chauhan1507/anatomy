import { DEFAULT_SNS, SNS_RENDERER } from "../constants/itemConstants";
const genRandomString = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

let patientInfoLS = localStorage.getItem("patientInfo");
let encounterInfoLS = localStorage.getItem("encounterInfo");
let userSettingsLS = localStorage.getItem("userSettings");

const data = {
  patientInfo: patientInfoLS ? JSON.parse(patientInfoLS) : {},
  encounterInfo: encounterInfoLS ? JSON.parse(encounterInfoLS) : {},
  userSettings: userSettingsLS ? JSON.parse(userSettingsLS) : {},
};

const searchParams = new URLSearchParams(window.location.search);

const getValue = (name = "", objName, initialValue) => {
  return searchParams.get(name) || data[objName][name] || initialValue;
};
let patientInfo = {
  firstName: getValue("firstName", "patientInfo", ""),
  lastName: getValue("lastName", "patientInfo", ""),
  preferredName: getValue("preferredName", "patientInfo", ""),
  DOB: getValue("DOB", "patientInfo", null),
  gender: getValue("gender", "patientInfo", ""),
  MRN: getValue("MRN", "patientInfo", ""),
  physicianName: getValue("physicianName", "patientInfo", ""),
  additionalInfo: getValue("additionalInfo", "patientInfo", ""),
  hideOpposite: getValue("hideOpposite", "patientInfo", false),
  showOral: getValue("showOral", "patientInfo", false),
  skinType: getValue("skinType", "patientInfo", ""),
  country: getValue("country", "patientInfo", ""),
  flag: getValue("flag", "patientInfo", ""),
};

let encounterInfo = {
  notes: getValue("notes", "encounterInfo", ""),
  sessionID: getValue("sessionID", "encounterInfo", 0),
  IPaddress: getValue("IPaddress", "encounterInfo", ""),
  dateTime: getValue("dateTime", "encounterInfo", new Date()),
};

let userSettings = {
  userEmail: getValue("userEmail", "userSettings", ""),
  physicianName: getValue("physicianName", "userSettings", ""),
  assistantName: getValue("assistantName", "userSettings", ""),
  clinicName: getValue("clinicName", "userSettings", ""),
  clinicAddress: getValue("clinicAddress", "userSettings", ""),
  clinicCountry: getValue("clinicCountry", "userSettings", ""),
  clinicPhone: getValue("clinicPhone", "userSettings", ""),
  clinicFax: getValue("clinicFax", "userSettings", ""),
  clinicSite: getValue("clinicSite", "userSettings", ""),
  clinicEmail: getValue("clinicEmail", "userSettings", ""),
  clinicInfo: getValue("clinicInfo", "userSettings", ""),
  clinicLogo: getValue("clinicLogo", "userSettings", ""),
  acceptLic: getValue("acceptLic", "userSettings", false),
  acceptStatement: getValue("acceptStatement", "userSettings", false),
  clinicFlag: getValue("clinicFlag", "userSettings", ""),
  paperSize: getValue("paperSize", "userSettings", ""),
};

const generateFormDataFromSearchQuery = () => {
  return {
    patientInfo,
    userSettings,
    encounterInfo,
  };
};

const getURL = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const MAPPING_CLASS_MARKER_RADIUS = {
  ordered: 10,
  comments: 20,
  diagnosis: 20,
  unordered: 10,
};

const getClassOfDroppedPin = (droppedPinId) => {
  const id = droppedPinId.split("__")[0];
  return id;
};

const getMarkerRadius = (classId = "") => {
  return MAPPING_CLASS_MARKER_RADIUS[classId];
};

const getDirection = (
  target = { x: 0, y: 0 },
  source = { x: 0, y: 0 },
  lateralityData
) => {
  return {
    left:
      target.x < source.x
        ? lateralityData.modifierTerms.posterior
        : lateralityData.modifierTerms.anterior,
    top:
      target.y < source.y
        ? lateralityData.modifierTerms.superior
        : lateralityData.modifierTerms.inferior,
  };
};

function getPathDetailsFromLayerId(layerId) {
  let elementRect = document.getElementById(layerId).getBoundingClientRect();
  return {
    position: {
      x: elementRect.x,
      y: elementRect.y,
      cx: elementRect.x + elementRect.width / 2, // X,Y Coordinates of the centre have to be calculated
      cy: elementRect.y + elementRect.height / 2,
      w: elementRect.width,
      h: elementRect.height,
    },
  };
  // We now have the SVG coordinates of the centre of the layer. We shall use this data in our component to calculate and display deviati
}

function getBounds(layerId) {
  let elementRect = document.getElementById(layerId)?.getBoundingClientRect();
  return (
    elementRect && {
      x: elementRect.x,
      y: elementRect.y,
      cx: elementRect.x + elementRect.width / 2, // X,Y Coordinates of the centre have to be calculated
      cy: elementRect.y + elementRect.height / 2,
      w: elementRect.width,
      h: elementRect.height,
    }
  );
  // We now have the SVG coordinates of the centre of the layer. We shall use this data in our component to calculate and display deviati
}

const getDate = (DOB__obj) => {
  if (DOB__obj == null) return "";
  let birthDate = new Date(DOB__obj);
  if (Object.prototype.toString.call(birthDate) === "[object Date]") {
    // it is a date
    if (isNaN(birthDate.getTime())) {
      // date is not valid
      return "";
    } else {
      // date is valid
      return `${birthDate.getFullYear()}-${
        birthDate.getMonth() < 9
          ? `0${birthDate.getMonth() + 1}`
          : birthDate.getMonth() + 1
      }-${
        birthDate.getDate() < 10
          ? `0${birthDate.getDate()}`
          : birthDate.getDate()
      }`;
    }
  } else {
    // not a date
    return "";
  }
};
const getLateralityProp = (lateralityData, side, prop) => {
  switch (side) {
    case "L":
      return lateralityData.left[prop];
    case "R":
      return lateralityData.right[prop];
    case "B":
      return lateralityData.bilateral[prop];
    case "M":
      return lateralityData.median[prop];
    case "U":
      return lateralityData.unilateral[prop];
    default:
      return "";
  }
};

export function getSign(deviationX, deviationY) {
  if (deviationX > 0) {
    return `+`;
  } else {
    return `-`;
  }
}

export function getDeviationPlane(em_x, em_y, deviationX, deviationY) {
  if (em_x && em_y) {
    return `${getSign(deviationX)}x${getSign(deviationY)}y`;
  }
  if (em_x) {
    return `${getSign(deviationX)}x`;
  }
  if (em_y) {
    return `${getSign(deviationY)}y`;
  }
}
function getAllAttributes(layerId = "", deviation, lateralityData, egztData) {
  layerId = layerId?.replace(/(-|#|_)(\d+)$/, "");
  let [namePart, ...dataParts] = layerId?.split("--") || ["", ""];
  let nameInfo = namePart.split(".")[1];
  // let [amid, side] = amidSideInfo.split("-");
  let [amid, side] = layerId?.split("-") || ["", ""];
  if (side) {
    side = side[0];
  }
  let name;
  if (nameInfo) {
    name = nameInfo.split("HL")[0];
  } else {
    name = namePart;
  }
  amid = amid.endsWith(".") ? amid.slice(0, amid.length - 1) : amid;
  const n_side = side ? getLateralityProp(lateralityData, side, "key") : "";
  // let [name, hlLevel] = nameInfo.split("HL");
  dataParts = dataParts || [];
  const attributes = {
    egz: {
      egzt: null,
      egzx: null,
      egzy: null,
    },
    deviation: {
      ...deviation,
    },
    amid: Number(amid),
    side: side,
    level: null,
    names: {
      lateralityCodes: n_side ? [n_side] : [],
      laterality: n_side ? [n_side] : [],
      amid: Number(amid),
      prefix: [],
      suffix: [],
      enhance_modifier: [],
      foundation_id: "",
      anatomy_mapper_id: "",
      name_emoji_grp: "",
      description: "",
      distribution: "",
      auto_related_name: [],
      anatomic_site: name.replace(/_/g, " "),
      icd_codes: "",
      optional_separator: ";",
    },
  };
  if (dataParts.length > 0) {
    const prefixes = [];
    const postfixes = [];
    const egz = {};
    dataParts.forEach((datum) => {
      let [key, value] = datum.split(":");
      key = key.replace("data-", "");
      if (key.startsWith("pre")) {
        prefixes.push(lateralityData.modifierTerms[value].modifier_id);
      } else if (key.startsWith("post")) {
        postfixes.push(lateralityData.modifierTerms[value].modifier_id);
      } else if (key.startsWith("egz")) {
        egz[key] = value;
      }
    });
    attributes["egz"] = {
      egzt: egz.egzt ? Number(egz.egzt) : defaults.egzt,
      egzx: egz.egzx ? Number(egz.egzx) : defaults.egzx,
      egzy: egz.egzy ? Number(egz.egzy) : defaults.egzy,
      egzc: egz.egzc ? Number(egz.egzc) : defaults.egzc,
    };
    const { x, y, c } = getEnhanceModifier(attributes.egz, deviation, egztData);
    const devPlane = getDeviationPlane(x, y, deviation.dev_x, deviation.dev_y);

    const namePrefixes = [];
    if (x && y) {
      if (Math.abs(deviation.dev_x) > Math.abs(deviation.dev_y) + 20) {
        namePrefixes.push(x);
        namePrefixes.push(y);
      } else {
        namePrefixes.push(y);
        namePrefixes.push(x);
      }
    } else if (x || y) {
      if (y) {
        namePrefixes.push(y);
      }
      if (x) {
        namePrefixes.push(x);
      }
    } else {
      if (c) namePrefixes.push(c);
    }

    attributes["names"] = {
      ...attributes["names"],
      prefix: prefixes,
      suffix: postfixes,
      enhance_modifier: namePrefixes,
    };

    attributes["deviation"] = {
      ...deviation,
      enhanceModX: x,
      enhanceModY: y,
      devPlane: devPlane || null,
    };

    return attributes;
  } else {
    return attributes;
  }
}
function getAnatomicName(layerId = "") {
  layerId = layerId.replace(/(-|#|_)(\d+)$/, "");
  let [namePart] = layerId.split("--");
  let [_, nameInfo] = namePart.split("._");
  let name = "";
  if (nameInfo) {
    name = nameInfo.split("HL")[0];
  } else {
    name = _;
  }
  return name.replace(/_/g, " ");
}

function getRootSVG() {
  return document.getElementById(`loaded-svg-cont`).firstElementChild || null;
}

function getLabel(id) {
  return document.querySelector(`#${id} .Pin-Label`)?.innerHTML || "";
}
const defaults = {
  egzt: null,
  egzx: 50,
  egzy: 50,
  egzc: null,
};

export const getICDCodeString = (
  anatomicICD,
  { laterality, prefix, suffix, enhance_modifier },
  lateralityData,
  showExtraString = true,
  visibilityMeta
) => {
  /////
  const prefixIcdCodes = visibilityMeta.has(DEFAULT_SNS.prefix.id)
    ? prefix
        .map((p) => {
          return getPreSuffData(p, "icd_code", lateralityData);
        })
        .filter((id) => id !== "")
    : [];
  const enhance_modifier_icd_codes = visibilityMeta.has(
    DEFAULT_SNS.enhance_modifier.id
  )
    ? enhance_modifier
        .map((e) => getPreSuffData(e, "icd_code", lateralityData))
        .filter((id) => id !== "")
    : [];

  const suffixIcdCodes = visibilityMeta.has(DEFAULT_SNS.suffix.id)
    ? suffix
        .map((s) => getPreSuffData(s, "icd_code", lateralityData))
        .filter((id) => id !== "")
    : [];

  //////
  if (
    laterality.length > 0 ||
    prefixIcdCodes.length > 0 ||
    enhance_modifier_icd_codes.length > 0 ||
    suffixIcdCodes.length > 0
  ) {
    return `${anatomicICD}${
      laterality[0] && visibilityMeta.has(DEFAULT_SNS.laterality.id)
        ? "&" + getLateralityData(laterality[0], "icd_code", lateralityData)
        : ""
    }${
      showExtraString
        ? `${
            prefixIcdCodes.length > 0 ||
            enhance_modifier_icd_codes.length > 0 ||
            suffixIcdCodes.length > 0
              ? "__"
              : ""
          }${prefixIcdCodes.join("&")}${
            enhance_modifier_icd_codes.length > 0
              ? `(${enhance_modifier_icd_codes.join("&")})`
              : ""
          }${suffixIcdCodes.length > 0 ? `{${suffixIcdCodes.join("&")}}` : ""}`
        : ""
    }`;
  } else {
    return anatomicICD;
  }
};

const getLateralityData = (laterality_id, id, lateralityData) => {
  return lateralityData[laterality_id]?.[id] || "";
};
const getPreSuffData = (modifier_id, id, lateralityData) => {
  return lateralityData.modifierTerms[modifier_id]?.[id] || "";
};
export const getFoundationIdString = (
  foundationId,
  { laterality, prefix, suffix, enhance_modifier }, //icd_codes
  lateralityData,
  showExtraString = true,
  visibilityMeta
) => {
  const prefixFoundationIds = visibilityMeta.has(DEFAULT_SNS.prefix.id)
    ? prefix
        .map((p) => {
          return getPreSuffData(p, "foundation_id", lateralityData);
        })
        .filter((id) => id !== "")
    : [];
  const enhance_modifier_foundationIds = visibilityMeta.has(
    DEFAULT_SNS.enhance_modifier.id
  )
    ? enhance_modifier
        .map((e) => getPreSuffData(e, "foundation_id", lateralityData))
        .filter((id) => id !== "")
    : [];
  const suffixFoundationIds = visibilityMeta.has(DEFAULT_SNS.suffix.id)
    ? suffix
        .map((s) =>
          getPreSuffData(
            s,
            "foundation_id",
            lateralityData
            // Object.values(lateralityData.modifierTerms)
          )
        )
        .filter((id) => id !== "")
    : [];

  if (
    laterality.length > 0 ||
    prefixFoundationIds.length > 0 ||
    enhance_modifier_foundationIds.length > 0 ||
    suffixFoundationIds.length > 0
  ) {
    return `${foundationId}${
      laterality[0] && visibilityMeta.has(DEFAULT_SNS.laterality.id)
        ? "&" +
          getLateralityData(laterality[0], "foundation_id", lateralityData)
        : ""
    }${
      showExtraString
        ? `${
            prefixFoundationIds.length > 0 ||
            enhance_modifier_foundationIds.length > 0 ||
            suffixFoundationIds.length > 0
              ? "__"
              : ""
          }${prefixFoundationIds.join("&")}${
            enhance_modifier_foundationIds.length > 0
              ? `(${enhance_modifier_foundationIds.join("&")})`
              : ""
          }${
            suffixFoundationIds.length > 0
              ? `{${suffixFoundationIds.join("&")}}`
              : ""
          }`
        : ""
    }`;
  } else {
    return foundationId;
  }
};

export const getEmojiGroupString = (
  emojiGroup,
  { laterality }, //icd_codes
  lateralityData
) => {
  if (laterality.length > 0) {
    return `${emojiGroup} ${getLateralityData(
      laterality[0],
      "emoji_code",
      lateralityData
    )}`;
  } else {
    return emojiGroup;
  }
};
export const getAnatomyMapperIdString = (
  amid,
  { laterality, prefix, suffix, enhance_modifier },
  lateralityData,
  showExtraString = true,
  visibilityMeta
) => {
  const prefixModifierIds = visibilityMeta.has(DEFAULT_SNS.prefix.id)
    ? prefix
        .map((p) => {
          return getPreSuffData(
            p,
            "modifier_id",
            lateralityData
            // Object.values(lateralityData.modifierTerms)
          );
        })
        .filter((id) => id !== "")
    : [];
  const enhance_modifier_ids = visibilityMeta.has(
    DEFAULT_SNS.enhance_modifier.id
  )
    ? enhance_modifier
        .map((e) =>
          getPreSuffData(
            e,
            "modifier_id",
            lateralityData
            // Object.values(lateralityData.modifierTerms)
          )
        )
        .filter((id) => id !== "")
    : [];

  const suffixModifierIds = visibilityMeta.has(DEFAULT_SNS.suffix.id)
    ? suffix
        .map((s) =>
          getPreSuffData(
            s,
            "modifier_id",
            lateralityData
            // Object.values(lateralityData.modifierTerms)
          )
        )
        .filter((id) => id !== "")
    : [];
  return `${amid}${
    laterality[0] && visibilityMeta.has(DEFAULT_SNS.laterality.id)
      ? "-" + getLateralityData(laterality[0], "laterality_id", lateralityData)
      : ""
  }${
    showExtraString
      ? `${
          prefixModifierIds.length > 0 ||
          enhance_modifier_ids.length > 0 ||
          suffixModifierIds.length > 0
            ? "__"
            : ""
        }${prefixModifierIds.join("&")}${
          enhance_modifier_ids.length > 0
            ? `(${enhance_modifier_ids.join("&")})`
            : ""
        }${
          suffixModifierIds.length > 0 ? `{${suffixModifierIds.join("&")}}` : ""
        }`
      : ""
  }`;
};
function getEGZInfo(layerId, coords, lateralityData, egztData = {}) {
  const { dev_x, dev_y } = getDeviation(getBounds(layerId), coords);
  const { names, ...egz } = getAllAttributes(
    layerId,
    { dev_x, dev_y },
    lateralityData,
    egztData
  );

  return { names, egz };
}

function getEnhanceModifier(egz, deviation, egztData) {
  const { egzt, egzx, egzy, egzc } = egz;
  const targetEGZone = egztData[egzt];
  if (targetEGZone) {
    const isDeviationXAllowed = egzx < Math.abs(deviation.dev_x);
    const isDeviationYAllowed = egzy < Math.abs(deviation.dev_y);
    return {
      x: isDeviationXAllowed
        ? deviation.dev_x > 0
          ? targetEGZone["plus_x_modifier_id"]
          : targetEGZone["minus_x_modifier_id"]
        : null,
      y: isDeviationYAllowed
        ? deviation.dev_y > 0
          ? targetEGZone["plus_y_modifier_id"]
          : targetEGZone["minus_y_modifier_id"]
        : null,
      c: !isDeviationXAllowed && !isDeviationYAllowed ? egzc : null,
    };
  } else {
    return {
      x: null,
      y: null,
    };
  }
}

function getDeviation(layoutBox = { cx: 100, cy: 100 }, pointCoordinates) {
  return {
    dev_x: ((pointCoordinates.x - layoutBox.cx) * 100) / (layoutBox.w / 2),
    dev_y: ((pointCoordinates.y - layoutBox.cy) * 100 * -1) / (layoutBox.h / 2),
  };
}

function getCoordsFromDeviation(
  layoutBox = { cx: 100, cy: 100 },
  { dev_x, dev_y }
) {
  return {
    x: (dev_x * (layoutBox.w / 2)) / 100 + layoutBox.cx,
    y: (-1 * dev_y * (layoutBox.h / 2)) / 100 + layoutBox.cy,
  };
}
function getFullName(sns, names, trData) {
  const newVisibilityMap = new Set();
  sns.orderList.forEach(({ id, visible }) => {
    if (visible) {
      newVisibilityMap.add(id);
    }
  });
  const orderList = sns.orderList
    .map((item) => {
      const newItem = { ...item };
      var value = "";
      if (item.visible) {
        value = item.isArray
          ? names[item.id] &&
            names[item.id]
              .map((_, i) =>
                SNS_RENDERER[item.id].renderer(trData, names, i, item, {
                  visibilityMeta: newVisibilityMap,
                })
              )
              .join(" ")
          : SNS_RENDERER[item.id].renderer(trData, names, null, item, {
              visibilityMeta: newVisibilityMap,
            });
      }

      newItem.value = value;
      return newItem;
    })
    .filter(({ visible, value, id }) => {
      return visible && value !== "" && id !== "auto_related_name";
    });
  let name = "";
  orderList.map((item) => (name += item.value + " "));
  return name;
}

function haveSameName(name1, name2) {
  return name1.amid === name2.amid;
}

function getCenter(domRect) {
  return {
    x: domRect.x + domRect.width / 2,
    y: domRect.y + domRect.height / 2,
  };
}

const getNewDuplicateContents = (duplicateList, lateralityData) => {
  let newDuplicateList = {};
  const list = Object.keys(duplicateList);
  if (list.length > 1) {
    const newList = list.map((droppedPinId, index) => {
      let newX = 0,
        newY = 0;
      // if(coords){
      //   const {x,y} = coords;
      //   newX = x; newY=y;
      // }else{
      const { x, y } = document
        .querySelector("#" + droppedPinId + ">g>.Pin-Marker")
        ?.getBoundingClientRect();
      newX = x;
      newY = y;
      // }
      return {
        newX,
        newY,
        droppedPinId,
      };
    });

    newList.sort((a, b) => a.newX - b.newX);
    newList.forEach(({ newX, newY, droppedPinId }, index) => {
      if (index === 0) {
        newDuplicateList[droppedPinId] = {
          order: index,
          direction: getDirection(
            { x: newX, y: newY },
            {
              x: newList[newList.length - 1].newX,
              y: newList[newList.length - 1].newY,
            },
            lateralityData
          ),
          relativeOrder: newList.length - 1,
        };
      } else {
        newDuplicateList[droppedPinId] = {
          order: index,
          direction: getDirection(
            { x: newX, y: newY },
            {
              x: newList[index - 1].newX,
              y: newList[index - 1].newY,
            },
            lateralityData
          ),
          relativeOrder: index - 1,
        };
      }
    });
  } else if (list.length === 1) {
    newDuplicateList[list[0]] = {
      order: null,
      direction: null,
      relativeOrder: null,
    };
  }

  return {
    items: newDuplicateList,
    length: list.length,
  };
};

const copyAndChangeArray = (arr, id, newValue) => {
  return arr.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...newValue,
      };
    } else {
      return item;
    }
  });
};

const getDirectionInWords = (source, target) => {
  let y = "";
  let x = "";
  const devY = source.dev_y - target.dev_y;
  const devX = source.dev_x - target.dev_x;
  if (Math.abs(devY) <= 5) {
    y = null;
  } else {
    if (devY > 0) {
      y = "16";
    } else {
      y = "15";
    }
  }

  if (Math.abs(devX) <= 5) {
    x = null;
  } else {
    if (devX > 0) {
      x = "13";
    } else {
      x = "14";
    }
  }

  return { x, y };
};

const getMapContainer = () => {
  return document.getElementById("map-container");
};

export {
  genRandomString,
  generateFormDataFromSearchQuery,
  getURL,
  copyAndChangeArray,
  haveSameName,
  getRootSVG,
  getAnatomicName,
  getBounds,
  getCoordsFromDeviation,
  getFullName,
  getCenter,
  getEGZInfo,
  getMarkerRadius,
  getClassOfDroppedPin,
  getNewDuplicateContents,
  getPathDetailsFromLayerId,
  getEnhanceModifier,
  getDate,
  getLabel,
  getDirectionInWords,
  getMapContainer,
};

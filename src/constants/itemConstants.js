import {
  anchor_pin,
  asterisk_pin,
  caret_pin,
  circle_pin,
  encapsulated_circle_pin,
  map_pin,
} from "../components/AnatomyMapper/pinStrings";
import {
  getAnatomyMapperIdString,
  getEmojiGroupString,
  getFoundationIdString,
  getICDCodeString,
} from "../utils/cf";
import { numberToRoman, numToSSColumn } from "../utils/helpers";

export const LINK_TYPES = {
  url: {
    name: "url",
    translation_key: "label_LinkType_URL",
  },
  network_path: {
    name: "network_path",
    translation_key: "label_LinkType_NetworkPath",
  },
  cloud_storage: {
    name: "cloud_storage",
    translation_key: "label_LinkType_CloudStorage",
  },
  application: {
    name: "application",
    translation_key: "label_LinkType_Application",
  },
};

export const SUPPORTED_IMAGES_TYPE = ["image/gif", "image/jpeg", "image/png"];
export const PREVIEW_ITEM_SVG_SIZE = 150;
export const PIN_SHAPES = {
  circle: {
    name: "circle",
    label: {
      x: -4,
      y: -11,
    },
    shape: (color) => {
      return circle_pin({ fillColor: color });
    },
  },
  anchor: {
    name: "anchor_pin",
    label: {
      x: -35,
      y: -45,
    },
    shape: (color) => {
      return anchor_pin({ fillColor: color });
    },
  },
  asterik: {
    name: "asterik",
    label: {
      x: -9,
      y: -11,
    },
    shape: (color) => {
      return asterisk_pin({ fillColor: color });
    },
  },
  triangle: {
    name: "triangle",
    label: {
      x: -20,
      y: -18,
    },
    shape: (color) => {
      return caret_pin({ fillColor: color });
    },
  },
  pin: {
    name: "pin",
    label: {
      x: -11,
      y: -22,
    },
    shape: (color) => {
      return map_pin({ fillColor: color });
    },
  },
  inside_circle: {
    name: "inside_circle",
    label: {
      x: -22,
      y: -24,
    },
    shape: (color, text) => {
      return encapsulated_circle_pin({ fillColor: color, text });
    },
  },
};

export const ORDERS = {
  ABC: {
    sort: 2,
    name: "ABC",
    translation_key: "label_ListSubToolbar_Ordered_C_ABC",
    default_label: "A,B,C",
    // 0 stands for A, 1 for B, 2 for C ...so on
    resolve: (index) => {
      return numToSSColumn(index);
    },
  },
  abc: {
    sort: 3,
    name: "abc",
    default_label: "a,b,c",
    translation_key: "label_ListSubToolbar_Ordered_l_abc",
    resolve: (index) => {
      return numToSSColumn(index).toLowerCase();
    },
  },
  123: {
    sort: 1,
    name: "123",
    default_label: "1,2,3",
    translation_key: "label_ListSubToolbar_Ordered_123",
    resolve: (index) => {
      return index + 1;
    },
  },
  I_II_III: {
    sort: 4,
    name: "I_II_III",
    default_label: "I,II,III",
    translation_key: "label_ListSubToolbar_Ordered_C_IIIIII",
    resolve: (index) => {
      return numberToRoman(index + 1);
    },
  },
  i_ii_iii: {
    sort: 5,
    name: "i_ii_iii",
    label: "i,ii,iii",
    translation_key: "label_ListSubToolbar_Ordered_l_iiiiii",
    resolve: (index) => {
      return numberToRoman(index + 1).toLowerCase();
    },
  },
  "--": {
    sort: 0,
    name: "--",
    default_label: "--",
    translation_key: "label_ListSubToolbar_Ordered_--",
    resolve: (index) => {
      return "";
    },
  },
};

export const REGION_PATTERNS = {
  NOPATTERN: {
    name: "no_pattern",
    label: "-",
  },
  DASH: {
    name: "dash",
    label: "\u2022 \u2022",
  },
  DASH_DASH: {
    name: "dash_dash",
    label: "\u25AA \u25AA",
  },
  DOT: {
    name: "dot",
    label: "\uFE4F",
  },
};

export const SNS_RENDERER = {
  laterality: {
    renderer: (translationData, currentData, index, snsItem, other) => {
      return `${
        translationData.lateralityData[currentData.laterality[index]]?.text ||
        ""
      }`;
    },
    getOptions: (translationData) => {
      return ["left", "right", "unilateral", "bilateral", "median"];
    },
    renderLabel: (translationData, val) => {
      return `${translationData.lateralityData[val]?.text || ""}`;
    },
  },
  prefix: {
    renderer: (translationData, currentData, index, snsItem, other) => {
      return `${
        translationData.lateralityData.modifierTerms[currentData.prefix[index]]
          .tr_text || ""
      }`;
    },
    getOptions: (translationData) => {
      return Object.keys(translationData.lateralityData.modifierTerms);
    },
    renderLabel: (translationData, val) => {
      return translationData.lateralityData.modifierTerms[val]?.tr_text || "";
    },
  },
  enhance_modifier: {
    renderer: (translationData, currentData, index, snsItem, other) => {
      return `${
        translationData.lateralityData.modifierTerms[
          currentData.enhance_modifier[index]
        ].tr_text || ""
      }`;
    },
    getOptions: (translationData) => {
      return Object.keys(translationData.lateralityData.modifierTerms);
    },
    renderLabel: (translationData, val) => {
      return translationData.lateralityData.modifierTerms[val]?.tr_text || "";
    },
  },
  suffix: {
    renderer: (translationData, currentData, index, snsItem, other) => {
      return `${
        translationData.lateralityData.modifierTerms[currentData.suffix[index]]
          .tr_text || ""
      }`;
    },
    getOptions: (translationData) => {
      return Object.keys(translationData.lateralityData.modifierTerms);
    },
    renderLabel: (translationData, val) => {
      return translationData.lateralityData.modifierTerms[val]?.tr_text || "";
    },
  },
  anatomic_site: {
    renderer: (translationData, currentData, index, snsItem, other) => {
      return `${
        translationData.anatomicData[currentData.amid]
          ? translationData.anatomicData[currentData.amid].synonym_language
          : ""
      }`;
    },
    getOptions: (translationData) => {
      return Object.keys(translationData.anatomicData);
    },
    renderLabel: (translationData, val) => {
      return translationData.anatomicData[val]?.flattened_term || "";
    },
  },
  description: {
    renderer: (translationData, currentData, index) => {
      return currentData.description;
    },
  },
  auto_related_name: {
    renderer: (translationData, currentData, index, snsItem, other) => {
      const { lateralityData, uiData } = translationData;
      let ar =
        `${index > 0 ? "; " : ""}` +
        currentData.auto_related_name[index][0] +
        " (" +
        uiData.transtext_thispin.tr_text +
        ") " +
        uiData.transtext_is.tr_text +
        " ";
      const relation = currentData.auto_related_name[index][1];
      if (relation[0] === "too close") ar += relation[0] + " ";
      else ar += lateralityData.modifierTerms[relation[0]].tr_text + " ";
      if (relation.length === 2)
        ar +=
          " " +
          uiData.transtext_and.tr_text +
          " " +
          lateralityData.modifierTerms[relation[1]].tr_text +
          " ";
      ar +=
        uiData.transtext_from.tr_text +
        " " +
        currentData.auto_related_name[index][2];
      return ar;
    },
  },
  icd_codes: {
    renderer: (translationData, currentData, index, snsItem, other) => {
      return getICDCodeString(
        translationData.anatomicData[currentData.amid].icd_code,
        currentData,
        translationData.lateralityData,
        snsItem.child.visible,
        other.visibilityMeta
      );
    },
  },
  foundation_id: {
    renderer: (translationData, currentData, index, snsItem, other) => {
      return getFoundationIdString(
        translationData.anatomicData[currentData.amid].foundation_id,
        currentData,
        translationData.lateralityData,
        snsItem.child.visible,
        other.visibilityMeta
      );
    },
  },

  anatomy_mapper_id: {
    renderer: (translationData, currentData, index, snsItem, other) => {
      return getAnatomyMapperIdString(
        currentData.amid,
        currentData,
        translationData.lateralityData,
        snsItem.child.visible,
        other.visibilityMeta
      );
    },
  },
  name_emoji_grp: {
    renderer: (translationData, currentData, index, snsItem) => {
      return getEmojiGroupString(
        translationData.anatomicData[currentData.amid].emoji_group,
        currentData,
        translationData.lateralityData
      );
    },
  },
  optional_separator: {
    renderer: (translationData, currentData, index, snsItem, other) => {
      return snsItem.value === undefined ? ";" : snsItem.value;
    },
  },
};

export const DEFAULT_SNS = {
  laterality: {
    site_then_laterality: 3,
    laterality_then_site: 1,
    default_label: "Laterality",
    translation_key: "label_SNS_Laterality",
    id: "laterality",
    pre: "",
    post: "",
    style: {
      textDecoration: "underline",
      fontStyle: "italic",
      marginRight: 4,
    },
    isArray: true,
    isEditable: true,
    strict: true,
    max: 1,
    notAllowed: false,
    autoCompleteOptions: [],
    alwaysSelected: false,
    visible: true,
    help: {
      default_label: "",
      translation_key: "label_SNS_Laterality_help",
    },
  },
  enhance_modifier: {
    site_then_laterality: 4,
    laterality_then_site: 2,
    default_label: "Enhance Modifiers",
    translation_key: "label_SNS_EnhancedModifiers",
    id: "enhance_modifier",
    pre: "(",
    post: ")",
    style: { marginRight: 4 },
    isArray: true,
    isEditable: true,
    strict: true,
    notAllowed: false,
    autoCompleteOptions: [],
    alwaysSelected: false,
    visible: true,
    help: {
      default_label: "",
      translation_key: "label_SNS_EnhancedModifiers_help",
    },
  },
  prefix: {
    site_then_laterality: 5,
    laterality_then_site: 3,
    default_label: "Prefixes",
    translation_key: "label_SNS_Prefixes",
    id: "prefix",
    pre: "",
    post: "",
    style: { marginRight: 4 },
    isArray: true,
    isEditable: true,
    strict: true,
    autoCompleteOptions: [],
    alwaysSelected: false,
    visible: true,
    help: {
      default_label: "",
      translation_key: "label_SNS_Prefixes_help",
    },
  },
  anatomic_site: {
    site_then_laterality: 1,
    laterality_then_site: 4,
    default_label: "Anatomic Site Name",
    translation_key: "label_SNS_AnatomicSite",
    id: "anatomic_site",
    style: { fontWeight: 900, marginRight: 4 },
    isArray: false,
    pre: "",
    post: "",
    isEditable: false,
    strict: true,
    autoCompleteOptions: [],
    alwaysSelected: true,
    visible: true,
    help: {
      default_label: "",
      translation_key: "label_SNS_AnatomicSite_help",
    },
  },
  suffix: {
    site_then_laterality: 6,
    laterality_then_site: 5,
    default_label: "Suffixes",
    translation_key: "label_SNS_Suffixes",
    id: "suffix",
    pre: "{",
    post: "}",
    style: { marginRight: 4 },
    isArray: true,
    isEditable: true,
    strict: true,
    autoCompleteOptions: [],
    alwaysSelected: false,
    visible: true,
    help: {
      default_label: "",
      translation_key: "label_SNS_Suffixes_help",
    },
  },
  description: {
    site_then_laterality: 7,
    laterality_then_site: 6,
    default_label: "Custom Description",
    translation_key: "label_SNS_CustomDescription",
    id: "description",
    pre: "[",
    post: "]",
    style: { marginRight: 4 },
    isArray: false,
    isEditable: true,
    strict: false,
    autoCompleteOptions: [],
    alwaysSelected: false,
    visible: true,
    help: {
      default_label: "",
      translation_key: "label_SNS_CustomDescription_help",
    },
  },
  auto_related_name: {
    site_then_laterality: 8,
    laterality_then_site: 7,
    default_label: "Auto Related Name",
    translation_key: "label_SNS_AutoRelatedSameName",
    id: "auto_related_name",
    pre: "<",
    post: ">",
    style: { marginRight: 4, color: "#808080" },
    isArray: true,
    isEditable: false,
    strict: false,
    autoCompleteOptions: [],
    alwaysSelected: false,
    visible: true,
    help: {
      default_label: "",
      translation_key: "label_SNS_AutoRelatedSameName_help",
    },
  },
  icd_codes: {
    site_then_laterality: 9,
    laterality_then_site: 8,
    default_label: "ICD Code",
    translation_key: "label_SNS_ICDAnatomicSiteCodes",
    id: "icd_codes",
    pre: "{(",
    post: ")}",
    style: { marginRight: 4, color: "#808080" },
    isArray: false,
    isEditable: false,
    strict: false,
    autoCompleteOptions: [],
    alwaysSelected: false,
    visible: false,
    help: {
      default_label: "",
      translation_key: "label_SNS_ICDAnatomicSiteCodes_help",
    },
    child: {
      default_label: "ICD Code child",
      translation_key: "label_SNS_ICDAnatomicSiteCodesWithPSE",
      id: "icd_codes_child",
      style: { marginRight: 4, fontSize: "10px", color: "#808080" },
      help: {
        default_label: "",
        translation_key: "label_SNS_ICDAnatomicSiteCodesWithPSE_help",
      },
      isLabel: true,
      visible: false,
    },
  },
  optional_separator: {
    site_then_laterality: 2,
    laterality_then_site: 9,
    default_label: "Optional Separator",
    translation_key: "label_SNS_OptionalSep",
    id: "optional_separator",
    pre: "",
    post: "",
    style: { marginRight: 4, color: "#808080" },
    isArray: false,
    isEditable: true,
    strict: true,
    autoCompleteOptions: [],
    alwaysSelected: false,
    visible: false,
    value: ";",
    help: {
      default_label: "",
      translation_key: "label_SNS_OptionalSep_help",
    },
  },
  foundation_id: {
    site_then_laterality: 10,
    laterality_then_site: 10,
    default_label: "Foundation ID Anatomic Site Codes",
    translation_key: "label_SNS_FoundationIDs",
    id: "foundation_id",
    pre: "{#",
    post: "#}",
    style: { marginRight: 4, color: "#808080" },
    isArray: false,
    isEditable: false,
    strict: false,
    autoCompleteOptions: [],
    alwaysSelected: false,
    visible: false,
    help: {
      default_label: "",
      translation_key: "label_SNS_FoundationIDs_help",
    },
    child: {
      default_label: "Foundation ID child",
      translation_key: "label_SNS_FoundationIDsWithPSE",
      id: "foundation_id_child",
      style: { marginRight: 4, fontSize: "10px", color: "#808080" },
      help: {
        default_label: "",
        translation_key: "label_SNS_FoundationIDsWithPSE_help",
      },
      isLabel: true,
      visible: false,
    },
  },

  anatomy_mapper_id: {
    site_then_laterality: 11,
    laterality_then_site: 11,
    default_label: "AMID",
    translation_key: "label_SNS_AMIDs",

    id: "anatomy_mapper_id",
    pre: "<<",
    post: ">>",
    style: { marginRight: 4, color: "#808080" },
    isArray: false,
    isEditable: false,
    strict: false,
    autoCompleteOptions: [],
    alwaysSelected: false,
    visible: false,
    help: {
      default_label: "",
      translation_key: "label_SNS_AMIDs_help",
    },
    child: {
      default_label: "AMID child",
      translation_key: "label_SNS_AMIDsWithPSE",
      id: "anatomy_mapper_id_child",
      style: { marginRight: 4, fontSize: "10px", color: "#808080" },
      help: {
        default_label: "",
        translation_key: "label_SNS_AMIDsWithPSE_help",
      },
      isLabel: true,
      visible: false,
    },
  },

  name_emoji_grp: {
    site_then_laterality: 12,
    laterality_then_site: 12,
    default_label: "Emoji Group",
    translation_key: "label_SNS_EmojiGroup",
    id: "name_emoji_grp",
    pre: "~",
    post: "~",
    style: { marginRight: 4, color: "#808080" },
    isArray: false,
    isEditable: false,
    strict: false,
    autoCompleteOptions: [],
    alwaysSelected: false,
    visible: false,
    help: {
      default_label: "",
      translation_key: "label_SNS_EmojiGroup_help",
    },
  },
};

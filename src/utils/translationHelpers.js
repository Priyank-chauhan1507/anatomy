import { LINK_TYPES } from "../constants/itemConstants";
import { LIST_TYPES, LIST_TYPES_MAPPING } from "../constants/listsConstants";

export const translateLinkOption = (linkType, transData) => {
  const { translation_key } = LINK_TYPES[linkType];
  return `${transData.uiData[translation_key]?.emoji_code} ${transData.uiData[translation_key]?.tr_text}`;
};

export const getEmojiCodeForLinkType = (linkType, transData) => {
  const { translation_key } = LINK_TYPES[linkType];
  return `${transData.uiData[translation_key]?.emoji_code}`;
};
export const translateTags = (tagId, transData, showOnlyEmoji) => {
  return showOnlyEmoji
    ? `${transData.tags[tagId]?.emoji_code}`
    : `${transData.tags[tagId]?.emoji_code} ${
        transData.tags[tagId][`language_${transData.language.toLowerCase()}`]
      }`;
};

export const translateFileItems = (
  translation_key,
  transData,
  showOnlyEmoji
) => {
  return showOnlyEmoji
    ? `${
        transData.uiData[translation_key]?.emoji_code ||
        transData.uiData[translation_key]?.tr_text
      }`
    : `${transData.uiData[translation_key]?.emoji_code || ""} ${
        transData.uiData[translation_key]?.tr_text
      }`;
};

export const translateListType = (listType, transData) => {
  const { translation_key, default_label } = LIST_TYPES[listType];
  return `${transData[translation_key]?.tr_text || default_label}`;
};

export const translateListSubtype = (listType, listSubtype, transData) => {
  const { translation_key, default_label } =
    LIST_TYPES_MAPPING[listType][listSubtype];
  return `${transData[translation_key]?.tr_text || default_label}`;
};

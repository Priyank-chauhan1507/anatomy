export const FLITZPARK_OPTIONS = [
  {
    color: "#ffd7c2",
    id: 1,
  },
  {
    color: "#ffd7c2",
    id: 2,
  },
  {
    color: "#eebfaa",
    id: 3,
  },
  {
    color: "#c68d7b",
    id: 4,
  },
  {
    color: "#966661",
    id: 5,
  },
  {
    color: "#573739",
    id: 6,
  },
];

export const MONK_TYPE_OPTIONS = [
  {
    color: "#f6ede4",
    id: "01",
  },
  {
    color: "#f3e7db",
    id: "02",
  },
  {
    color: "#f7ead0",
    id: "03",
  },
  {
    color: "#eadaba",
    id: "04",
  },
  { color: "#d7bd96", id: "05" },
  { color: "#a07e56", id: "06" },
  { color: "#825c43", id: "07" },
  { color: "#604134", id: "08" },
  { color: "#3a312a", id: "09" },
  { color: "#292420", id: "10" },
];

export const FILE_NAME_BUILDER_DELIMITER_OPTIONS = [
  "--",
  "_",
  "\u2022",
  "\u0964",
];
export const FILE_NAME_BUILDER_OPTIONS_MAP = {
  dateTime: {
    is_item_related: false,
    translation_key: "label_FNB_EncounterDate",
    name: "dateTime",
    color:"#D3D3D3"
  },
  firstName: {
    is_item_related: false,
    translation_key: "label_FNB_PtFirstName",
    name: "firstName",
    color:"#90ee90"
  },
  lastName: {
    is_item_related: false,
    translation_key: "label_FNB_PtLastName",
    name: "lastName",
    color:"#90ee90"
  },
  DOB: {
    is_item_related: false,
    translation_key: "label_FNB_PtDOB",
    name: "DOB",
    color:"#90ee90"
  },
  gender: {
    is_item_related: false,
    translation_key: "label_FNB_PtSex",
    name: "gender",
    color:"#90ee90"
  },
  MRN: {
    is_item_related: false,
    translation_key: "label_FNB_MRN",
    name: "MRN",
    color:"#D3D3D3"
  },
  amid: {
    is_item_related: true,
    translation_key: "label_FNB_AnatomyMapperID",
    name: "amid",
    color:"#D3D3D3"
  },
  itemType: {
    is_item_related: true,
    translation_key: "label_FNB_WhereAttached",
    name: "itemType",
    color:"#ADD8E6"
  },
  fileType: {
    is_item_related: false,
    translation_key: "label_FNB_FileType",
    name: "fileType",
    color:"#ADD8E6"
  },
  listType: {
    is_item_related: true,
    translation_key: "label_FNB_ListType",
    name: "listType",
    color:"#ADD8E6"
  },
  orderMarker: {
    is_item_related: true,
    translation_key: "label_FNB_OrderMarkerInList",
    name: "orderMarker",
    color:"#ADD8E6"
  },
  listSubtype: {
    is_item_related: true,
    translation_key: "label_FNB_ListSubtype",
    name: "listSubtype",
    color:"#ADD8E6"
  },
  laterality: {
    is_item_related: true,
    translation_key: "label_FNB_Laterality",
    name: "laterality",
    color:"#ADD8E6"
  },
  emojiGroup: {
    is_item_related: true,
    translation_key: "label_SNS_EmojiGroup",
    name: "emojiGroup",
  },
  anatomicSiteName: {
    is_item_related: true,
    translation_key: "label_FNB_AnatomicSiteName",
    name: "anatomicSiteName",
    color:"#ADD8E6"
  },
  anatomyICD: {
    is_item_related: false,
    translation_key: "label_FNB_AnatomyICD",
    name: "anatomyICD",
    color:"#ADD8E6"
  },
  diagnosisICD: {
    is_item_related: true,
    translation_key: "label_FNB_DiagnosisICD",
    name: "diagnosisICD",
    color:"#ADD8E6"
  },
  testID: {
    is_item_related: true,
    translation_key: "label_FNB_TestID",
    name: "testID",
    color:"#ADD8E6"
  },
  pinId: {
    is_item_related: true,
    translation_key: "label_FNB_PinID",
    name: "pinId",
    color:"#ADD8E6"
  },
  mapVersion: {
    is_item_related: false,
    translation_key: "label_FNB_MapVersion",
    name: "mapVersion",
    color:"#ADD8E6"
  },
  coords: {
    is_item_related: true,
    translation_key: "label_FNB_PinXY",
    name: "coords",
    color:"#ADD8E6"
  },
  billingCodes: {
    is_item_related: true,
    translation_key: "label_FNB_BillingCodes",
    name: "billingCodes",
    color:"#FFCCCB"
  },
  tags: {
    is_item_related: true,
    translation_key: "label_FNB_Tags",
    name: "tags",
    color:"#D3D3D3"
  },
  pinDescription: {
    is_item_related: true,
    translation_key: "label_FNB_PinDescription",
    name: "pinDescription",
    color:"#ADD8E6"
  },
  physicianName: {
    is_item_related: true,
    translation_key: "label_FNB_DoctorProviderName",
    name: "physicianName",
    color:"#FFCCCB"
  },
  originalFileName: {
    is_item_related: true,
    translation_key: "label_FNB_OriginalFilename",
    name: "originalFileName",
    color:"#D3D3D3"
  },
  fileCreationDate: {
    is_item_related: false,
    translation_key: "label_FNB_OriginalFileCreatedDate",
    name: "fileCreationDate",
    color:"#D3D3D3"
  },
  attachmentNotes: {
    is_item_related: false,
    translation_key: "label_FNB_PhotoAttachmentNotes",
    name: "attachmentNotes",
    color:"#D3D3D3"
  },
  monkType: {
    is_item_related: false,
    translation_key: "label_FNB_MonkTone",
    name: "monkType",
    color:"#90ee90"
  },
  skinType: {
    is_item_related: false,
    translation_key: "label_FNB_FitzSkinType",
    name: "skinType",
    color:"#90ee90"
  },
  BucketOrder: {
    is_item_related: false,
    translation_key: "",
    name: "BucketOrder",
    color:"#ADD8E6"
  },
};
export const FOLDER_NAME_BUILDER_OPTIONS_MAP = {
  dateTime: {
    is_item_related: false,
    translation_key: "label_FNB_EncounterDate",
    name: "dateTime",
    color:"#D3D3D3"
  },
  firstName: {
    is_item_related: false,
    translation_key: "label_FNB_PtFirstName",
    name: "firstName",
    color:"#90ee90"
  },
  lastName: {
    is_item_related: false,
    translation_key: "label_FNB_PtLastName",
    name: "lastName",
    color:"#90ee90"
  },
  DOB: {
    is_item_related: false,
    translation_key: "label_FNB_PtDOB",
    name: "DOB",
    color:"#90ee90"
  },
  gender: {
    is_item_related: false,
    translation_key: "label_FNB_PtSex",
    name: "gender",
    color:"#90ee90"
  },
  MRN: {
    is_item_related: false,
    translation_key: "label_FNB_MRN",
    name: "MRN",
    color:"#D3D3D3"
  },
  physicianName: {
    is_item_related: true,
    translation_key: "label_FNB_DoctorProviderName",
    name: "physicianName",
    color:"#FFCCCB"
  },
};

export const dummyFileNameObject = {
  DOB: "1955-03-04", //Date object in actual data
  MRN: "34833482",
  dateTime: "2021-12-05", //Date object in actual data
  firstName: "John",
  gender: "male",
  lastName: "Smith",
  physicianName: "Gregory House",
  amid: 87,
  laterality: "Left",
  anatomicSiteName: "Central Forehead",
  pinId: "987",
  pinDescription: "Pin on mid forehead",
  listType: "Ordered",
  coords: "X320-Y480", //Object in actual data
  fileType: "Photo",
  orderMarker: "D",
  listSubtype: "Shave",
  anatomyICD: "ICD248",
  testID: "4",
  mapVersion: "MapFB1.09",
  billingCodes: "BLL097",
  tags: "06",
  diagnosisICD: "342",
  itemType: "LSTITM",
  originalFileName: "Wound1.jpg",
  fileCreationDate: "12-12-2008",
  attachmentNotes: "1st degree wound example.",
  emojiGroup: "emoji",
  monkType: "03",
  skinType: "2",
  BucketOrder: "1",
};

export const FILE_NAME_BUILDER_OPTIONS = Object.values(
  FILE_NAME_BUILDER_OPTIONS_MAP
);

export const FOLDER_NAME_BUILDER_OPTIONS = Object.values(
  FOLDER_NAME_BUILDER_OPTIONS_MAP
);
import { createSlice } from "@reduxjs/toolkit";
import {
  default_diagnosis,
  listsInitialState,
  LIST_ITEM_TYPES,
  LIST_TYPES,
  LIST_TYPES_MAPPING,
} from "../../constants/listsConstants";

import { current } from "immer";
import { v4 as uuidv4 } from "uuid";
import { isSafariBrowser } from "../../constants/global";
import { DEFAULT_SNS } from "../../constants/itemConstants";
import { getEGZInfo } from "../../utils/cf";
import {
  chooseList,
  fetchHmap,
  getHierarchy,
  isAnAnatomicSite,
  transformSVGCoords,
} from "../../utils/helpers";

const initialState = {
  // is distribution painter active
  isDistributionMode: false,

  // active list
  activeList: LIST_TYPES.ordered.name,
  // lists order,
  listsOrder: [],
  // globalSNS
  globalSNS: {
    autoEnhance: true,
    autoRelate: true,
    snsSequence: "laterality_then_site",
    orderList: Object.values(DEFAULT_SNS),
  },
  distributionSNS: {
    autoEnhance: true,
    autoRelate: true,
    snsSequence: "laterality_then_site",
    orderList: Object.values(DEFAULT_SNS).filter(({ id }) => {
      return (
        id !== DEFAULT_SNS.enhance_modifier.id &&
        id !== DEFAULT_SNS.auto_related_name.id
      );
    }),
  },
  ar_name_updated_at: "",
  customSNS: {},

  itemsMap: {},
  undoContext: {
    sketch: false,
    navbar: false,
  },
  undoHistory: [],
  itemsOrderMap: {},
  // list of lists
  lists: listsInitialState,
  binList: [],
  binGallery: [],
  totalLinks: 0,
  //active item id on click
  activeItem: {
    activeItemId: "",
    activeList: "",
    activeSubType: "",
  },
};

const updateArNameUpdatedAt = (state) => {
  const today = new Date();
  state.ar_name_updated_at =
    today.getHours() + " " + today.getMinutes() + " " + today.getSeconds();
};

const addItemInAListOrder = (state, listType, listSubtype, itemId) => {
  const list = chooseList(state.lists, listType, listSubtype);
  if (list.itemsOrder.length === 0) {
    if (state.lists[listType].isGroupMode) {
      state.listsOrder.push({
        listType,
        listSubtype,
        id: listType + listSubtype,
      });
    } else {
      state.listsOrder.push({ listType, listSubtype: null, id: listType });
    }
  }
  list.itemsOrder.push({ id: itemId });
  list.itemsOrder.forEach(({ id }, index) => {
    state.itemsOrderMap[id] = index;
  });
  const today = new Date();
  state.ar_name_updated_at =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
};

const removeItemFromAListOrder = (state, itemId) => {
  const { listType, listSubtype } = state.itemsMap[itemId];
  const list = chooseList(state.lists, listType, listSubtype);
  const index = state.itemsOrderMap[itemId];
  list.itemsOrder.splice(index, 1);
  if (list.itemsOrder.length === 0) {
    const id = state.lists[listType].isGroupMode
      ? listType + listSubtype
      : listType;
    const index = state.listsOrder.findIndex((list) => list.id === id);
    state.listsOrder.splice(index, 1);
  }
  list.itemsOrder.forEach(({ id }, index) => {
    state.itemsOrderMap[id] = index;
  });
  const today = new Date();
  state.ar_name_updated_at =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
};

const patchDistributionSNS = (state, newOrderList) => {
  state.distributionSNS.orderList = newOrderList.filter(({ id }) => {
    return (
      id !== DEFAULT_SNS.enhance_modifier.id &&
      id !== DEFAULT_SNS.auto_related_name.id
    );
  });
};

export const listsSlice = createSlice({
  name: "listStore",
  initialState: initialState,
  reducers: {
    clearListsOrder: (state, action) => {
      state.isDistributionMode = false;

      // active list
      state.activeList = LIST_TYPES.ordered.name;
      // lists order,
      state.listsOrder = [];
      // globalSNS
      state.globalSNS = {
        autoEnhance: true,
        autoRelate: true,
        snsSequence: "laterality_then_site",
        orderList: Object.values(DEFAULT_SNS),
      };
      state.distributionSNS = {
        autoEnhance: true,
        autoRelate: true,
        snsSequence: "laterality_then_site",
        orderList: Object.values(DEFAULT_SNS).filter(({ id }) => {
          return (
            id !== DEFAULT_SNS.enhance_modifier.id &&
            id !== DEFAULT_SNS.auto_related_name.id
          );
        }),
      };
      state.customSNS = {};

      state.itemsMap = {};
      state.itemsOrderMap = {};
      // list of lists
      state.lists = listsInitialState;
      state.binList = [];
      state.binGallery = [];
    },
    // active list selection and subtype selection functions
    toggleDistributionMode: (state, action) => {
      const payloadState = action.payload;
      const s =
        payloadState === undefined ? !state.isDistributionMode : payloadState;
      state.isDistributionMode = s;
      if (s) {
        state.activeList = LIST_TYPES.painted_distribution.name;
      } else {
        state.activeList = LIST_TYPES.ordered.name;
      }
    },
    setBinList: (state, action) => {
      const newBinList = action.payload;
      state.binList = newBinList;
    },
    setBinGallery: (state, action) => {
      const newBinGallery = action.payload;
      state.binGallery = newBinGallery;
    },

    setActiveList: (state, action) => {
      state.activeList = action.payload;
    },
    setActiveSubType: (state, action) => {
      state.lists[state.activeList].activeSubType = action.payload;
    },

    // list mutation functions
    changeAttributeOfAList: (state, action) => {
      const { listType, listSubtype, name, value } = action.payload;
      const list = chooseList(state.lists, listType, listSubtype);
      // a boolean change
      if (value === undefined) {
        list.attr[name] = !list.attr[name];
      } else {
        list.attr[name] = value;
      }
      updateArNameUpdatedAt(state);
    },
    changePinListDescription: (state, action) => {
      const { listType, listSubtype, name, value } = action.payload;
      const list = chooseList(state.lists, listType, listSubtype);
      // a boolean change

      if (list.attr[name].auto_relate_pins != value["auto_relate_pins"])
        updateArNameUpdatedAt(state);
      list.attr[name] = {
        ...list.attr[name],
        ...value,
      };
    },
    reorderLists: (state, action) => {
      const newLists = action.payload;
      state.listsOrder = newLists;
    },

    // sns related function
    changeSNSSequence: (state, action) => {
      const sequence = action.payload; // can be laterality_then_site or site_then_laterality
      state.globalSNS.snsSequence = sequence;
      const newOrderList = [...state.globalSNS.orderList].sort(
        (a, b) => a[sequence] - b[sequence]
      );
      newOrderList.forEach((e) => {
        if (e.id === "optional_separator") {
          if (sequence === "laterality_then_site") e.visible = false;
          else e.visible = true;
        }
      });
      state.globalSNS.orderList = newOrderList;
      patchDistributionSNS(state, newOrderList);
    },
    updateSNS: (state, action) => {
      const { newSNS, all = false } = action.payload;
      state.globalSNS = newSNS;
      patchDistributionSNS(state, newSNS.orderList);
      // reset all custom sns
      if (all) {
        state.customSNS = {};
      }
    },

    // both list and item mutation function
    updateLinks: (state, action) => {
      const { newLinks, data } = action.payload;
      if (data.isGrouped) {
        chooseList(
          state.lists,
          data.listType,
          data.listSubtype
        ).attr.grouped_documentation.links = newLinks;
      } else {
        state.itemsMap[data.itemId].links = newLinks;
      }
    },
    updateLinksById: (state, action) => {
      const { links, ids, itemId } = action.payload;
      // eslint-disable-next-line
      ids.map((id) => {
        if (id !== itemId) {
          // eslint-disable-next-line
          state.itemsMap[id].links.map((link, indx) => {
            if (links[link.id]) {
              state.itemsMap[id].links[indx] = links[link.id];
            }
          });
        }
      });
    },
    addGroupFile: (state, action) => {
      const { data, file } = action.payload;
      const singleType = ["ordered", "single_diagnosis", "comments"];
      if (singleType.includes(data.listType)) {
        state.lists[data.listType].attr.grouped_documentation.groupFile = file;
      } else {
        const type = state.lists[data.listType];
        type[data.listSubtype].attr.grouped_documentation.links = file;
      }
    },
    changeGroupNotes: (state, action) => {
      const { listType, listSubtype, notes } = action.payload;
      const singleType = ["ordered", "single_diagnosis", "comments"];
      if (singleType.includes(listType)) {
        state.lists[listType].attr.grouped_documentation.groupNotes[listType] =
          notes;
      } else {
        const type = state.lists[listType];
        type[listSubtype].attr.grouped_documentation.groupNotes[listSubtype] =
          notes;
      }
    },
    updateDiagnoses: (state, action) => {
      const { newDiagnoses, data } = action.payload;
      if (data.isGrouped) {
        chooseList(
          state.lists,
          data.listType,
          data.listSubtype
        ).attr.grouped_documentation.diagnoses = newDiagnoses;
      } else {
        state.itemsMap[data.itemId].diagnoses = newDiagnoses;
      }
    },
    copyGroupDiagnoses: (state, action) => {
      const { listType, listSubtype, diagnoses } = action.payload;
      const singleType = ["ordered", "single_diagnosis", "comments"];
      let grpItems = [];
      if (singleType.includes(listType)) {
        grpItems = Object.values(state.itemsMap).filter(
          (item) => item.listType === listType
        );
      } else {
        grpItems = Object.values(state.itemsMap).filter(
          (item) =>
            item.listType === listType && item.listSubtype === listSubtype
        );
      }
      // eslint-disable-next-line
      grpItems.map((item) => {
        state.itemsMap[item.id].diagnoses = diagnoses;
      });
    },
    // item mutation function
    onAddItem: (state, action) => {
      const { payload } = action;

      const {
        listType = state.activeList,
        listSubtype = state.lists[state.activeList].activeSubType,
      } = payload.listInfo || {};

      const { itemType } = state.lists[listType];
      const itemId = uuidv4();
      const list = chooseList(state.lists, listType, listSubtype);

      const attr = list.attr;
      const diag = attr.grouped
        ? current(attr.grouped_documentation.diagnoses)
        : LIST_TYPES_MAPPING[listType][listSubtype].default_diagnosis || [
            default_diagnosis,
          ];
      const {
        coords,
        pathId,
        isAnatomicSite,
        names,
        egz,
        layerInfo,
        hierarchy,
        uiData,
      } = payload.data;
      const { onlyOnMap } = attr;
      let newItem = {};

      if (isAnatomicSite || !onlyOnMap) {
        const svgCoords = transformSVGCoords(coords);

        newItem = {
          id: itemId,
          listType,
          listSubtype,
          isFirstDescriptionEdited: false,
          coords: {
            absCoords: coords,
            svgCoords: {
              x: svgCoords.x,
              y: svgCoords.y,
            },
          },
          subType: listSubtype,
          pathId: isAnatomicSite ? pathId : null,
          names: names,
          layerInfo,
          show: true,
          egz: egz,
          itemType,
          hierarchy,
          descriptions: [
            (uiData[LIST_TYPES_MAPPING[listType][listSubtype].translation_key]
              ? uiData[
                  LIST_TYPES_MAPPING[listType][listSubtype].translation_key
                ].tr_text
              : "") || LIST_TYPES_MAPPING[listType][listSubtype].default_label,
            "",
            "",
          ],
          links: [],
          pinDescriptionVisibility:
            listType === LIST_TYPES.comments.name ? false : true,
          files: [],
          morphologies: [],
          diagnoses: diag,
          notes: "",
        };
      } else {
        return;
      }
      switch (itemType) {
        case LIST_ITEM_TYPES.PIN:
          break;
        case LIST_ITEM_TYPES.REGION:
          break;
        default:
          break;
      }
      addItemInAListOrder(state, listType, listSubtype, itemId);

      state.itemsMap[itemId] = newItem;
      updateArNameUpdatedAt(state);
      state.undoHistory.push(itemId);
    },

    updateItem: (state, action) => {
      const { itemId, spread = false, data } = action.payload;

      if (spread) {
        const names = state.itemsMap[itemId].names;
        const description = names.description;
        if (action.payload.data.names) {
          action.payload.data.names.description = description;
        }
        state.itemsMap[itemId] = {
          ...state.itemsMap[itemId],
          ...action.payload.data,
        };
      } else {
        state.itemsMap[itemId] = action.payload.data;
      }
    },

    addItemUsingQr: (state, action) => {
      const {
        listType,
        listSubtype,
        coords,
        lateralityData,
        uiData,
        egztData,
        pathId,
        enhance_modifier,
        prefix,
        suffix,
      } = action.payload;

      const getCoords = (pos) => parseFloat(coords.split(",")[pos]);
      const coordsObj = {
        x: getCoords(0),
        y: getCoords(1),
      };
      const svgCoords = {
        x: getCoords(2),
        y: getCoords(3),
      };
      // const pathId = fetchIds(coordsObj)[0]
      // const svgCoords = getSVGCoords(coordsObj)
      const isAnatomicSite = isAnAnatomicSite(pathId);
      const hierarchy = getHierarchy(
        pathId,
        coordsObj,
        lateralityData,
        egztData
      );
      const { itemType } = state.lists[listType];
      let inf = { egz: {}, names: {} };
      inf = getEGZInfo(pathId, coordsObj, lateralityData, egztData);
      const layerInfo = fetchHmap(pathId, coordsObj);
      const itemId = uuidv4();
      const zoom = window.window.sketchRef._zoom;

      if (!isAnatomicSite) return;

      const newObj = {
        id: itemId,
        listType: listType,
        listSubtype: listSubtype,
        isFirstDescriptionEdited: false,
        coords: {
          absCoords: coordsObj,
          svgCoords: {
            x: isSafariBrowser ? svgCoords.x / zoom : svgCoords.x,
            y: isSafariBrowser ? svgCoords.y / zoom : svgCoords.y,
          },
        },
        subType: listSubtype,
        pathId: isAnatomicSite ? pathId : null,
        names: inf.names,
        layerInfo,
        egz: inf.egz,
        itemType,
        hierarchy,
        show: true,
        descriptions: [
          (uiData[LIST_TYPES_MAPPING[listType][listSubtype].translation_key]
            ? uiData[LIST_TYPES_MAPPING[listType][listSubtype].translation_key]
                .tr_text
            : "") || LIST_TYPES_MAPPING[listType][listSubtype].default_label,
          "",
          "",
        ],
        links: [],
        pinDescriptionVisibility: true,
        files: [],
        morphologies: [],
        diagnoses: LIST_TYPES_MAPPING[listType][listSubtype]
          .default_diagnosis || [default_diagnosis],
        notes: "",
      };
      newObj.names.enhance_modifier = enhance_modifier;
      newObj.names.prefix = prefix;
      newObj.names.suffix = suffix;

      addItemInAListOrder(state, listType, listSubtype, itemId);

      state.itemsMap[itemId] = newObj;
      updateArNameUpdatedAt(state);
    },

    reorderItems: (state, action) => {
      const { listType, listSubtype, newItemsOrder } = action.payload;
      const list = chooseList(state.lists, listType, listSubtype);
      list.itemsOrder = newItemsOrder;
      newItemsOrder.forEach(({ id }, index) => {
        state.itemsOrderMap[id] = index;
      });
      updateArNameUpdatedAt(state);
    },
    changeHierarchy: (state, action) => {
      const { itemId, newPathId, description } = action.payload;
      const {
        hierarchy,
        egz: oldEGZ,
        names: oldNames,
        pathId: oldPath,
        layerInfo: oldLayerInfo,
        ...rest
      } = state.itemsMap[itemId];
      const index = hierarchy.findIndex(({ pathId }) => pathId === newPathId);
      const { egz, names, pathId } = hierarchy[index];
      const layerInfo = fetchHmap(pathId);
      hierarchy.splice(index, 1);
      hierarchy.push({
        egz: oldEGZ,
        names: oldNames,
        pathId: oldPath,
        layerInfo: oldLayerInfo,
      });
      state.itemsMap[itemId] = {
        ...rest,
        hierarchy,
        pathId,
        egz,
        names: { ...names, description },
        layerInfo,
      };
    },
    onShow: (state, action) => {
      const { AnatomicName, itemId } = action.payload;
      state.itemsMap[itemId].show = AnatomicName;
    },
    onAddFile: (state, action) => {
      const { itemId, file } = action.payload;
      state.itemsMap[itemId].files.push({
        name: file.name,
        type: file.type,
        id: file.id,
        contentType: file.contentType, // can be image or doc
        fileCreationDate: file.fileCreationDate,
        original: file.original,
        notes: "",
        tags: [],
      });
    },

    // temporarirly move it to bin.
    removeItem: (state, action) => {
      const { itemId, pushToBin } = action.payload;

      if (pushToBin) {
        state.binList.push({ id: itemId });
      }
      removeItemFromAListOrder(state, itemId);
    },

    removeGallery: (state, action) => {
      const { itemId, index } = action.payload;
      const [item] = state.itemsMap[itemId].files.splice(index, 1);
      state.binGallery.push({ id: itemId, file: item });
    },
    transferFileFromGallery: (state, action) => {
      const { initialId, finalId, index } = action.payload;

      const [item] = state.itemsMap[initialId].files.splice(index, 1);

      state.itemsMap[finalId].files.push(item);
    },

    updateItemName: (state, action) => {
      const { itemId, name } = action.payload;

      state.itemsMap[itemId].names.auto_related_name = name;
    },
    // permanently delete item
    deleteItem: (state, action) => {
      const { itemId } = action.payload;
      delete state.itemsMap[itemId];
    },
    deleteItemFile: (state, action) => {
      const { index } = action.payload;
      state.binGallery.splice(index, 1);
    },
    transferFile: (state, action) => {
      const { itemId, index } = action.payload;
      if (itemId !== "") {
        const [item] = state.binGallery.splice(index, 1);
        state.itemsMap[itemId].files.push(item.file);
      }
    },

    restoreItem: (state, action) => {
      const { index } = action.payload;

      const [{ id }] = state.binList.splice(index, 1);
      const { listType, listSubtype } = state.itemsMap[id];
      addItemInAListOrder(state, listType, listSubtype, id);
    },

    restoreGallery: (state, action) => {
      const { index, uiData } = action.payload;
      const item = state.binGallery[index];
      if (state.binList.some((ID) => ID.id === item.id)) {
        window.alert(uiData.alert_PhotoAttachmentTrash_error.tr_text);
        // state.binGallery.push(item)
      } else {
        const [item] = state.binGallery.splice(index, 1);
        state.itemsMap[item.id].files.push(item.file);
      }
    },

    setItemVisibility: (state, action) => {
      const { name, itemId, toggle } = action.payload;
      if (name === "pinDescriptionVisibility") {
        if (toggle == null) {
          state.itemsMap[itemId][name] = !state.itemsMap[itemId][name];
        } else if (
          (toggle == 1 && !state.itemsMap[itemId][name]) ||
          (toggle == 0 && state.itemsMap[itemId][name])
        )
          state.itemsMap[itemId][name] = !state.itemsMap[itemId][name];
      }
    },

    onResetPinDescription: (state, action) => {
      const { itemId, uiData } = action.payload;

      const listType = state.itemsMap[itemId].listType;
      const listSubtype = state.itemsMap[itemId].listSubtype;
      let descriptions = [
        (uiData[LIST_TYPES_MAPPING[listType][listSubtype].translation_key]
          ? uiData[LIST_TYPES_MAPPING[listType][listSubtype].translation_key]
              ?.tr_text
          : "") || LIST_TYPES_MAPPING[listType][listSubtype].default_label,
        "",
        "",
      ];
      state.itemsMap[itemId].descriptions = descriptions;
      state.itemsMap[itemId].isFirstDescriptionEdited = false;
    },

    updateDescriptions: (state, action) => {
      const { descriptions, itemId } = action.payload;

      if (state.itemsMap[itemId].descriptions[0] !== descriptions[0]) {
        state.itemsMap[itemId].isFirstDescriptionEdited = true;
      }
      state.itemsMap[itemId].descriptions = descriptions;
    },
    resetItemSNS: (state, action) => {
      const { itemId, egztData, lateralityData } = action.payload;
      // state.itemsMap[itemId]
      const inf = getEGZInfo(
        state.itemsMap[itemId].pathId,
        state.itemsMap[itemId].coords.absCoords,
        lateralityData,
        egztData
      );

      inf.names.description = state.itemsMap[itemId].names.description;
      state.itemsMap[itemId].names = inf.names;

      delete state.customSNS[itemId];

      updateArNameUpdatedAt(state);
    },
    changeItemSNSVisibility: (state, action) => {
      const { itemId, index, isVisible, isChild } = action.payload;

      if (!state.customSNS[itemId]) {
        const listType = state.itemsMap[itemId].listType;
        state.customSNS[itemId] =
          listType === LIST_TYPES.painted_distribution.name
            ? state.distributionSNS
            : state.globalSNS;
      }
      if (isChild) {
        if (isVisible) {
          if (state.customSNS[itemId].orderList[index].visible) {
            state.customSNS[itemId].orderList[index].child.visible = true;
          }
        } else {
          state.customSNS[itemId].orderList[index].child.visible = false;
        }
      } else {
        state.customSNS[itemId].orderList[index].visible = isVisible;
        if (state.customSNS[itemId].orderList[index].child) {
          if (!isVisible) {
            state.customSNS[itemId].orderList[index].child.visible = false;
          }
        }
      }
    },
    changeItemSNSOrder: (state, action) => {
      const { itemId, newOrderList } = action.payload;
      if (!state.customSNS[itemId]) {
        const listType = state.itemsMap[itemId].listType;
        state.customSNS[itemId] =
          listType === LIST_TYPES.painted_distribution.name
            ? state.distributionSNS
            : state.globalSNS;
      }

      state.customSNS[itemId].orderList = newOrderList;
      updateArNameUpdatedAt(state);
    },
    changeItemSNSValue: (state, action) => {
      const { itemId, id, value } = action.payload;
      if (!state.customSNS[itemId]) {
        const listType = state.itemsMap[itemId].listType;
        state.customSNS[itemId] =
          listType === LIST_TYPES.painted_distribution.name
            ? state.distributionSNS
            : state.globalSNS;
      }
      const foundIndex = state.customSNS[itemId].orderList.findIndex(
        ({ id: snsId }) => snsId === id
      );

      if (foundIndex !== -1) {
        state.customSNS[itemId].orderList[foundIndex].value = value;
      }
      updateArNameUpdatedAt(state);
    },
    changeItemListType: (state, action) => {
      const { itemId, subtype, type, uiData } = action.payload;
      const { listType, listSubtype } = state.itemsMap[itemId];

      removeItemFromAListOrder(state, itemId);
      addItemInAListOrder(state, type, subtype, itemId);

      state.itemsMap[itemId].listType = type;
      state.itemsMap[itemId].listSubtype = subtype;
      if (state.itemsMap[itemId].itemType === "pin") {
        state.itemsMap[itemId].itemType = "region";
      } else {
        state.itemsMap[itemId].itemType = "pin";
      }
      state.itemsMap[itemId].subType = subtype;

      state.itemsMap[itemId].descriptions[0] =
        uiData[LIST_TYPES_MAPPING[type][subtype].translation_key]?.tr_text ||
        LIST_TYPES_MAPPING[listType][listSubtype].default_label;
      if (state.itemsMap[itemId].diagnoses[0].exts.length === 0) {
        state.itemsMap[itemId].diagnoses = LIST_TYPES_MAPPING[type][subtype]
          .default_diagnosis || [default_diagnosis];
      }
    },
    changeItemSubtype: (state, action) => {
      const { itemId, subtype, uiData } = action.payload;
      const { listType, listSubtype } = state.itemsMap[itemId];

      if (state.lists[listType].isGroupMode) {
        removeItemFromAListOrder(state, itemId);
        addItemInAListOrder(state, listType, subtype, itemId);
      }
      state.itemsMap[itemId].listSubtype = subtype;
      state.itemsMap[itemId].descriptions[0] =
        uiData[LIST_TYPES_MAPPING[listType][subtype].translation_key]
          ?.tr_text || LIST_TYPES_MAPPING[listType][listSubtype].default_label;
      if (state.itemsMap[itemId].diagnoses[0].exts.length === 0) {
        state.itemsMap[itemId].diagnoses = LIST_TYPES_MAPPING[listType][subtype]
          .default_diagnosis || [default_diagnosis];
      }
    },
    updatePinDescriptions: (state, action) => {
      const { itemId, descriptions } = action.payload;

      if (state.itemsMap[itemId].descriptions[0] !== descriptions[0]) {
        state.itemsMap[itemId].isFirstDescriptionEdited = true;
      }
      state.itemsMap[itemId].descriptions = descriptions;
    },
    translateDescription: (state, action) => {
      const { uiData } = action.payload;

      for (let item in state.itemsMap) {
        if (item !== "visibility") {
          const { listType, listSubtype } = state.itemsMap[item];

          if (state.itemsMap[item].isFirstDescriptionEdited === false) {
            state.itemsMap[item].descriptions[0] =
              uiData[LIST_TYPES_MAPPING[listType][listSubtype].translation_key]
                ?.tr_text ||
              LIST_TYPES_MAPPING[listType][listSubtype].default_label;
          }
        }
      }
    },
    updateMorphologies: (state, action) => {
      const { data, morphologies } = action.payload;

      if (data.isGrouped) {
        chooseList(
          state.lists,
          data.listType,
          data.listSubtype
        ).attr.grouped_documentation.morphologies = morphologies;
      } else {
        state.itemsMap[data.itemId].morphologies = morphologies;
      }
    },
    updateItemFiles: (state, action) => {
      const { itemId, files } = action.payload;
      state.itemsMap[itemId].files = files;
    },

    changeItemNotes: (state, action) => {
      const { itemId, notes } = action.payload;
      state.itemsMap[itemId].notes = notes;
    },

    changeItemName: (state, action) => {
      const { itemId, name, value } = action.payload;
      state.itemsMap[itemId].names[name] = value;
      updateArNameUpdatedAt(state);
    },
    undoPin: (state, action) => {
      const popId = state.undoHistory[state.undoHistory.length - 1];

      const listType = state.itemsMap[popId].listType;
      const listSubtype = state.itemsMap[popId].listSubtype;
      const itemsOrder = chooseList(
        state.lists,
        listType,
        listSubtype
      ).itemsOrder;
      delete state.itemsOrderMap[popId];
      delete state.itemsMap[popId];
      state.undoHistory.pop();
      chooseList(state.lists, listType, listSubtype).itemsOrder =
        itemsOrder.filter((item) => item.id !== popId);

      // const listsOrder  = state.listsOrder;
      const itemsMap = Object.entries(state.itemsMap);
      const y = listSubtype
        ? itemsMap.filter(
            (item) =>
              item[1].listType === listType &&
              item[1].listSubtype === listSubtype
          ).length
        : itemsMap.filter((item) => item[1].listType === listType).length;
      if (y < 1) {
        const singleType = ["ordered", "single_diagnosis", "comments"];
        const id = singleType.includes(listType)
          ? listType
          : listType + listSubtype;
        state.listsOrder = state.listsOrder.filter((item) => item.id !== id);
      }
    },
    setUndoContext: (state, action) => {
      state.undoContext = action.payload;
      if (!state.undoContext.sketch && !state.undoContext.navbar) {
        state.undoHistory = [];
      }
    },
    setActiveItem: (state, action) => {
      const { itemId, activeList, activeSubType } = action.payload;
      state.activeItem.activeItemId = itemId;
      state.activeItem.activeList = activeList;
      state.activeItem.activeSubType = activeSubType;
    },

    increaseLinkArray: (state, action) => {
      state.totalLinks = state.totalLinks + 1;
    },
    decreaseLinkArray: (state, action) => {
      if (state.totalLinks > 0) state.totalLinks = state.totalLinks - 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  clearListsOrder,
  // active list selection and subtype selection functions
  toggleDistributionMode,
  setActiveList,
  setActiveSubType,

  // sns related actions
  changeSNSSequence,
  updateSNS,

  // List related actions
  onAddItem,
  updateItem,
  addItemUsingQr,
  reorderLists,
  changeAttributeOfAList,
  setBinList,
  setBinGallery,

  //item and list related action
  updateLinks,
  updateDiagnoses,
  copyGroupDiagnoses,

  // item related action
  reorderItems,
  changeHierarchy,
  onAddFile,
  removeItem,
  removeGallery,
  transferFileFromGallery,
  deleteItem,
  deleteItemFile,
  transferFile,
  restoreItem,
  restoreGallery,
  updateMorphologies,
  changeItemSNSValue,
  updateItemName,
  changeItemSubtype,
  changeItemListType,
  onResetPinDescription,
  updateDescriptions,
  translateDescription,
  setItemVisibility,
  updateItemFiles,
  resetItemSNS,
  updateLinksById,
  changeItemSNSVisibility,
  changeItemSNSOrder,
  changeItemName,
  changeItemNotes,
  changePinListDescription,
  changeGroupNotes,
  addGroupFile,
  undoPin,
  setUndoContext,
  onShow,
  setActiveItem,
  increaseLinkArray,
  decreaseLinkArray,
} = listsSlice.actions;

export default listsSlice.reducer;

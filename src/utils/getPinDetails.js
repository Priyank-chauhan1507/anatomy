import { LIST_TYPES } from "../constants/listsConstants";
import { DEFAULT_SNS, SNS_RENDERER } from "../constants/itemConstants";
import store from "../store/index";

export const getPinDetails = (item, trData) => {
  const state = store.getState();
  const names = item.names;
  const sns =
    state.listStore.customSNS[item.id] ||
    (item.listType === LIST_TYPES.painted_distribution.name
      ? state.listStore.distributionSNS
      : state.listStore.globalSNS);
  const isEmVisible = sns.orderList.find(
    ({ id }) => DEFAULT_SNS.enhance_modifier.id
  );
  const olist = sns.orderList
    .map((item) => {
      const newItem = { ...item };
      var value = "";
      if (item.visible) {
        value = item.isArray
          ? names[item.id]
              .map((_, i) =>
                SNS_RENDERER[item.id].renderer(trData, names, i, item, {
                  isEmVisible,
                })
              )
              .join(" ")
          : SNS_RENDERER[item.id].renderer(trData, names, null, item, {
              isEmVisible,
            });
      }

      newItem.value = value;
      return newItem;
    })
    .filter(({ visible }) => {
      return visible;
    })
    .map((each) =>
      each.value !== "" ? each.pre + each.value + each.post : ""
    );
  return {
    id: item.id,
    data: olist,
    itemType: item.itemType,
    subType: item.subType,
    listType: item.listType,
    listSubType: item.listSubtype,
  };
};

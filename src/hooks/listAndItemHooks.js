import { useSelector } from "react-redux";
import { LIST_TYPES } from "../constants/listsConstants";
export const useSNS = (itemId) => {
  const listType = useSelector(
    (state) => state.listStore.itemsMap[itemId].listType
  );
  return useSelector(
    (state) =>
      state.listStore.customSNS[itemId] ||
      (listType === LIST_TYPES.painted_distribution.name
        ? state.listStore.distributionSNS
        : state.listStore.globalSNS)
  );
};

import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Tooltip,
} from "@material-ui/core";
import { Help } from "@material-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as HierarchyIcon } from "../../assets/hierarchy.svg";
import { LIST_TYPES } from "../../constants/listsConstants";
import { useSNS } from "../../hooks/listAndItemHooks";
import useTranslations from "../../hooks/useTranslations";
import { changeHierarchy } from "../../store/slices/lists";
import { openNameBuilderModal } from "../../store/slices/modals";
import { chooseList } from "../../utils/helpers";
import NameRenderer from "../NameRenderer";
import PinWithLabel from "../PinWithLabel";
import { SVGRegionVisual } from "../SVGRegionRenderer";

const COLOR_PIN_HIERARCHY = "#777";
const OPACITY_PIN_HIERARCHY = ".4";

export const NameAndPinRendererWithHierarchy = ({
  itemId,
  isNameEditable = true,
  hierarchyButton = true,
  label = true,
}) => {
  const index = useSelector((state) => state.listStore.itemsOrderMap[itemId]);
  const { pathId, names, hierarchy, listType, listSubtype, show } = useSelector(
    (state) => state.listStore.itemsMap[itemId]
  );
  const auto_related_pin = useSelector((state) =>
    listType
      ? chooseList(state.listStore.lists, listType, listSubtype).attr
          .pinListSettings.auto_relate_pins
      : {}
  );
  const { color, order, shape, opacity, pattern } = useSelector(
    (state) => chooseList(state.listStore.lists, listType, listSubtype).attr
  );

  const pinListSettings = useSelector((state) =>
    listType
      ? chooseList(state.listStore.lists, listType, listSubtype).attr
          .pinListSettings
      : {}
  );

  const sns = useSNS(itemId);

  const dispatch = useDispatch();

  const [popOverRef, setPopOverRef] = useState(null);

  const uiData = useTranslations().uiData;

  const description = names.description;

  return (
    <div
      style={{ display: "flex", alignItems: "center" }}
      className={"svg-opacity"}
    >
      <Popover
        open={popOverRef != null}
        anchorEl={popOverRef}
        onClose={() => {
          setPopOverRef(null);
        }}
      >
        <List component="nav" aria-label="secondary mailbox folder">
          {hierarchy.map(({ pathId: parentId, names, layerInfo }) => {
            return parentId ? (
              <ListItem
                button
                key={parentId}
                onClick={(event) => {
                  event.stopPropagation();
                  dispatch(
                    changeHierarchy({
                      itemId,
                      newPathId: parentId,
                      description,
                    })
                  );
                  setPopOverRef(null);
                }}
              >
                {listType === LIST_TYPES.painted_distribution.name ? (
                  <ListItemIcon
                    style={{
                      height: "100px",
                      width: "110px",
                      display: "block",
                    }}
                  >
                    <SVGRegionVisual
                      gID={layerInfo.D_ID}
                      pathId={parentId}
                      color={color}
                      HMAP_ID={layerInfo.HMAP_ID}
                      opacity={opacity}
                      pattern={pattern}
                      name={listSubtype}
                    />
                  </ListItemIcon>
                ) : (
                  <ListItemIcon
                    style={{
                      height: "100px",
                      width: "110px",
                      display: "block",
                    }}
                  >
                    <SVGRegionVisual
                      gID={layerInfo.D_ID}
                      pathId={parentId}
                      pinId={itemId}
                      color={COLOR_PIN_HIERARCHY}
                      HMAP_ID={layerInfo.HMAP_ID}
                      opacity={OPACITY_PIN_HIERARCHY}
                    />
                  </ListItemIcon>
                )}

                <ListItemText
                  primary={
                    <NameRenderer
                      sns={sns}
                      noEdit={true}
                      names={names}
                      // auto_related_pin={auto_related_pin}
                      pinListSettings={pinListSettings}
                    />
                  }
                />
              </ListItem>
            ) : null;
          })}
        </List>
      </Popover>

      {hierarchyButton && show && (
        <Tooltip title={uiData.icon_HierarchicalSelector_help?.tr_text}>
          <IconButton
            disabled={hierarchy.length === 0}
            onClick={(e) => {
              setPopOverRef(e.currentTarget);
            }}
            style={{ visibility: pathId ? "visible" : "hidden" }}
          >
            <HierarchyIcon
              style={{
                width: 20,
                height: 20,
                fill: "currentColor",
              }}
            />
          </IconButton>
        </Tooltip>
      )}

      {LIST_TYPES.painted_distribution.name !== listType && label && (
        <PinWithLabel order={order} index={index} shape={shape} color={color} />
      )}
      {pathId && show ? (
        <NameRenderer
          names={names}
          sns={sns}
          noEdit={!isNameEditable}
          onClickEdit={(e) => {
            dispatch(openNameBuilderModal(itemId));
          }}
          // auto_related_pin={auto_related_pin}
          pinListSettings={pinListSettings}
        />
      ) : (
        <i
          style={{
            fontSize: ".85rem",
            display: "flex",
            alignItems: "flex-start",
            // width: "100%",
          }}
        >
          <span>{uiData.listItem_PinNotOnAnatomicSite?.tr_text}</span>
          <Tooltip title={uiData.listItem_PinNotOnAnatomicSite_help?.tr_text}>
            <Help fontSize="small" style={{ cursor: "pointer" }} />
          </Tooltip>
        </i>
      )}
    </div>
  );
};

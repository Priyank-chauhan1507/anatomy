import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ORDERS } from "../../constants/itemConstants";
import { LIST_TYPES } from "../../constants/listsConstants";
import useTranslations from "../../hooks/useTranslations";
import { addMarker, chooseList, removePin } from "../../utils/helpers";
import { getPinDescriptionText } from "../../utils/pinUtils";

import { ClickAwayListener, IconButton, Tooltip } from "@material-ui/core";
import {
  AddAPhotoRounded,
  Delete,
  InsertDriveFile,
  InsertLink,
} from "@material-ui/icons";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  changeAttributeOfAList,
  onAddFile,
  removeItem,
} from "../../store/slices/lists";
import { openLinkEditor } from "../../store/slices/modals";
import { storeFile, storeImage } from "../../utils/fileCache";
import ButtonWithCount from "../Buttons/ButtonWithCount";
import ItemDiagnosis from "../ListItemComponents/ItemDiagnosis";
import { NameAndPinRendererWithHierarchy } from "../ListItemComponents/NameAndPinRendererWithHierarchy";
import {
  ItemRegionPreview,
  PinDescriptionRenderer,
} from "../ListsRenderer/ItemTemplates";
import PinWithLabel from "../PinWithLabel";
import { setSelectedItemId } from "../../store/slices/app";

// const COLOR_PIN_HIERARCHY = "#777";
// const OPACITY_PIN_HIERARCHY = ".4";

export const ContextMenu = ({ itemId, onDragPin }) => {
  const dispatch = useDispatch();
  const { uiData } = useTranslations();
  const fileUploadRef = useRef();
  const imageUploadRef = useRef();
  // const sns = useSNS(itemId);
  const index = useSelector((state) => state.listStore.itemsOrderMap[itemId]);
  const { listType, listSubtype } = useSelector(
    (state) => state.listStore.itemsMap[itemId]
  );
  const { color, order, shape, locked } = useSelector(
    (state) => chooseList(state.listStore.lists, listType, listSubtype).attr
  );
  const linkCount = useSelector(
    (state) => state.listStore.itemsMap[itemId].links.length
  );
  const files = useSelector((state) => state.listStore.itemsMap[itemId].files);
  const [filesCount, setFilesCount] = useState(0);
  const [imagesCount, setImagesCount] = useState(0);

  useEffect(() => {
    let newImagesCount = 0;
    let newFilesCount = 0;
    files.forEach(({ contentType }) => {
      if (contentType === "image") {
        newImagesCount++;
      } else {
        newFilesCount++;
      }
    });
    setFilesCount(newFilesCount);
    setImagesCount(newImagesCount);
  }, [files]);

  const handleOpenLinkEditor = (e) => {
    dispatch(
      openLinkEditor({
        itemId,
        isGrouped: false,
        listType: "",
        listSubtype: "",
      })
    );
  };

  const handleUploadFileClick = (e) => {
    fileUploadRef.current.click();
  };

  const handleUploadFile = (e) => {
    e.stopPropagation();
    const files = e.target.files;
    if (files[0]) {
      const id = storeFile(files[0]);
      dispatch(
        onAddFile({
          itemId,
          file: {
            name: files[0].name,
            type: files[0].type,
            fileCreationDate: files[0].lastModifiedDate,
            id,
            contentType: "doc",
          },
        })
      );
    }
  };

  const handleUploadImageClick = (e) => {
    imageUploadRef.current.click();
  };

  const handleUploadImage = (e) => {
    const files = e.target.files;
    if (files[0]) {
      const id = storeImage(files[0]);
      dispatch(
        onAddFile({
          itemId,
          file: {
            name: files[0].name,
            type: files[0].type,
            fileCreationDate: files[0].lastModifiedDate,
            id,
            contentType: "image",
          },
        })
      );
    }
  };

  const onRemove = useCallback(
    (e) => {
      dispatch(removeItem({ itemId, pushToBin: true }));
    },
    [dispatch, itemId]
  );

  const onLockChange = useCallback(
    (e) => {
      e.stopPropagation();

      dispatch(
        changeAttributeOfAList({
          listType,
          listSubtype,
          name: "locked",
        })
      );
    },
    [dispatch, listType, listSubtype]
  );

  return (
    <div style={{ padding: "20px", background: "#EEFCFF", color: "#000" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}>
        <NameAndPinRendererWithHierarchy itemId={itemId} label={false} />

        <div style={{ flex: 1 }}>
          <ItemRegionPreview
            itemId={itemId}
            listType={listType}
            height={60}
            width={60}
          />
        </div>
      </div>

      <ItemDiagnosis itemId={itemId} />
      <div style={{ display: "flex" }}>
        {LIST_TYPES.painted_distribution.name !== listType && (
          <PinWithLabel
            order={order}
            index={index}
            shape={shape}
            color={color}
          />
        )}
        {LIST_TYPES.painted_distribution.name !== listType && (
          <span style={{ color: "red" }}>&#8212;</span>
        )}
        {!(listType === LIST_TYPES.painted_distribution.name) && (
          <PinDescriptionRenderer itemId={itemId} />
        )}
      </div>
      <input
        ref={fileUploadRef}
        type='file'
        accept='*'
        hidden
        onChange={handleUploadFile}
      />

      <input
        ref={imageUploadRef}
        type='file'
        accept='image/*'
        hidden
        onChange={handleUploadImage}
      />
      <div className='listContent_itemToolbar'>
        <ButtonWithCount onClick={handleUploadImageClick} count={imagesCount}>
          <Tooltip title={uiData.icon_AddPhoto_help.tr_text}>
            <AddAPhotoRounded />
          </Tooltip>
        </ButtonWithCount>

        <ButtonWithCount count={filesCount} onClick={handleUploadFileClick}>
          <Tooltip title={uiData.icon_AddAttachment_help.tr_text}>
            <InsertDriveFile />
          </Tooltip>
        </ButtonWithCount>

        <ButtonWithCount count={linkCount} onClick={handleOpenLinkEditor}>
          <Tooltip title={uiData.icon_LinkEditor_help.tr_text}>
            <InsertLink />
          </Tooltip>
        </ButtonWithCount>

        <IconButton onClick={onRemove} disabled={locked}>
          <Delete
            style={{
              opacity: locked ? "0.5" : "",
            }}
          />
        </IconButton>

        <IconButton
          // className="app__mainBody__list__action__btns"
          onClick={onLockChange}>
          {locked ? (
            <Tooltip title={uiData.icon_LockToggle_help.tr_text}>
              <div>{uiData?.label_ListHeader_Lock?.emoji_code}</div>
            </Tooltip>
          ) : (
            <Tooltip title={uiData.icon_LockToggle_help.tr_text}>
              <div>{uiData?.label_ListHeader_Unlock?.emoji_code}</div>
            </Tooltip>
          )}
        </IconButton>
      </div>
    </div>
  );
};

const PointRenderer = ({
  id,
  color,
  index,
  order,
  shape,
  listType,
  // isLeftToRight,
  boxDimen,
  isSeaAllowed,
}) => {
  const { x, y } = useSelector(
    (state) => state.listStore.itemsMap[id].coords.svgCoords
  );
  const isLeftToRight = x > 2700 ? false : true;

  const mapContext = useSelector((state) => state.app.mapContext);

  const descriptions = useSelector(
    (state) => state.listStore.itemsMap[id].descriptions
  );
  const visibility = useSelector(
    (state) => state.listStore.itemsMap[id].pinDescriptionVisibility
  );
  const descriptionText = getPinDescriptionText(descriptions);
  const pointRef = useRef(null);

  useEffect(() => {
    const data = {
      coords: { x, y },
      id,
      fillColor: color,
      pinShape: shape,
      listType,
      label: order ? ORDERS[order].resolve(index) : "",
      left_to_right: isLeftToRight,
      description: descriptionText,
      visibility,
      isSeaAllowed,
      mapContext,
    };
    if (!pointRef.current) {
      pointRef.current = addMarker(data);
    } else {
      pointRef.current?.remove();
      pointRef.current = addMarker(data);
    }
  }, [
    color,
    order,
    index,
    shape,
    x,
    y,
    id,
    listType,
    isLeftToRight,
    descriptionText,
    visibility,
    isSeaAllowed,
    mapContext,
  ]);

  useEffect(() => {
    return () => {
      pointRef.current?.remove();
    };
  }, []);

  // return null;
  return null;
};

const RegionRenderer = ({
  id,
  color,
  opacity,
  pattern,
  backgroundColor,
  name,
  // isLeftToRight,
  boxDimen,
  isSeaAllowed,
}) => {
  const regionRef = useRef(null);
  const markerRef = useRef(null);
  const pathId = useSelector((state) => state.listStore.itemsMap[id].pathId);

  const { x, y } = useSelector(
    (state) => state.listStore.itemsMap[id].coords.svgCoords
  );
  const isLeftToRight = x > 2350 ? false : true;

  const mapContext = useSelector((state) => state.app.mapContext);

  const descriptions = useSelector(
    (state) => state.listStore.itemsMap[id].descriptions
  );
  const visibility = useSelector(
    (state) => state.listStore.itemsMap[id].pinDescriptionVisibility
  );
  const descriptionText = getPinDescriptionText(descriptions);

  useEffect(() => {
    regionRef.current = document.getElementById(pathId);
    if (regionRef.current) {
      regionRef.current.classList.add(`active-distribution-class`);
      regionRef.current.classList.add("distribution-regions");
      regionRef.current.setAttribute("data-marker-id", id);
      const fill =
        pattern === "dash"
          ? `url(#pattern-circles-${name})`
          : pattern === "dash_dash"
          ? `url(#pattern-checkers-${name})`
          : pattern === "dot"
          ? `url(#pattern-chevron-${name})`
          : color;
      // regionRef.current.style.fill = color;
      regionRef.current.setAttribute("fill", fill);
      regionRef.current.setAttribute("data-fill", fill);
      regionRef.current.setAttribute("data-opacity", opacity);
      // regionRef.current.setAttribute("stroke", backgroundColor)

      regionRef.current.style.opacity = opacity;
      markerRef.current = addMarker({
        coords: { x, y },
        id,
        fillColor: color,
        pinShape: "anchor",
        label: "",
        left_to_right: isLeftToRight,
        description: descriptionText,
        visibility,
        isArea: true,
        regionFill: fill,
        pathId: pathId,
        opacity,
        isSeaAllowed,
        mapContext,
      });
    }
    return () => {
      if (regionRef.current) {
        regionRef.current.classList.remove(`active-distribution-class`);
        regionRef.current.removeAttribute("data-fill");
        regionRef.current.removeAttribute("data-opacity");
        regionRef.current.removeAttribute("data-marker-id");
        regionRef.current.style.fill = null;
        // regionRef.current.removeAttribute("fill");
        regionRef.current.style.opacity = "";
        // regionRef.current.onclick = ""
      }
      if (markerRef.current) {
        markerRef.current.remove();
      }
    };
    //eslint-disable-next-line
  }, [
    id,
    pathId,
    opacity,
    color,
    pattern,
    backgroundColor,
    name,
    isSeaAllowed,
    mapContext,
  ]);

  return null;
};

export default function ItemsRenderer() {
  const isSVGLoaded = useSelector((state) => state.app.isSVGLoaded);
  const { languagesData, language } = useTranslations();
  // const isLeftToRight = languagesData[language]?.left_to_right === "TRUE";
  let svg = null;
  let boxDimen = null;
  if (isSVGLoaded) {
    svg = document.querySelector("#loaded-svg-cont>svg");
    boxDimen = svg.getBoundingClientRect();
  }

  const isLeftToRight = false;
  const orderedList = useSelector(
    (state) => state.listStore.lists[LIST_TYPES.ordered.name]
  );
  const distributionList = useSelector(
    (state) => state.listStore.lists[LIST_TYPES.painted_distribution.name]
  );
  const groupedProcedure = useSelector(
    (state) => state.listStore.lists[LIST_TYPES.grouped_procedure.name]
  );
  const groupedDiagnosis = useSelector(
    (state) => state.listStore.lists[LIST_TYPES.grouped_diagnosis.name]
  );
  const singleDiagnosis = useSelector(
    (state) => state.listStore.lists[LIST_TYPES.single_diagnosis.name]
  );
  const comments = useSelector(
    (state) => state.listStore.lists[LIST_TYPES.comments.name]
  );
  const defer = useSelector(
    (state) => state.listStore.lists[LIST_TYPES.defer.name]
  );

  const openContextMenu = useSelector(
    (state) => state.modals.contextMenu.state
  );

  useEffect(() => {
    if (!openContextMenu) {
      removePin();
    }
  }, [openContextMenu]);

  return (
    isSVGLoaded && (
      <Fragment>
        {/* Ordered Lists */}
        {orderedList.attr.visibility &&
          orderedList.itemsOrder.map(({ id }, index) => {
            return (
              <PointRenderer
                key={id}
                id={id}
                index={index}
                listType={LIST_TYPES.ordered.name}
                color={orderedList.attr.color}
                order={orderedList.attr.order}
                shape={orderedList.attr.shape}
                isLeftToRight={isLeftToRight}
                boxDimen={boxDimen}
                isSeaAllowed={!orderedList.attr.onlyOnMap}
              />
            );
          })}

        {comments.attr.visibility &&
          comments.itemsOrder.map(({ id }, index) => {
            return (
              <PointRenderer
                key={id}
                id={id}
                index={index}
                listType={LIST_TYPES.comments.name}
                color={comments.attr.color}
                order={comments.attr.order}
                shape={comments.attr.shape}
                isLeftToRight={isLeftToRight}
                boxDimen={boxDimen}
                isSeaAllowed={!comments.attr.onlyOnMap}
              />
            );
          })}
        {defer.attr.visibility &&
          defer.itemsOrder.map(({ id }, index) => {
            return (
              <PointRenderer
                key={id}
                id={id}
                index={index}
                listType={LIST_TYPES.defer.name}
                color={defer.attr.color}
                order={defer.attr.order}
                shape={defer.attr.shape}
                boxDimen={boxDimen}
                isLeftToRight={isLeftToRight}
                isSeaAllowed={!defer.attr.onlyOnMap}
              />
            );
          })}

        {singleDiagnosis.attr.visibility &&
          singleDiagnosis.itemsOrder.map(({ id }, index) => {
            return (
              <PointRenderer
                key={id}
                index={index}
                id={id}
                listType={LIST_TYPES.single_diagnosis.name}
                color={singleDiagnosis.attr.color}
                order={singleDiagnosis.attr.order}
                shape={singleDiagnosis.attr.shape}
                boxDimen={boxDimen}
                isLeftToRight={isLeftToRight}
                isSeaAllowed={!singleDiagnosis.attr.onlyOnMap}
              />
            );
          })}

        {/* Grouped Lists */}
        {LIST_TYPES.grouped_procedure.options.map(({ name }) => {
          const list = groupedProcedure[name];

          return (
            list.attr.visibility &&
            list.itemsOrder.map(({ id }, index) => (
              <PointRenderer
                key={id}
                index={index}
                order={list.attr.order}
                id={id}
                color={list.attr.color}
                shape={list.attr.shape}
                isLeftToRight={isLeftToRight}
                boxDimen={boxDimen}
                isSeaAllowed={!list.attr.onlyOnMap}
              />
            ))
          );
        })}
        {LIST_TYPES.grouped_diagnosis.options.map(({ name }) => {
          const list = groupedDiagnosis[name];
          return (
            list.attr.visibility &&
            list.itemsOrder.map(({ id }, index) => (
              <PointRenderer
                key={id}
                index={index}
                id={id}
                color={list.attr.color}
                order={list.attr.order}
                shape={list.attr.shape}
                boxDimen={boxDimen}
                isLeftToRight={isLeftToRight}
                isSeaAllowed={!list.attr.onlyOnMap}
              />
            ))
          );
        })}
        {/*Region List */}
        {LIST_TYPES.painted_distribution.options.map(({ name }) => {
          const list = distributionList[name];
          return (
            list.attr.visibility &&
            list.itemsOrder.map(({ id }, index) => {
              return (
                <RegionRenderer
                  key={id}
                  listType={LIST_TYPES.painted_distribution.name}
                  color={list.attr.color}
                  id={id}
                  pattern={list.attr.pattern}
                  opacity={list.attr.opacity}
                  backgroundColor={list.attr.backgroundColor}
                  name={name}
                  isLeftToRight={isLeftToRight}
                  boxDimen={boxDimen}
                  isSeaAllowed={!list.attr.onlyOnMap}
                />
              );
            })
          );
        })}
      </Fragment>
    )
  );
}

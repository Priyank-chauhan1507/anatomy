import { CircularProgress } from "@material-ui/core";
import React, { useContext, useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import { stringify } from "zipson";
import { LIST_TYPES } from "../../constants/listsConstants";
import { TranslationContext } from "../../contexts/translation";
import { changePinListDescription } from "../../store/slices/lists";
import { closeQrBuilderModal } from "../../store/slices/modals";
import { chooseList } from "../../utils/helpers";
import CustomizedDialogs from "./Dialog";
import { setItemVisibility } from "../../store/slices/lists";

import {
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@material-ui/core";

import { Help, Visibility, VisibilityOffOutlined } from "@material-ui/icons";
// const QR_CODE_OPTIONS = [
//   { id: 1, optionText: "Include Patient Info" },
//   { id: 2, optionText: "Include Encounter Details" },
//   { id: 3, optionText: "Include Pins" },
// ];

const QrCodeBuilder = () => {
  const dispatch = useDispatch();
  const {
    state: openModal,
    data: { listType, listSubtype, title },
  } = useSelector((state) => state.modals.qrBuilderModal);

  const userSettings = useSelector((state) => state.userSettings);
  const pinListSettings = useSelector((state) =>
    listType
      ? chooseList(state.listStore.lists, listType, listSubtype).attr
          .pinListSettings
      : {}
  );

  const itemsMap = useSelector((state) => state.listStore.itemsMap);
  const lists = useSelector((state) => state.listStore.lists);
  //eslint-disable-next-line
  const { language, uiData } = useContext(TranslationContext);

  let allItemsOrder = useSelector((state) =>
    listType == LIST_TYPES.grouped_procedure.name ||
    listType == LIST_TYPES.grouped_diagnosis.name
      ? state.listStore.lists[listType][listSubtype]?.itemsOrder
      : state.listStore.lists[listType]?.itemsOrder
  );

  const QR_CODE_OPTIONS = [
    {
      id: "use_qr",
      optionText: uiData.label_PinListSettings_QR_UseQRInList?.tr_text,
      help: uiData.label_PinListSettings_QR_UseQRInList_help?.tr_text,
    },
    {
      id: "include_patient_info",
      optionText: uiData.label_PinListSettings_QR_IncludePtInfo?.tr_text,
      help: uiData.label_PinListSettings_QR_IncludePtInfo_help?.tr_text,
    },
    {
      id: "load_originating_lang",
      optionText:
        uiData.label_PinListSettings_QR_LoadOriginatingLanguage?.tr_text,
      help: uiData.label_PinListSettings_QR_LoadOriginatingLanguage_help
        ?.tr_text,
    },
    {
      id: "include_encounter_info",
      optionText: uiData.label_PinListSettings_QR_IncludeEncInfo?.tr_text,
      help: uiData.label_PinListSettings_QR_IncludeEncInfo_help?.tr_text,
    },
  ];

  // const [qrBuilderOptions, setQrBuilderOptions] = useState(QR_CODE_OPTIONS);
  const [listQrCode, setListQrCode] = useState("");
  const [loader, setLoader] = useState(true);
  const timeoutRef = useRef();

  const itemsMapHandler = () => {
    const newItemsMap = [];
    let lst;

    if (Object.keys(itemsMap).length === 0) {
      return newItemsMap;
    } else {
      Object.keys(itemsMap).forEach((key) => {
        if (itemsMap[key].listType === listType) {
          if (lists[listType].isGroupMode) {
            if (itemsMap[key].listSubtype === listSubtype) {
              lst = itemsMap[key].listSubtype;
              newItemsMap.push({
                coords: `${itemsMap[key].coords.absCoords.x},${itemsMap[key].coords.absCoords.y},${itemsMap[key].coords.svgCoords.x},${itemsMap[key].coords.svgCoords.y}`,
                pathId: itemsMap[key].pathId,
              });
            }
          } else {
            lst = itemsMap[key].listSubtype;
            newItemsMap.push({
              coords: `${itemsMap[key].coords.absCoords.x},${itemsMap[key].coords.absCoords.y},${itemsMap[key].coords.svgCoords.x},${itemsMap[key].coords.svgCoords.y}`,
              pathId: itemsMap[key].pathId,
            });
          }
        }
      });

      return { lst, newItemsMap };
    }
  };

  useEffect(() => {
    if (!openModal) return;

    setLoader(false);
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const { lst, newItemsMap } = itemsMapHandler();
      const qrCodeValue = {
        lt: listType,
        lst: lst,
        items: newItemsMap,
      };

      Object.keys(pinListSettings).forEach((key) => {
        //eslint-disable-next-line
        switch (key) {
          case "show_pin_description":
            pinListSettings[key]
              ? (qrCodeValue["showPD"] = pinListSettings[key])
              : delete qrCodeValue[key];
            break;
          case "use_qr":
            pinListSettings[key]
              ? (qrCodeValue[key] = pinListSettings[key])
              : delete qrCodeValue[key];
            break;
          case "include_patient_info":
            pinListSettings[key]
              ? (qrCodeValue["PI"] = userSettings.patientInfo)
              : delete qrCodeValue["patientInfo"];
            break;
          case "load_originating_lang":
            pinListSettings[key]
              ? (qrCodeValue["lng"] = userSettings.language)
              : delete qrCodeValue["language"];
            break;
          case "include_encounter_info":
            pinListSettings[key]
              ? (qrCodeValue["EI"] = userSettings.encounterInfo)
              : delete qrCodeValue["encounterInfo"];
            break;
          case "use_enhanced_mod":
            pinListSettings[key]
              ? (qrCodeValue["useEM"] = pinListSettings[key])
              : delete qrCodeValue[key];
            break;
          case "auto_relate_pins":
            pinListSettings[key]
              ? (qrCodeValue[key] = pinListSettings[key])
              : delete qrCodeValue[key];
            break;
        }
      });
      const link =
        window.location.href +
        `?secret=1t5a53cr3t123&data=${stringify(qrCodeValue)}`;
      setListQrCode(encodeURI(link));

      setLoader(false);
    }, 2000); //eslint-disable-next-line
  }, [pinListSettings]);

  // For settting up QR code text value
  // useEffect(() => {
  //   const urlParamsObject = {
  //     secret: "1t5a53cr3t123",
  //     ...(language !== "en" && { language: language }),
  //     listType: listType,
  //     shape: selectedPinShape,
  //     color: listColor,
  //     chronology: selectedChronology,
  //   };

  //   // if (qrBuilderOptions.includes(QR_CODE_OPTIONS[0])) {
  //   //   const reducedPatientInfo = {};
  //   //   for (let key in patientForm.patientInfo) {
  //   //     if (String(patientForm.patientInfo[key]) !== "")
  //   //       reducedPatientInfo[key] = patientForm.patientInfo[key];
  //   //   }
  //   //   urlParamsObject.patientInfo = JSON.stringify(reducedPatientInfo);
  //   // }

  //   // if (qrBuilderOptions.includes(QR_CODE_OPTIONS[1])) {
  //   //   const reducedEncounterInfo = {
  //   //     ...(patientForm.encounterInfo.dateTime !== "" && {
  //   //       dateTime: patientForm.encounterInfo.dateTime,
  //   //     }),
  //   //     ...(patientForm.encounterInfo.sessionID !== 0 && {
  //   //       sessionID: patientForm.encounterInfo.sessionID,
  //   //     }),
  //   //     ...(patientForm.encounterInfo.notes !== "" && {
  //   //       notes: patientForm.encounterInfo.notes,
  //   //     }),
  //   //   };
  //   //   urlParamsObject.encounterInfo = JSON.stringify(reducedEncounterInfo);
  //   // }

  //   // if (qrBuilderOptions.includes(QR_CODE_OPTIONS[2])) {
  //   //   const items = [];
  //   //   listItems.forEach(
  //   //     ({
  //   //       content_id,
  //   //       biopsy__type,
  //   //       pin_description,
  //   //       user__notes,
  //   //       attrInfo,
  //   //       defined_name,
  //   //     }) => {
  //   //       const content = {
  //   //         content_id: content_id,
  //   //         biopsy__type: biopsy__type,
  //   //         pin_description: pin_description,
  //   //         ...(user__notes && { user__notes: user__notes }),
  //   //         devX: attrInfo.deviation.dev_x,
  //   //         devY: attrInfo.deviation.dev_y,
  //   //         defined_name: {},
  //   //       };

  //   //       let name = { ...defined_name };
  //   //       delete name.anatomic_site;

  //   //       for (let key in name) {
  //   //         if (
  //   //           Object.prototype.toString.call(name[key]) == "[object Function]"
  //   //         )
  //   //           continue;
  //   //         if (name[key]) content.defined_name[key] = name[key];
  //   //       }

  //   //       items.push(content);
  //   //     }
  //   //   );
  //   //   urlParamsObject.items = JSON.stringify(items);
  //   // }

  //   // setListQrCode(window.location.origin + getUrlGetParams(urlParamsObject));
  // }, [
  //   language,
  //   selectedPinShape,
  //   listColor,
  //   selectedChronology,
  //   listItems,
  //   listType,
  //   qrBuilderOptions,
  // ]);

  const handleCheckboxClick = (id) => {
    if (!id) return;
    const pinSettings = { ...pinListSettings };
    // if (!qrBuilderOptions.includes(value)) {
    //   setQrBuilderOptions((prev) => [...prev, value]);
    // } else {
    //   setQrBuilderOptions((prev) => prev.filter((val) => val.id !== value.id));
    // }
    Object.keys(pinSettings).forEach((key) => {
      if (key === id) {
        pinSettings[key] = !pinSettings[key];
      }
    });

    if (id === "show_pin_description") {
      if (pinSettings[id])
        Object.keys(allItemsOrder).forEach((key) => {
          dispatch(
            setItemVisibility({
              name: "pinDescriptionVisibility",
              itemId: allItemsOrder[key].id,
              toggle: 1,
            })
          );
        });
      else
        Object.keys(allItemsOrder).forEach((key) => {
          dispatch(
            setItemVisibility({
              name: "pinDescriptionVisibility",
              itemId: allItemsOrder[key].id,
              toggle: 0,
            })
          );
        });
    }

    dispatch(
      changePinListDescription({
        listType,
        listSubtype,
        name: "pinListSettings",
        value: pinSettings,
      })
    );
  };

  return (
    <CustomizedDialogs
      open={openModal}
      title={
        <Typography style={{ fontWeight: "bold", width: "140%" }}>
          {uiData.transtext_Settings?.emoji_code}{" "}
          {listType !== LIST_TYPES.painted_distribution.name
            ? `${uiData.label_PinListSettings?.tr_text} (${title})`
            : `${uiData.label_DistSegListSettings?.tr_text} (${title})`}
        </Typography>
      }
      onClose={() => dispatch(closeQrBuilderModal())}
      body={
        <div style={{ minWidth: 450, maxWidth: 600 }}>
          <div
            style={{
              width: "100%",
            }}
          >
            {/* <List
              style={{
                width: "100%",
              }}
              disablePadding
            > */}
            {listType !== LIST_TYPES.painted_distribution.name && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  color={"primary"}
                  icon={<VisibilityOffOutlined />}
                  checkedIcon={<Visibility />}
                  checked={pinListSettings.show_pin_description}
                  onClick={() => handleCheckboxClick("show_pin_description")}
                />
                <Typography>
                  {uiData.label_PinListSettings_ShowPinDesc?.tr_text}
                </Typography>{" "}
                &nbsp;
                <Tooltip
                  title={uiData.label_PinListSettings_ShowPinDesc_help?.tr_text}
                >
                  <Help />
                </Tooltip>
              </div>
            )}
            {/* </List> */}
            {listType !== LIST_TYPES.painted_distribution.name && (
              <Divider
                variant="fullWidth"
                style={{ margin: "10px 0px 10px 0px" }}
              />
            )}
            <Typography style={{ fontWeight: "bold" }}>
              {uiData.label_PinListSettings_QR_CodeBuilderSettings?.tr_text}
            </Typography>

            <List style={{ width: "100%" }} disablePadding>
              {QR_CODE_OPTIONS.map((value) => (
                <ListItem
                  key={value.id}
                  style={{ padding: 0, paddingLeft: 10 }}
                  disableGutters
                >
                  <Checkbox
                    edge="start"
                    checked={pinListSettings[value.id]}
                    onClick={() => handleCheckboxClick(value.id)}
                  />
                  <Typography>{value.optionText}</Typography>
                  &nbsp;
                  <Tooltip title={value.help}>
                    <Help />
                  </Tooltip>
                </ListItem>
              ))}
            </List>

            <div
              style={{
                margin: "15px auto 0 auto",
                width: "max-content",
              }}
            >
              <div style={{ position: "relative" }}>
                {loader && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                    }}
                  >
                    <CircularProgress size={40} />
                  </div>
                )}
                <QRCode
                  value={listQrCode}
                  style={{ opacity: loader ? 0.5 : 1 }}
                />
              </div>
            </div>
            {listType !== LIST_TYPES.painted_distribution.name && (
              <Divider
                variant="fullWidth"
                style={{ margin: "10px 0px 10px 0px" }}
              />
            )}
            {listType !== LIST_TYPES.painted_distribution.name && (
              <List style={{ width: "100%" }} disablePadding>
                <ListItem style={{ padding: 0 }} disableGutters>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      // disabled={true}
                      checked={pinListSettings.use_enhanced_mod}
                      onClick={() => handleCheckboxClick("use_enhanced_mod")}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={uiData.label_PinListSettings_UseEnhanced?.tr_text}
                    style={{ flexGrow: 0 }}
                  />
                  &nbsp;
                  <Tooltip
                    title={
                      uiData.label_PinListSettings_UseEnhanced_help?.tr_text
                    }
                  >
                    <Help />
                  </Tooltip>
                </ListItem>
                <ListItem style={{ padding: 0 }} disableGutters>
                  <ListItemIcon>
                    <Checkbox
                      //   disabled={true}
                      edge="start"
                      checked={pinListSettings.auto_relate_pins}
                      onClick={() => handleCheckboxClick("auto_relate_pins")}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={uiData.label_PinListSettings_AutoRelate?.tr_text}
                    style={{ flexGrow: 0 }}
                  />
                  &nbsp;
                  <Tooltip
                    title={
                      uiData.label_PinListSettings_AutoRelate_help?.tr_text
                    }
                  >
                    <Help />
                  </Tooltip>
                </ListItem>
              </List>
            )}
          </div>
        </div>
      }
    />
  );
};

export default QrCodeBuilder;

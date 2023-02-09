import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Help } from "@material-ui/icons";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parse } from "zipson";
import AnatomyMapperMain from "./AnatomyMapperMain";
import ColorLegendModal from "./components/ColorLegendModal";
import QrBuilderModal from "./components/Dialog/SubToolBarDialog";
import DisablePopup from "./components/DisablePopup";
import EncounterSettings from "./components/EncounterSettings/EncounterSettings";
import FileNameBuilder from "./components/FileNameBuilder";
import FolderNameBuilder from "./components/FolderNameBuilder";
import DiagnosisModal from "./components/ICD/DiagnosisModal";
import ItemImageModal from "./components/ItemImageModal";
import LinkDescriptionModal from "./components/LinkDescriptionModal";
import ListsRenderer from "./components/ListsRenderer";
import LinkGallery from "./components/ListsRenderer/LinkGalleryModal";
import SessionGallery from "./components/ListsRenderer/SessionGalleryModal";
import NameBuilder from "./components/NameBuilder";
import PatientInfoAccordion from "./components/PatientInfoAccordion";
import PinDescriptionModal from "./components/PinDescriptionModal";
import PrivacyPolicy from "./components/PrivacyPolicy";
import SitenameToCodeTranslator from "./components/SitenameToCodeTranslatorModal";
import SNSConfigurationModal from "./components/SNSConfigurationModal";
import StringToNameTranslatorModal from "./components/StringToNameTranslatorModal";
import TermsAndConditions from "./components/TermsAndConditions";
import UserSettingsAccordion from "./components/UserSettingsAccordion/UserSettingsAccordion";
import ClinicInfoModal from "./components/ClinicInfoModal/index";

import { TranslationContext } from "./contexts/translation";
import "./css/app.css";
import "./css/global.css";
import Header from "./layouts/Header";
import ShowPatientInfoOnTitle from "./layouts/ShowPatientInfoOnTitle";
import { setSelectedItemId } from "./store/slices/app";
import { addItemUsingQr, changePinListDescription } from "./store/slices/lists";
import {
  changeEncounterInfo,
  changeOnlyLanguageSetting,
  changePatientInfo,
  changeUserSettings,
} from "./store/slices/userSettings";
import ConfirmationDialog from "./components/ConfirmationDialog";
import ToasterMessage from "./components/ToasterMessage";

const useTextfieldStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

// var diagnosesCodes = ["2F20.Z", "EA90"];

function App() {
  const [quickUndo, setQuickUndo] = useState(0);
  const [undoCanvas, setUndoCanvas] = useState(0);

  const dispatch = useDispatch();

  const isSVGLoaded = useSelector((state) => state.app.isSVGLoaded);
  const [isNotAgreed, setIsNotAgreed] = useState({
    open: false,
    isPrivacy: false,
  });

  const isLicenseAccepted = useSelector(
    (state) => state.userSettings.userSettings.acceptLic
  );

  const isPrivacyAccepted = useSelector(
    (state) => state.userSettings.userSettings.acceptStatement
  );
  const openlt = !isLicenseAccepted && !isNotAgreed.open;
  const openpp = !isPrivacyAccepted && !isNotAgreed.open;

  const isAccepted = !openpp && !openlt;

  const { lateralityData, egztData, uiData } = useContext(TranslationContext);

  useEffect(() => {
    if (isSVGLoaded) {
    }
  }, [isSVGLoaded]);

  const handleUserSettings = useCallback(
    (name, value) => {
      dispatch(changeUserSettings({ name: name, value: value }));
    },
    [dispatch]
  );

  useEffect(() => {
    const canvas = localStorage.getItem("canvas");
    if (isSVGLoaded && canvas !== undefined) {
      window.window.sketchRef.fromJSON(JSON.parse(canvas));
      localStorage.removeItem("canvas");
    }
  }, [isSVGLoaded]);

  const modifyPinListSettings = (listType, listSubtype, settings) => {
    const listAttr = {};
    if (Object.keys(settings).length === 0) return;

    Object.keys(settings).forEach((key) => {
      switch (key) {
        case "use_qr":
          listAttr[key] = settings[key];
          break;
        case "showPD":
          listAttr["show_pin_description"] = settings[key];
          break;
        case "useEM":
          listAttr["use_enhanced_mod"] = settings[key];
          break;
        case "auto_relate_pins":
          listAttr["auto_relate_pins"] = settings[key];
          break;
        case "lng":
          dispatch(changeOnlyLanguageSetting(settings[key]));
          break;
        case "PI":
          dispatch(changePatientInfo(settings[key]));
          break;
        case "EI":
          dispatch(changeEncounterInfo(settings[key]));
          break;
        default:
          break;
      }
    });
    dispatch(
      changePinListDescription({
        listType,
        listSubtype,
        name: "pinListSettings",
        value: listAttr,
      })
    );
  };

  useEffect(() => {
    const queryStr = new URLSearchParams(window.location.search);
    const data = queryStr.get("data");
    if (isSVGLoaded && data) {
      const { lt, lst, items, ...rest } = parse(decodeURI(data));
      items.forEach((el) => {
        const obj = {
          coords: el.coords,
          pathId: el.pathId,
          listType: lt,
          listSubtype: lst,
          uiData,
          lateralityData,
          egztData,
          enhance_modifier: el.em === "" ? [] : el.em.split(","),
          prefix: el.pre === "" ? [] : el.pre.split(","),
          suffix: el.suf === "" ? [] : el.suf.split(","),
        };
        dispatch(addItemUsingQr(obj));
      });
      modifyPinListSettings(lt, lst, rest);

      const newUrl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname;
      window.history.pushState({ path: newUrl }, "", newUrl);
    }
    // eslint-disable-next-line
  }, [isSVGLoaded]);

  return !uiData || openlt || openpp || isNotAgreed.open ? (
    <>
      <h1>...</h1>
      <TermsAndConditions
        openlt={openlt}
        handleReject={() => {
          setIsNotAgreed({
            open: true,
            isPrivacy: false,
          });
        }}
        handleAccept={() => {
          handleUserSettings("acceptLic", true);
        }}
      />

      <PrivacyPolicy
        openpp={openpp}
        handleReject={() => {
          setIsNotAgreed({
            open: true,
            isPrivacy: true,
          });
        }}
        handleAccept={() => {
          handleUserSettings("acceptStatement", true);
        }}
      />

      <DisablePopup
        {...isNotAgreed}
        handleClose={() => {
          setIsNotAgreed({
            open: false,
            isPrivacy: true,
          });
        }}
      />
    </>
  ) : (
    <>
      <NameBuilder />
      <ShowPatientInfoOnTitle />
      <StringToNameTranslatorModal />
      <SitenameToCodeTranslator />
      <ItemImageModal />
      <ColorLegendModal />
      <SNSConfigurationModal />
      <LinkDescriptionModal />
      <PinDescriptionModal />
      <DiagnosisModal />
      <QrBuilderModal />
      <FileNameBuilder />
      <FolderNameBuilder />
      <SessionGallery />
      <LinkGallery />
      <ClinicInfoModal />

      {isAccepted && (
        <div className="app" id="main-app">
          {/* ========================= */}
          {/* Navbar */}
          {/* ========================= */}

          <Header
            setUndoCanvas={setUndoCanvas}
            undoCanvas={undoCanvas}
            quickUndo={quickUndo}
          />

          {/* Main Body */}
          <div className="app__mainBody">
            <div className="app__mainBody__SVGMapper">
              <AnatomyMapperMain
                setUndoCanvas={setUndoCanvas}
                undoCanvas={undoCanvas}
                setQuickUndo={setQuickUndo}
                quickUndo={quickUndo}
              />
            </div>

            <div className="app__mainBody__list">
              <div className={"app__mainBody__list_with-scrollbar"}>
                <div
                  className={`accordion-root app__mainBody__list__patient__info__list`}
                >
                  <PatientInfoAccordion />
                  <UserSettingsAccordion
                    useTextfieldStyles={useTextfieldStyles}
                  />
                  <EncounterSettings useTextfieldStyles={useTextfieldStyles} />
                </div>
                <ListsRenderer />
                <div style={{ margin: "3px" }}>
                  <ConfirmationDialog />
                  <ToasterMessage />
                  <center>
                    <span
                      style={{ margin: "-2px 4px 0px 0px ", fontSize: "18px" }}
                    >
                      {uiData.label_PatentPending?.tr_text}{" "}
                    </span>
                    <Tooltip
                      title={uiData.label_PatentPending_help?.tr_text}
                      arrow
                    >
                      <Help />
                    </Tooltip>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

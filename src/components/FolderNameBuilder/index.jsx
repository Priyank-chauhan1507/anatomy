import React, { useState, useContext } from "react";
import CustomizedDialogs from "../Dialog/Dialog";
import {
  Checkbox,
  Chip,
  Fab,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Tooltip,
  Switch,
} from "@material-ui/core";
import Help from "@material-ui/icons/Help";
import AddIcon from "@material-ui/icons/Add";
import FormControl from "@material-ui/core/FormControl";
import { ReactSortable } from "react-sortablejs";

import { TranslationContext } from "../../contexts/translation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeFolderNameBuilder } from "../../store/slices/modals";
import PatientInfo from "../PatientInfo/PatientInfo";
import {
  dummyFileNameObject,
  FILE_NAME_BUILDER_DELIMITER_OPTIONS,
  FOLDER_NAME_BUILDER_OPTIONS,
  FOLDER_NAME_BUILDER_OPTIONS_MAP,
} from "../../constants/userSettings";
import { translateFileItems } from "../../utils/translationHelpers";
import { useCallback } from "react";
import { changeFolderNameSettings } from "../../store/slices/userSettings";

const FileNameSection = ({ setOtherSettings, delimiter, type, sequence }) => {
  const { uiData } = useContext(TranslationContext);
  const { useEmoji } = useSelector(
    (state) => state.userSettings.folderNameSettings
  );

  const selectedSequence = sequence.map((item) => item.id);

  const dispatch = useDispatch();
  const [addNameOpen, setAddNameOpen] = useState(false);

  const openAddName = () => {
    if (!addNameOpen) {
      setAddNameOpen(true);
    }
  };

  const setSequence = useCallback(
    (newSequence) => {
      dispatch(
        changeFolderNameSettings({
          name: type == "FOLDER" ? "folderSequence" : "sequence",
          value: newSequence,
        })
      );
    },
    [dispatch]
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: ".5rem",
          marginTop: ".5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <span>
            <strong>
              {type == "FOLDER"
                ? uiData?.label_FolderEP_FolderName?.tr_text
                : uiData.label_FNB_IndividFileName?.tr_text}{" "}
              :
            </strong>
          </span>
          {type == "FILE" && (
            <span style={{ fontSize: ".8rem", color: "red" }}>
              {uiData.label_FNB_IndividFileName_help?.tr_text}
            </span>
          )}
        </div>
        <FormControl sx={{ minWidth: 80, p: type == "FOLDER" ? 1 : 8 }}>
          <InputLabel id="delimiter-select">
            {uiData.label_FNB_Delimeter?.tr_text}
          </InputLabel>
          <Select
            labelId="delimiter-select-label"
            id="delimiter-select"
            value={useEmoji ? "\u2022" : delimiter}
            label="Delimiter"
            onChange={(e) => {
              if (useEmoji === false) {
                setOtherSettings(
                  type === "FOLDER" ? "folderDelimiter" : "delimiter",
                  e.target.value
                );
              }
              // setDelimiter(e.target.value);
            }}
          >
            {FILE_NAME_BUILDER_DELIMITER_OPTIONS.map((val) => {
              return (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          marginTop: "1rem",
          gap: ".5rem",
        }}
      >
        <Fab
          color="primary"
          aria-label="add"
          size="small"
          onClick={openAddName}
        >
          <AddIcon />
        </Fab>

        <ReactSortable
          list={sequence}
          setList={setSequence}
          animation={200}
          delayOnTouchStart={true}
          delay={2}
          onEnd={() => {}}
          handle=".sorting-handle"
        >
          {sequence.map((nameObj, index) => {
            if (!FOLDER_NAME_BUILDER_OPTIONS_MAP[nameObj.id]) return null;
            const title =
              nameObj.id === "BucketOrder"
                ? "BucketOrder"
                : translateFileItems(
                    FOLDER_NAME_BUILDER_OPTIONS_MAP[nameObj.id]
                      ?.translation_key,
                    { uiData }
                  );
            const color = FOLDER_NAME_BUILDER_OPTIONS_MAP[nameObj.id].color;
            return (
              <Chip
                key={nameObj.id}
                label={title}
                style={{ backgroundColor: color }}
                onDelete={(e) => {
                  setSequence(
                    sequence.filter((currObj) => currObj.id !== nameObj.id)
                  );
                }}
                className={"sorting-handle"}
              />
            );
          })}
        </ReactSortable>
      </div>

      {/*Another popup to add name fields*/}
      <CustomizedDialogs
        open={addNameOpen}
        onClose={() => {
          if (addNameOpen) {
            setAddNameOpen(false);
          }
        }}
        title={"Add name field"}
        body={
          <div style={{ width: 300 }}>
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel id="demo-multiple-checkbox-label">Fields</InputLabel>
              <Select
                multiple
                // fullWidth={true}
                value={selectedSequence}
                onChange={(e) => {
                  setSequence(e.target.value.map((id) => ({ id })));
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      // width: "300px",
                      minWidth: 300,
                    },
                  },
                }}
                renderValue={(selected) =>
                  selected
                    .map((val) =>
                      val === "BucketOrder"
                        ? "BucketOrder"
                        : translateFileItems(
                            FOLDER_NAME_BUILDER_OPTIONS_MAP[val]
                              .translation_key,
                            { uiData }
                          )
                    )
                    .join(", ")
                }
              >
                {FOLDER_NAME_BUILDER_OPTIONS.map((nameObj, index) => {
                  const title =
                    nameObj.name === "BucketOrder"
                      ? "BucketOrder"
                      : translateFileItems(nameObj.translation_key, { uiData });
                  return (
                    <MenuItem
                      key={nameObj.name}
                      value={nameObj.name}
                      title={title}
                    >
                      <Checkbox
                        checked={selectedSequence.indexOf(nameObj.name) > -1}
                      />
                      <ListItemText primary={title} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        }
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "grey",
          padding: ".5rem",
          marginTop: ".5rem",
        }}
      >
        <span
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
          }}
        >
          <span>
            <strong>
              {type === "FOLDER"
                ? uiData?.label_FolderEP_FolderNamePreview?.tr_text
                : uiData.label_FNB_FileNameExamplePreview?.tr_text}
            </strong>
          </span>{" "}
          <Tooltip
            placement="top"
            title={
              type === "FOLDER"
                ? uiData?.label_FolderEP_FolderNamePreview?.tr_text
                : uiData.label_FNB_FileNameExamplePreview_help?.tr_text
            }
          >
            <Help />
          </Tooltip>
        </span>
        <div style={{ fontSize: ".8rem", wordWrap: "break-word" }}>
          {selectedSequence
            .map((key) => {
              if (
                useEmoji &&
                dummyFileNameObject[key] &&
                key != "BucketOrder"
              ) {
                if (
                  uiData[FOLDER_NAME_BUILDER_OPTIONS_MAP[key].translation_key]
                    .emoji_code
                )
                  return (
                    uiData[FOLDER_NAME_BUILDER_OPTIONS_MAP[key].translation_key]
                      .emoji_code +
                    " " +
                    dummyFileNameObject[key]
                  );
                else return dummyFileNameObject[key];
              } else if (
                key !== "BucketOrder" &&
                uiData[FOLDER_NAME_BUILDER_OPTIONS_MAP[key].translation_key]
                  .element_AdditionalProperties
              ) {
                return (
                  uiData[FOLDER_NAME_BUILDER_OPTIONS_MAP[key].translation_key]
                    .element_AdditionalProperties + dummyFileNameObject[key]
                );
              } else {
                return dummyFileNameObject[key];
              }
            })
            .join(useEmoji ? "\u2022" : delimiter)}
        </div>
      </div>
    </>
  );
};

function FileNameBuilder(
  {
    // open,
    // handleClose,
  }
) {
  const { uiData } = useContext(TranslationContext);
  const { state: open } = useSelector(
    (state) => state.modals.folderNameBuilder
  );
  const {
    useEmoji,
    setZipPassword,
    exportPreference,
    exportFolderZip,
    folderSequence,
    folderDelimiter,
  } = useSelector((state) => state.userSettings.folderNameSettings);
  const dispatch = useDispatch();

  const setOtherSettings = (name, value) =>
    dispatch(changeFolderNameSettings({ name, value }));

  const handleClose = () => {
    dispatch(closeFolderNameBuilder());
  };

  return (
    uiData && (
      <CustomizedDialogs
        open={open}
        onClose={handleClose}
        title={
          uiData?.transtext_Configure?.tr_text +
          " " +
          uiData?.label_FolderEP_FolderName?.tr_text
        }
        body={
          <div
            style={{
              width: 400,
              marginBottom: 8,
            }}
          >
            {/* <PatientInfo color={"#000"} /> */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: ".5rem",
                marginTop: ".5rem",
              }}
            >
              <Tooltip
                placement="top"
                title={uiData.label_FNB_UseEmojis_help?.tr_text}
              >
                <Help />
              </Tooltip>
              <Switch
                checked={useEmoji}
                onChange={(e) => {
                  setOtherSettings("useEmoji", e.target.checked);
                }}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              <span>
                <strong>{uiData.label_FNB_UseEmojis?.tr_text}</strong>
              </span>{" "}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: ".5rem",
                marginTop: ".5rem",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Help />
                <span style={{ marginLeft: "3px", marginBottom: "3px" }}>
                  <strong>
                    {uiData?.label_FolderEP_ExportPreferences?.tr_text}
                  </strong>
                </span>{" "}
              </div>
              <Tooltip
                placement="top"
                title={uiData?.label_FolderEP_ExportPreferences?.tr_text}
              >
                <Help />
              </Tooltip>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: ".3rem",
                marginTop: ".5rem",
              }}
            >
              <Tooltip
                placement="top"
                title={uiData?.label_FolderEP_ExportPreferences?.tr_text}
              >
                <Help />
              </Tooltip>
              <div>
                <Switch
                  checked={exportPreference === "googleDrive"}
                  onChange={(e) => {
                    setOtherSettings(
                      "exportPreference",
                      exportPreference === "googleDrive" ? null : "googleDrive"
                    );
                  }}
                  color="primary"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <span>Google Drive</span>
              </div>
              <div>
                <Switch
                  checked={exportPreference === "dropBox"}
                  onChange={(e) => {
                    setOtherSettings(
                      "exportPreference",
                      exportPreference === "dropBox" ? null : "dropBox"
                    );
                  }}
                  color="primary"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <span>DropBox</span>
              </div>
              <div>
                <Switch
                  checked={exportPreference === "SFTP"}
                  onChange={(e) => {
                    setOtherSettings(
                      "exportPreference",
                      exportPreference === "SFTP" ? null : "SFTP"
                    );
                  }}
                  color="primary"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <span>SFTP</span>
              </div>
            </div>

            <Switch
              checked={exportFolderZip}
              onChange={(e) => {
                setOtherSettings("exportFolderZip", e.target.checked);
              }}
              color="primary"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            <span>{uiData?.label_FolderEP_ExportToFolder?.tr_text}</span>

            {folderSequence && (
              <FileNameSection
                setOtherSettings={setOtherSettings}
                type={"FOLDER"}
                sequence={folderSequence}
                delimiter={folderDelimiter}
              />
            )}
          </div>
        }
      />
    )
  );
}

export default FileNameBuilder;

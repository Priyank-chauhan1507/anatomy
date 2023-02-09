import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { DiscFull, ExpandMore, Help } from "@material-ui/icons";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LIST_TYPES } from "../../constants/listsConstants";
import useTranslations from "../../hooks/useTranslations";
import {
  changeGeneralSettings,
  changeMapSettings,
  changePatientInfo,
} from "../../store/slices/userSettings";
import PatientInfo from "../PatientInfo/PatientInfo";

import {
  FLITZPARK_OPTIONS,
  MONK_TYPE_OPTIONS,
} from "../../constants/userSettings";
import { onShow, removeItem } from "../../store/slices/lists";

// import { useSelector, useDispatch } from "react-redux";
const styledeleteModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  backgroundColor: "white",

  boxShadow: 24,
  padding: 10,
  width: "fit-content",
  maxHeight: "90%",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
export default function PatientInfoAccordion() {
  const { uiData, countriesList } = useTranslations();
  const patientInfo = useSelector((state) => state.userSettings.patientInfo);
  const showTabTitleAsPatientInfo = useSelector(
    (state) => state.userSettings.generalSettings.showTabTitleAsPatientInfo
  );
  const { hideOppositeGenderAnatomy, isOralAnatomyVisible } = useSelector(
    (state) => state.userSettings.mapSettings
  );
  // const deleteList = useSelector((state) => state.listStore.binList);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.listStore.itemsMap);
  const CheckOral = () => {
    let ret = false;
    for (let x in items) {
      // eslint-disable-next-line

      if (items[x].layerInfo.HG_IDs) {
        items[x].layerInfo.HG_IDs.forEach((y) => {
          if (y === "HG-Oral_Anatomy") {
            if (
              items[x].listType === LIST_TYPES.painted_distribution.name &&
              items[x].show === true
            ) {
              ret = true;
            } else if (
              items[x].listType !== LIST_TYPES.painted_distribution.name
            ) {
              ret = true;
            }
          }
        });
      }
    }
    return ret;
  };
  const CheckSex = () => {
    let ret = false;
    if (patientInfo.gender === "male") {
      for (let x in items) {
        // eslint-disable-next-line
        if (items[x].layerInfo.HG_IDs) {
          items[x].layerInfo.HG_IDs.forEach((y) => {
            if (y === "HG-Female_Anatomy") {
              ret = true;
            }
          });
        }
      }
    } else {
      for (let x in items) {
        // eslint-disable-next-line
        if (items[x].layerInfo.HG_IDs) {
          items[x].layerInfo.HG_IDs.forEach((y) => {
            if (y === "HG-Male_Anatomy") {
              ret = true;
            }
          });
        }
      }
    }
    return ret;
  };
  const RemoveOral = () => {
    const AnatomicName = false;
    for (let x in items) {
      if (items[x].layerInfo.HG_IDs) {
        items[x].layerInfo.HG_IDs.forEach((y) => {
          if (y === "HG-Oral_Anatomy") {
            const itemId = items[x].id;
            if (items[x].listType !== LIST_TYPES.painted_distribution.name) {
              dispatch(onShow({ AnatomicName, itemId }));
            } else {
              if (items[x].show === true) {
                dispatch(onShow({ AnatomicName, itemId }));
                onRemove(itemId);
              }
            }
          }
        });
      }
    }
  };
  const displayOral = () => {
    for (let x in items) {
      if (items[x].layerInfo.HG_IDs) {
        items[x].layerInfo.HG_IDs.forEach((y) => {
          if (y === "HG-Oral_Anatomy") {
            const itemId = items[x].id;
            if (items[x].listType !== LIST_TYPES.painted_distribution.name) {
              const AnatomicName = true;
              dispatch(onShow({ AnatomicName, itemId }));
            }
          }
        });
      }
    }
  };

  const RemoveSex = () => {
    const AnatomicName = false;

    if (patientInfo.gender === "male") {
      for (let x in items) {
        if (items[x].layerInfo.HG_IDs) {
          items[x].layerInfo.HG_IDs.forEach((y) => {
            if (y === "HG-Female_Anatomy") {
              const itemId = items[x].id;
              if (items[x].listType !== LIST_TYPES.painted_distribution.name) {
                dispatch(onShow({ AnatomicName, itemId }));
              } else {
                if (items[x].show === true) {
                  dispatch(onShow({ AnatomicName, itemId }));
                  onRemove(itemId);
                }
              }
            }
          });
        }
      }
    } else {
      for (let x in items) {
        if (items[x].layerInfo.HG_IDs) {
          items[x].layerInfo.HG_IDs.forEach((y) => {
            if (y === "HG-Male_Anatomy") {
              const itemId = items[x].id;
              if (items[x].listType !== LIST_TYPES.painted_distribution.name) {
                dispatch(onShow({ AnatomicName, itemId }));
              } else {
                if (items[x].show === true) {
                  dispatch(onShow({ AnatomicName, itemId }));

                  onRemove(itemId);
                }
              }
            }
          });
        }
      }
    }
  };
  const RemoveSex1 = () => {
    const AnatomicName = false;

    if (patientInfo.gender === "female") {
      for (let x in items) {
        if (items[x].layerInfo.HG_IDs) {
          items[x].layerInfo.HG_IDs.forEach((y) => {
            if (y === "HG-Female_Anatomy") {
              const itemId = items[x].id;
              if (items[x].listType !== LIST_TYPES.painted_distribution.name) {
                dispatch(onShow({ AnatomicName, itemId }));
              } else {
                if (items[x].show === true) {
                  dispatch(onShow({ AnatomicName, itemId }));
                  onRemove(itemId);
                }
              }
            }
          });
        }
      }
    } else {
      for (let x in items) {
        if (items[x].layerInfo.HG_IDs) {
          items[x].layerInfo.HG_IDs.forEach((y) => {
            if (y === "HG-Male_Anatomy") {
              const itemId = items[x].id;
              if (items[x].listType !== LIST_TYPES.painted_distribution.name) {
                dispatch(onShow({ AnatomicName, itemId }));
              } else {
                if (items[x].show === true) {
                  dispatch(onShow({ AnatomicName, itemId }));

                  onRemove(itemId);
                }
              }
            }
          });
        }
      }
    }
  };
  const displaySex = () => {
    if (patientInfo.gender === "male") {
      for (let x in items) {
        if (items[x].layerInfo.HG_IDs) {
          items[x].layerInfo.HG_IDs.forEach((y) => {
            if (y === "HG-Female_Anatomy") {
              const itemId = items[x].id;
              if (items[x].listType !== LIST_TYPES.painted_distribution.name) {
                const AnatomicName = true;
                dispatch(onShow({ AnatomicName, itemId }));
              }
            }
          });
        }
      }
    } else {
      for (let x in items) {
        if (items[x].layerInfo.HG_IDs) {
          items[x].layerInfo.HG_IDs.forEach((y) => {
            if (y === "HG-Male_Anatomy") {
              const itemId = items[x].id;
              if (items[x].listType !== LIST_TYPES.painted_distribution.name) {
                const AnatomicName = true;
                dispatch(onShow({ AnatomicName, itemId }));
              }
            }
          });
        }
      }
    }
  };

  const onRemove = (itemId) => {
    const pushToBin = true;
    dispatch(removeItem({ itemId, pushToBin }));
  };

  const [showOral, setShowOral] = useState(false);
  const [showOpposite, setShowOpposite] = useState(false);
  //const dispatch = useDispatch();
  const handlePatientInfoChange = (e) => {
    if (e.target.name === "country") {
      dispatch(changePatientInfo({ name: "country", value: e.target.value }));
      dispatch(
        changePatientInfo({
          name: "countryOpts",
          value: countriesList.find(
            (country) => country.code === e.target.value
          ),
        })
      );
    } else {
      if (e.target.name === "gender") {
        RemoveSex1();
        displaySex();
      }

      dispatch(
        changePatientInfo({ name: e.target.name, value: e.target.value })
      );
    }
  };

  const toggleMapSettings = useCallback(
    (name) => {
      dispatch(changeMapSettings({ name: name }));
    },
    [dispatch]
  );

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className="app__mainBody__list__header"
        style={{ backgroundColor: "#0c27c8" }}
      >
        <PatientInfo color={"#fff"} />
      </AccordionSummary>
      <AccordionDetails className="app__mainBody__list__body">
        <Typography component={"div"}>
          <form className={"textFieldClasses"} noValidate autoComplete="off">
            <TextField
              id="patient-first-name"
              label={
                uiData.label_FNB_PtFirstName?.emoji_code +
                " " +
                uiData.label_PT_FirstName?.tr_text
              }
              value={patientInfo.firstName}
              name={"firstName"}
              onChange={handlePatientInfoChange}
              style={{ width: "96%" }}
            />

            <TextField
              id="patient-last-name"
              label={
                uiData.label_FNB_PtLastName?.emoji_code +
                " " +
                uiData.label_PT_LastName?.tr_text
              }
              name={"lastName"}
              value={patientInfo.lastName}
              onChange={handlePatientInfoChange}
              style={{ width: "96%" }}
            />
            <TextField
              id="patient-preferred-name"
              label={uiData.label_PT_PreferredName?.tr_text}
              value={patientInfo.preferredName}
              name={"preferredName"}
              onChange={handlePatientInfoChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Tooltip
                      title={uiData.label_PT_PreferredName_help?.tr_text}
                      enterTouchDelay={30}
                      arrow
                    >
                      <Help style={{ cursor: "pointer" }} />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              style={{ width: "96%" }}
            />

            <Grid
              container
              justifyContent="space-around"
              style={{
                marginTop: "0px",
                marginBottom: "0px",
                width: "96%",
              }}
            >
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label={
                  uiData.label_FNB_PtDOB?.emoji_code +
                  " " +
                  uiData.label_PT_DOB?.tr_text
                }
                format="yyyy-MM-dd"
                placeholder="2021-12-31"
                value={patientInfo.DOB}
                onChange={(date) => {
                  handlePatientInfoChange({
                    target: { name: "DOB", value: date },
                  });
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                style={{
                  width: "100%",
                  marginTop: "10px",
                }}
              />
            </Grid>

            <FormControl
              component="fieldset"
              style={{ marginBottom: "0px", width: "100%" }}
            >
              <FormLabel component="legend">
                {uiData.label_FNB_PtSex?.emoji_code +
                  " " +
                  uiData.label_PT_Sex?.tr_text}
              </FormLabel>
              <RadioGroup
                row
                aria-label="position"
                name="gender"
                defaultValue={patientInfo.gender}
                onChange={handlePatientInfoChange}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio color="primary" />}
                  label={`${uiData.Symbol_Male?.emoji_code} ${uiData.label_PT_Sex_Male?.tr_text}`}
                />
                <FormControlLabel
                  value="female"
                  control={<Radio color="primary" />}
                  label={`${uiData.Symbol_Female?.emoji_code} ${uiData.label_PT_Sex_Female?.tr_text}`}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio color={"primary"} />}
                  label={`${uiData.Symbol_OtherSex?.emoji_code} ${uiData.label_PT_Sex_Other?.tr_text}`}
                />
              </RadioGroup>
            </FormControl>

            <br />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showTabTitleAsPatientInfo}
                  onChange={() => {
                    dispatch(
                      changeGeneralSettings({
                        name: "showTabTitleAsPatientInfo",
                        value: !showTabTitleAsPatientInfo,
                      })
                    );
                  }}
                  name="Show Page Info in Page Title "
                  color="primary"
                />
              }
              style={{
                marginLeft: "-3.5px",
                marginBottom: "0px",
                width: "100%",
              }}
              // label={
              //   uiData.label_PT_HideOppositeSexAnatomyOnMap
              // }
              label={
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                  }}
                >
                  {uiData.label_PT_ShowPtInfoInPageTitle?.tr_text}
                  <Tooltip
                    title={uiData.label_PT_ShowPtInfoInPageTitle_help?.tr_text}
                    arrow
                    enterTouchDelay={30}
                  >
                    <Help style={{ cursor: "pointer" }} />
                  </Tooltip>
                </span>
              }
            />
            <FormControlLabel
              disabled={patientInfo.gender === "other"}
              control={
                <Checkbox
                  checked={hideOppositeGenderAnatomy}
                  onChange={() => {
                    if (!hideOppositeGenderAnatomy && CheckSex()) {
                      setShowOpposite(!showOpposite);
                    } else {
                      toggleMapSettings("hideOppositeGenderAnatomy");
                      displaySex();
                    }
                  }}
                  name="Hide Opposite Sex Anatomy"
                  color="primary"
                />
              }
              style={{
                marginLeft: "-3.5px",
                marginBottom: "0px",
                width: "100%",
              }}
              // label={
              //   uiData.label_PT_HideOppositeSexAnatomyOnMap
              // }
              label={
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                  }}
                >
                  {uiData.label_PT_HideOppositeSexAnatomyOnMap?.tr_text}
                  <Tooltip
                    title={
                      uiData.label_PT_HideOppositeSexAnatomyOnMap_help?.tr_text
                    }
                    arrow
                    enterTouchDelay={30}
                  >
                    <Help style={{ cursor: "pointer" }} />
                  </Tooltip>
                </span>
              }
            />
            <ConfirmationModal
              show={showOpposite}
              display={displaySex}
              visible={hideOppositeGenderAnatomy}
              setShow={setShowOpposite}
              toggleMapSettings={toggleMapSettings}
              value={"hideOppositeGenderAnatomy"}
              Remove={RemoveSex}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isOralAnatomyVisible}
                  onChange={() => {
                    //toggleMapSettings("isOralAnatomyVisible");
                    // showOralAnatomy(!isOralAnatomyVisible)
                    if (CheckOral() && isOralAnatomyVisible) {
                      setShowOral(!showOral);
                    } else {
                      toggleMapSettings("isOralAnatomyVisible");
                      displayOral();
                    }
                  }}
                  name="Show Oral Anatomy"
                  color="primary"
                />
              }
              style={{
                marginLeft: "-3.5px",
                marginBottom: "0px",
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
              label={
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                  }}
                >
                  {uiData.label_PT_ShowOralAnatomy?.emoji_code +
                    " " +
                    uiData.label_PT_ShowOralAnatomy?.tr_text}{" "}
                  <Tooltip
                    title={uiData.label_PT_ShowOralAnatomy_help?.tr_text}
                    arrow
                    enterTouchDelay={30}
                  >
                    <Help style={{ cursor: "pointer" }} />
                  </Tooltip>
                </span>
              }
            />
            <ConfirmationModal
              show={showOral}
              display={displayOral}
              visible={isOralAnatomyVisible}
              setShow={setShowOral}
              toggleMapSettings={toggleMapSettings}
              value={"isOralAnatomyVisible"}
              Remove={RemoveOral}
            />
            <TextField
              id="patient-MRN"
              label={
                uiData.label_PT_MRN?.emoji_code +
                " " +
                uiData.label_PT_MRN?.tr_text
              }
              value={patientInfo.MRN}
              name={"MRN"}
              onChange={handlePatientInfoChange}
              style={{ width: "96%" }}
            />
            <TextField
              id="additional-patient-info"
              label={uiData.label_PT_AdditionalPatientInfo?.tr_text}
              value={patientInfo.additionalInfo}
              name={"additionalInfo"}
              onChange={handlePatientInfoChange}
              style={{ width: "96%" }}
            />
            <FormControl
              style={{
                marginBottom: "0px",
                width: "96%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <InputLabel id="patient-country">
                {uiData.label_PT_PatientCountry?.tr_text}
              </InputLabel>
              <Select
                labelId="patient-country"
                value={patientInfo.country}
                name={"country"}
                onChange={handlePatientInfoChange}
                //style={{ maxWidth: "80%", minWidth: "80%" }}
                style={{ width: "96%" }}
              >
                <MenuItem value={""}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",

                      justifyContent: "flex-start",
                      gap: ".5rem",
                    }}
                  >
                    {uiData.functionTitle_Clear?.tr_text +
                      " " +
                      uiData.label_PT_PatientCountry?.tr_text}
                  </span>
                </MenuItem>
                {countriesList &&
                  countriesList.map((country, index) => {
                    const code = country.alpha_2_code;
                    const name = country?.tr_text;
                    //const flag = country?.emoji_code;

                    return (
                      <MenuItem key={country.alpha_2_code} value={code}>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",

                            justifyContent: "flex-start",
                            gap: ".5rem",
                          }}
                        >
                          <img
                            src={`${
                              process.env.REACT_APP_BACKEND_URL
                            }/static/media/svgFlags/${code.toLowerCase()}.svg`}
                            width="25"
                            // alt={name}
                            alt=""
                          />
                          {name}{" "}
                        </span>
                      </MenuItem>
                    );
                  })}
              </Select>
              <Tooltip
                title={uiData.label_PT_PatientCountry_help?.tr_text}
                arrow
                enterTouchDelay={30}
              >
                <Help style={{ cursor: "pointer" }} />
              </Tooltip>
            </FormControl>

            <FormControl
              style={{
                marginBottom: "0px",
                width: "96%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <InputLabel id="fitzpatrick-skin-type">
                {uiData.label_PT_FitzType?.tr_text}
              </InputLabel>
              <Select
                labelId="fitzpatrick-skin-type"
                value={patientInfo.skinType}
                name={"skinType"}
                onChange={handlePatientInfoChange}
                //style={{ maxWidth: "80%", minWidth: "80%" }}
                style={{ width: "96%" }}
              >
                <MenuItem value={""}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",

                      justifyContent: "flex-start",
                      gap: ".5rem",
                    }}
                  >
                    {uiData.functionTitle_Clear?.tr_text +
                      " " +
                      uiData.label_PT_FitzType?.tr_text}
                  </span>
                </MenuItem>
                {FLITZPARK_OPTIONS.map(({ color, id }) => {
                  return (
                    <MenuItem key={id} value={id}>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",

                          justifyContent: "space-between",
                          gap: ".5rem",
                        }}
                      >
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            backgroundColor:
                              uiData["label_PT_Fitz" + id]?.element_code,
                            marginRight: 10,
                          }}
                        />
                        {uiData["label_PT_Fitz" + id]?.tr_text || ""}
                        {/* {eval(
                          `uiData.label_PT_Fitz${
                            index + 1
                          }?.tr_text`
                        )}{" "} */}
                        <Tooltip
                          title={
                            uiData["label_PT_Fitz" + id + "_help"]?.tr_text ||
                            ""
                          }
                          arrow
                          enterTouchDelay={30}
                        >
                          <Help style={{ cursor: "pointer" }} />
                        </Tooltip>
                      </span>
                    </MenuItem>
                  );
                })}
              </Select>
              <Tooltip
                title={uiData.label_PT_FitzType_help?.tr_text}
                arrow
                enterTouchDelay={30}
              >
                <Help style={{ cursor: "pointer" }} />
              </Tooltip>
            </FormControl>
            <FormControl
              style={{
                marginBottom: "0px",
                width: "96%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <InputLabel id="monk-skin-type">
                {uiData.label_PT_MonkType?.tr_text}
              </InputLabel>
              <Select
                labelId="monk-skin-type"
                value={patientInfo.monkType || ""}
                name={"monkType"}
                onChange={handlePatientInfoChange}
                //style={{ maxWidth: "80%", minWidth: "80%" }}
                style={{ width: "96%" }}
              >
                <MenuItem value={""}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",

                      justifyContent: "flex-start",
                      gap: ".5rem",
                    }}
                  >
                    {uiData.functionTitle_Clear?.tr_text +
                      " " +
                      uiData.label_PT_MonkType?.tr_text}
                  </span>
                </MenuItem>
                {MONK_TYPE_OPTIONS.map(({ color, id }, index) => {
                  return (
                    <MenuItem key={id} value={id}>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: ".5rem",
                        }}
                      >
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            backgroundColor: color,
                            marginRight: 10,
                          }}
                        />
                        {uiData["label_PT_Monk" + id]?.tr_text || ""}
                        <Tooltip
                          title={uiData["label_PT_Monk" + id]?.tr_text || ""}
                          arrow
                          enterTouchDelay={30}
                        >
                          <Help style={{ cursor: "pointer" }} />
                        </Tooltip>
                      </span>
                    </MenuItem>
                  );
                })}
              </Select>
              <Tooltip
                title={uiData.label_PT_MonkType_help?.tr_text}
                arrow
                enterTouchDelay={30}
              >
                <Help style={{ cursor: "pointer" }} />
              </Tooltip>
            </FormControl>
          </form>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
export const ConfirmationModal = ({
  show,
  setShow,
  display,
  visible,
  toggleMapSettings,
  value,
  Remove,
}) => {
  const { uiData } = useTranslations();
  // const dispatch = useDispatch();

  const onConfirm = () => {
    toggleMapSettings(value);
    setShow(!show);
    if (value === "isOralAnatomyVisible") {
      if (visible) Remove();
      else {
        display();
      }
    } else {
      if (!visible) Remove();
      else {
        display();
      }
    }
  };

  const onCloseModal = () => {
    setShow(!show);
  };
  return (
    <Modal
      open={show}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ outline: "none", border: "none" }}
    >
      <Box style={styledeleteModal}>
        <div>
          <h3 style={{}}>
            {uiData.alert_ListItemsOnDiagramsToBeHidden?.tr_text}
          </h3>
          <h3 style={{ marginTop: "15px" }}>
            {uiData.transtext_IfYouProceed?.tr_text}
          </h3>
          <h3>
            {uiData.alert_PinsWillLoseCustomizedNames?.tr_text}
            {uiData.listItem_PinNotOnAnatomicSite?.tr_text}
          </h3>
          <h3 style={{}}>{uiData.alert_DistSegsWillBeTrashed?.tr_text}</h3>

          <h3 style={{ marginTop: "15px", textAlign: "center" }}>
            {uiData.transtext_AreYouSure?.tr_text}
          </h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IconButton
              style={{
                transformX: "translate(-75%, -75%)",
              }}
              onClick={() => {
                // Delete
                //onDeleteFile();
                onConfirm();
              }}
            >
              {uiData.label_Yes?.tr_text}
            </IconButton>
            <IconButton
              style={{ transformX: "translate(-75%, -75%)" }}
              onClick={() => {
                onCloseModal();
              }}
            >
              {uiData.label_No?.tr_text}
            </IconButton>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

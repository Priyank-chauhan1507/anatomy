import React, { useCallback, useContext } from "react";

import { Button, Tooltip } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HelpIcon from "@material-ui/icons/Help";
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TranslationContext } from "../../contexts/translation";
import useFetch from "../../hooks/useFetch";
import { changeEncounterInfo } from "../../store/slices/userSettings";
import { getDate } from "../../utils/cf";
import getTime from "../../utils/getTime";
// import MultiDatePicker from "../MultiDatePicker/MultiDatePicker";

import gregorian_ar from "react-date-object/locales/gregorian_ar";
import gregorian_en from "react-date-object/locales/gregorian_en";
import gregorian_hi from "react-date-object/locales/gregorian_hi";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const EncounterSettings = ({ useTextfieldStyles }) => {
  const lang = useSelector((state) => state.userSettings.language);
  const languageMap = {
    ar: gregorian_ar,
    hi: gregorian_hi,
  };
  const textfieldClasses = useTextfieldStyles();
  // const [encounterInfo, setEncounterInfo] = useState(
  //     patientFormDetails.encounterInfo
  // );
  const { uiData } = useContext(TranslationContext);
  const encounterInfo = useSelector(
    (state) => state.userSettings.encounterInfo
  );
  const dispatch = useDispatch();
  const { isLoading, apiData } = useFetch("https://geolocation-db.com/json/");

  const handleEncounterInfoChange = useCallback(
    (e) => {
      dispatch(
        changeEncounterInfo({ name: e.target.name, value: e.target.value })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    if (isLoading === false) {
      dispatch(changeEncounterInfo({ name: "IPAdress", value: apiData?.IPv4 }));
    }
    //eslint-disable-next-line
  }, [isLoading]);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className="app__mainBody__list__header"
        style={{ backgroundColor: "#0c27c8" }}
      >
        <Typography className={"accordion-heading"}>
          <strong>{uiData.label_ENC_EncounterSettings?.tr_text}</strong>{" "}
          <small>
            {encounterInfo.dateTime && getDate(encounterInfo.dateTime) && (
              <span>
                {/* <i>{uiData.label_ENC_Date?.tr_text}</i>{" "} */}
                {uiData.label_FNB_EncounterDate?.emoji_code}{" "}
                {getDate(encounterInfo.dateTime)}{" "}
                {/* {displayLocaleDateText(
                  encounterInfo.dateTime
                )}{" "} to do */}
                {/* {new Date(
                encounterInfo.dateTime
              ).toDateString()}{" "} */}
                {uiData.label_FNB_EncounterTime?.emoji_code}{" "}
                {getTime(encounterInfo.dateTime)}
              </span>
            )}{" "}
            <br />
            {encounterInfo.notes && (
              <span>
                <i>{uiData.label_ENC_EncounterNotes?.tr_text}:</i>{" "}
                {encounterInfo.notes}
              </span>
            )}
          </small>
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="app__mainBody__list__body">
        <Typography component={"div"} style={{ width: "100%" }}>
          <Grid container justifyContent="space-around">
            {/* <KeyboardDatePicker */}
            {/*   maxDate={new Date()} */}
            {/*   maxDateMessage={uiData?.label_ENC_Date_FutureWarning?.tr_text} */}
            {/*   margin="normal" */}
            {/*   id="date-picker-dialog" */}
            {/*   label={ */}
            {/*     uiData.label_FNB_EncounterDate?.emoji_code + */}
            {/*     uiData.label_ENC_Date?.tr_text */}
            {/*   } */}
            {/*   format="yyyy-MM-dd" */}
            {/*   placeholder="2021-12-31" */}
            {/*   value={encounterInfo.dateTime} */}
            {/*   onChange={(date) => { */}
            {/*     // setEncounterInfo({ */}
            {/*     //     ...encounterInfo, */}
            {/*     //     dateTime: date, */}
            {/*     // }); */}
            {/**/}
            {/*     handleEncounterInfoChange({ */}
            {/*       target: { name: "dateTime", value: date }, */}
            {/*     }); */}
            {/*   }} */}
            {/*   KeyboardButtonProps={{ */}
            {/*     "aria-label": "change date", */}
            {/*   }} */}
            {/*   style={{ width: "45%" }} */}
            {/* /> */}
            <div style={{ margin: 20, width: "100%" }}>
              <p style={{ color: "gray", fontSize: 12 }}>Date and Time</p>
              <DatePicker
                maxDate={new Date()}
                id="date-picker-dialog"
                format="MM/DD/YYYY HH:mm:ss A"
                plugins={[<TimePicker position="bottom" />]}
                placeholder="2021/12/31"
                locale={languageMap[lang] || gregorian_en}
                value={encounterInfo.dateTime}
                onChange={(date) => {
                  handleEncounterInfoChange({
                    target: { name: "dateTime", value: new Date(date) },
                  });
                }}
                style={{
                  outline: "none",
                  border: "none",
                  borderBottom: "1px solid gray",
                  color: "black !important",
                  borderRadius: 0,
                  fontSize: 16,
                  boxSizing: "border-box",
                  width: "100%",
                }}
                containerStyle={{ width: "100%" }}
              />
            </div>
            {/* <KeyboardTimePicker */}
            {/*   margin="normal" */}
            {/*   id="time-picker-dialog" */}
            {/*   label={ */}
            {/*     uiData.label_FNB_EncounterTime?.emoji_code + */}
            {/*     uiData.label_ENC_Time?.tr_text */}
            {/*   } */}
            {/*   placeholder="08:00 AM" */}
            {/*   mask="__:__ _M" */}
            {/*   format="HH:mm a" */}
            {/*   value={encounterInfo.dateTime} */}
            {/*   onChange={(date) => { */}
            {/*     // setEncounterInfo({ */}
            {/*     //     ...encounterInfo, */}
            {/*     //     dateTime: date, */}
            {/*     // }) */}
            {/**/}
            {/*     handleEncounterInfoChange({ */}
            {/*       target: { name: "dateTime", value: date }, */}
            {/*     }); */}
            {/*   }} */}
            {/*   KeyboardButtonProps={{ */}
            {/*     "aria-label": "change time", */}
            {/*   }} */}
            {/*   style={{ width: "45%" }} */}
            {/* /> */}
            {/* <MultiDatePicker /> */}
          </Grid>
          <Grid container justifyContent="space-around">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "45%",
              }}
            >
              <Button //set today's date
                color="primary"
                onClick={() => {
                  var time = new Date(encounterInfo.dateTime).toTimeString();
                  var today = new Date().toDateString();
                  // setEncounterInfo({
                  //     ...encounterInfo,
                  //     dateTime: today + " " + time,
                  // });
                  handleEncounterInfoChange({
                    target: {
                      name: "dateTime",
                      value: new Date(`${today} ${time}`).toJSON(),
                    },
                  });
                }}
              >
                {uiData.label_ENC_Today?.tr_text} :
                {new Date().toISOString().split("T")[0]}
              </Button>
              <Tooltip title={uiData.label_ENC_Today_help?.tr_text}>
                <HelpIcon />
              </Tooltip>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "45%",
              }}
            >
              <Button //set now time
                color="primary"
                onClick={() => {
                  var date = new Date(encounterInfo.dateTime).toDateString();
                  var now = new Date().toTimeString();
                  // setEncounterInfo({
                  //     ...encounterInfo,
                  //     dateTime: date + " " + now,
                  // });
                  handleEncounterInfoChange({
                    target: {
                      name: "dateTime",
                      value: new Date(`${date} ${now}`),
                    },
                  });
                }}
              >
                {uiData.label_ENC_Now?.tr_text}
              </Button>
              <Tooltip title={uiData.label_ENC_Now_help?.tr_text}>
                <HelpIcon />
              </Tooltip>
            </div>
          </Grid>

          <form
            className={textfieldClasses.root}
            noValidate
            autoComplete="off"
            style={{ width: "100%" }}
          >
            <TextField
              id="encounter-notes"
              label={uiData.label_ENC_EncounterNotes?.tr_text}
              value={encounterInfo.notes}
              name={"notes"}
              onChange={(e) =>
                // setEncounterInfo({
                //     ...encounterInfo,
                //     notes: e.target.value,
                // })
                handleEncounterInfoChange(e)
              }
              style={{ width: "96%" }}
            />

            <TextField
              id="encounter-session-id"
              label={uiData.label_ENC_EncounterSessionID?.tr_text}
              value={encounterInfo.sessionID}
              InputProps={{
                readOnly: true,
              }}
              style={{ width: "96%" }}
            />

            <TextField
              id="user-ip-address"
              label={uiData.label_ENC_UserIPAddress?.tr_text}
              value={encounterInfo.IPaddress}
              InputProps={{
                readOnly: true,
              }}
              style={{ width: "96%" }}
            />
          </form>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default EncounterSettings;

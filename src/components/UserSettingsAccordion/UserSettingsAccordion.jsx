import React, { useCallback, useContext, useRef, useState } from "react";

import {
  Button,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Tooltip,
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HelpIcon from "@material-ui/icons/Help";

import { useDispatch, useSelector } from "react-redux";
import { TranslationContext } from "../../contexts/translation";
import {
  openFileNameBuilder,
  toggleSNSModal,
  openFolderNameBuilder,
  toggleClinicInfoModal,
} from "../../store/slices/modals";
import { changeUserSettings } from "../../store/slices/userSettings";

const UserSettingsAccordion = ({ useTextfieldStyles }) => {
  // const [userSettings, setUserSettings] = useState(patientFormDetails.userSettings);
  const userSettings = useSelector((state) => state.userSettings.userSettings);
  const patientInfo = useSelector((state) => state.userSettings.patientInfo);
  const { uiData, changeLanguage, language, languagesData, countriesList } =
    useContext(TranslationContext);

  const textfieldClasses = useTextfieldStyles();
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState("");
  const clinicCountry = useRef({});
  const autoCountrySet = useRef(true);

  const handleUserSettings = useCallback(
    (e) => {
      dispatch(
        changeUserSettings({ name: e.target.name, value: e.target.value })
      );
    },
    [dispatch]
  );

  const handleLanguageChange = (event) => {
    const canvas = window.window.sketchRef._fc.toJSON();
    localStorage.setItem("canvas", JSON.stringify(canvas));
    changeLanguage(event.target.value);
  };

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
          <strong style={{ fontSize: "1rem" }}>
            {uiData.label_USER_UserSettings?.tr_text}:
          </strong>{" "}
          <small>
            {userSettings.physicianName && (
              <strong> &nbsp;{userSettings.physicianName}</strong>
            )}{" "}
            {userSettings.assistantName && (
              <span>
                {" "}
                &nbsp;
                <i>{uiData.label_USER_Assistant?.tr_text}:</i>{" "}
                {userSettings.assistantName}
              </span>
            )}
            <br />
            <span>
              {userSettings.clinicName && (
                <>
                  <i>{uiData.label_USER_ClinicName?.tr_text}:</i>{" "}
                  {userSettings.clinicName}{" "}
                </>
              )}
              {userSettings.clinicAddress && (
                <>
                  &nbsp;
                  {uiData.label_USER_ClinicAddress?.emoji_code}
                  {userSettings.clinicAddress}{" "}
                </>
              )}
              {userSettings.clinicFlag && (
                <img
                  src={`${
                    process.env.REACT_APP_BACKEND_URL
                  }/static/media/svgFlags/${userSettings.clinicCountry.toLowerCase()}.svg`}
                  width="25"
                  alt=""
                />
              )}
            </span>
          </small>
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="app__mainBody__list__body">
        <Typography component={"div"}>
          <form className={textfieldClasses.root} noValidate autoComplete="off">
            <FormControlLabel
              disabled={patientInfo.gender === "other"}
              control={
                <Checkbox
                  checked={userSettings.acceptLic}
                  onChange={(e) => {
                    // setOpenlt(!e.target.checked);
                    // setUserSettings({
                    //     ...userSettings,
                    //     acceptLic: e.target.checked,
                    // });
                    handleUserSettings({
                      target: { name: "acceptLic", value: e.target.checked },
                    });
                  }}
                  name="acceptLic"
                  color="primary"
                />
              }
              style={{
                marginLeft: "-3.5px",
                marginBottom: "0px",
                width: "100%",
              }}
              label={
                <span>
                  {`${uiData.label_USER_IAcceptThe?.tr_text} ${uiData.label_AnatomyMapper?.tr_text} `}
                  <span
                    onClick={() => {
                      // setOpenlt(!userSettings.acceptLic);
                      // setUserSettings((prev) => ({
                      //     ...prev,
                      //     acceptLic: !prev.acceptLic,
                      // }));
                      handleUserSettings({
                        target: {
                          name: "acceptLic",
                          value: !userSettings.acceptLic,
                        },
                      });
                      // setIsAccepted(false);
                      // setIsNotAgreed({
                      //   isPrivacy: false,
                      //   open: true,
                      // });
                    }}
                    style={{ color: "blue" }}
                  >
                    {`${uiData.label_USER_License?.tr_text} ${uiData.transtext_and?.tr_text} ${uiData.label_USER_TermsAndConditions?.tr_text}`}
                  </span>
                </span>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={userSettings.acceptStatement}
                  onChange={(e) => {
                    // setOpenpp(!e.target.checked);
                    // setUserSettings({
                    //     ...userSettings,
                    //     acceptStatement: e.target.checked,
                    // });
                    handleUserSettings({
                      target: {
                        name: "acceptStatement",
                        value: e.target.checked,
                      },
                    });
                  }}
                  color="primary"
                />
              }
              style={{
                marginLeft: "-3.5px",
                marginBottom: "0px",
                width: "100%",
              }}
              label={
                <span>
                  {`${uiData.label_USER_IAcceptThe?.tr_text} ${uiData.label_AnatomyMapper?.tr_text} `}
                  <span style={{ color: "blue" }}>
                    {uiData.label_USER_PrivacyStatement?.tr_text}
                  </span>
                </span>
              }
            />
            <FormControl style={{ width: "96%" }}>
              <InputLabel shrink htmlFor="age-native-simple">
                {uiData.label_USER_Language?.emoji_code +
                  " " +
                  uiData.label_USER_Language?.tr_text}
              </InputLabel>
              <Select
                id="age-native-simple"
                native
                value={language}
                onChange={handleLanguageChange}
                inputProps={{
                  name: "language",
                  id: "language",
                }}
              >
                {Object.keys(languagesData).map((key) => (
                  <option key={key} value={languagesData[key].language_code}>
                    {languagesData[key].languages}
                  </option>
                ))}
              </Select>
            </FormControl>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{ width: "fit-content" }}
                onClick={() => {
                  dispatch(toggleSNSModal());
                }}
              >
                {" "}
                {uiData.transtext_Settings?.emoji_code +
                  " " +
                  uiData.label_USER_ConfigureSiteNamingSequence?.tr_text}{" "}
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "fit-content" }}
                onClick={() => {
                  dispatch(openFileNameBuilder());
                  // setImgNameConfOpen(true);
                }}
              >
                {uiData.transtext_Settings?.emoji_code +
                  " " +
                  uiData.label_USER_ImageAttachmentNaming?.tr_text}
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "fit-content" }}
                onClick={() => {
                  dispatch(openFolderNameBuilder());
                  // setImgNameConfOpen(true);
                }}
              >
                {uiData.transtext_Settings?.emoji_code +
                  " " +
                  uiData?.label_FolderEP_FolderNameBuilder?.tr_text}
              </Button>

              <Button
                variant="contained"
                color="primary"
                style={{ width: "fit-content" }}
                onClick={() => {
                  dispatch(toggleClinicInfoModal());
                  // setImgNameConfOpen(true);
                }}
              >
                {uiData.transtext_Settings?.emoji_code +
                  " " +
                  uiData?.transtext_Configure?.tr_text +
                  " " +
                  uiData?.label_USER_ClinicInformation?.tr_text}
              </Button>
            </div>

            {/* <TextField
              id="user-email-address"
              label={uiData.label_USER_EmailAddress?.tr_text}
              value={userSettings.userEmail}
              name={"userEmail"}
              onBlur={(e) => {
                const emailError = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(
                  e.target.value
                )
                  ? ""
                  : "Email is not valid.";
                setEmailError(emailError);
              }}
              onChange={(e) => {
                // setUserSettings({
                //     ...userSettings,
                //     userEmail: e.target.value,
                // });
                handleUserSettings(e);
                const emailError = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(
                  e.target.value
                )
                  ? ""
                  : "Email is not valid.";
                setEmailError(emailError);
              }}
              style={{ width: "96%" }}
              error={emailError}
              helperText={emailError}
            /> */}
            <TextField
              id="physician-name"
              name="physicianName"
              label={
                uiData.label_FNB_DoctorProviderName?.emoji_code +
                " " +
                uiData.label_FNB_DoctorProviderName?.tr_text
              }
              value={userSettings.physicianName}
              onChange={(e) =>
                // setUserSettings({
                //     ...userSettings,
                //     physicianName: e.target.value,
                // })
                handleUserSettings(e)
              }
              style={{ width: "96%" }}
            />
            <TextField
              id="assistant-names"
              name="assistantName"
              label={uiData.label_USER_AssistantNames?.tr_text}
              value={userSettings.assistantName}
              onChange={(e) =>
                // setUserSettings({
                //     ...userSettings,
                //     assistantName: e.target.value,
                // })
                handleUserSettings(e)
              }
              style={{ width: "96%" }}
            />

            {/* <TextField
              id="clinic-name"
              name="clinicName"
              label={uiData.label_USER_ClinicName?.tr_text}
              value={userSettings.clinicName}
              onChange={(e) =>
                // setUserSettings({
                //     ...userSettings,
                //     clinicName: e.target.value,
                // })
                handleUserSettings({
                  target: { name: "clinicName", value: e.target.value },
                })
              }
              style={{ width: "96%" }}
            />

            <TextField
              id="clinic-address"
              name="clinicAddress"
              label={
                uiData.label_USER_ClinicAddress?.emoji_code +
                " " +
                uiData.label_USER_ClinicAddress?.tr_text
              }
              value={userSettings.clinicAddress}
              onChange={(e) =>
                // setUserSettings({
                //     ...userSettings,
                //     clinicAddress: e.target.value,
                // })
                handleUserSettings(e)
              }
              //style={{ maxWidth: "80%", minWidth: "80%" }}
              style={{ width: "96%" }}
            /> */}
            <FormControl
              style={{
                marginBottom: "0px",
                width: "96%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <InputLabel id="clinic-country">
                {uiData.label_USER_ClinicCountry?.tr_text}
              </InputLabel>
              <Select
                labelId="clinic-country"
                value={userSettings.clinicCountry}
                onChange={(e) => {
                  handleUserSettings({
                    target: { name: "clinicCountry", value: e.target.value },
                  });
                  handleUserSettings({
                    target: {
                      name: "clinicCountryOpts",
                      value: clinicCountry.current,
                    },
                  });
                }}
                style={{ width: "100%" }}
              >
                <MenuItem
                  value={""}
                  onClick={(e) => {
                    autoCountrySet.current = false;
                    clinicCountry.current = {
                      paper_size: "Letter",
                      flag: "",
                    };
                  }}
                >
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
                      uiData.label_USER_ClinicCountry?.tr_text}
                  </span>
                </MenuItem>
                {countriesList &&
                  countriesList.map((country, index) => {
                    const code = country.alpha_2_code;
                    const name = country?.tr_text;

                    return (
                      <MenuItem
                        key={code}
                        value={code}
                        onClick={() => {
                          clinicCountry.current = country;
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",

                            justifyContent: "flex-start",
                            gap: ".5rem",
                          }}
                        >
                          {/*eslint-disable-next-line*/}
                          <img
                            src={`${
                              process.env.REACT_APP_BACKEND_URL
                            }/static/media/svgFlags/${code.toLowerCase()}.svg`}
                            width="25"
                          />
                          {name}{" "}
                        </span>
                      </MenuItem>
                    );
                  })}
              </Select>
              <Tooltip
                title={uiData.label_USER_ClinicCountry_help?.tr_text}
                arrow
                enterTouchDelay={30}
              >
                <HelpIcon style={{ cursor: "pointer" }} />
              </Tooltip>
            </FormControl>

            {/* <TextField
              id="clinic-phone"
              name="clinicPhone"
              label={uiData.label_USER_ClinicPhone?.tr_text}
              value={userSettings.clinicPhone}
              onChange={(e) => handleUserSettings(e)}
              style={{ width: "96%" }}
            />

            <TextField
              id="clinic-fax"
              name="clinicFax"
              label={uiData.label_USER_ClinicFax?.tr_text}
              value={userSettings.clinicFax}
              onChange={(e) => handleUserSettings(e)}
              style={{ width: "96%" }}
            />

            <TextField
              id="clinic-website"
              name="clinicSite"
              label={uiData.label_USER_ClinicWebsite?.tr_text}
              value={userSettings.clinicSite}
              onChange={(e) => handleUserSettings(e)}
              style={{ width: "96%" }}
            />

            <TextField
              id="clinic-email"
              name="clinicEmail"
              label={uiData.label_USER_ClinicEmailAdd?.tr_text}
              value={userSettings.clinicEmail}
              onChange={(e) => handleUserSettings(e)}
              style={{ width: "96%" }}
            />

            <TextField
              label={uiData.label_USER_ClinicLogoURL?.tr_text}
              name="clinicLogo"
              type="url"
              value={userSettings.clinicLogo}
              onChange={(e) => handleUserSettings(e)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Tooltip
                      title={uiData.label_USER_ClinicLogoURL_help?.tr_text}
                      arrow
                      enterTouchDelay={30}
                    >
                      <HelpIcon style={{ cursor: "pointer" }} />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              style={{ width: "96%" }}
            />

            <TextField
              id="clinic-add-info"
              name="clinicInfo"
              label={uiData.label_USER_AdditionalClinicInfo?.tr_text}
              value={userSettings.clinicInfo}
              onChange={(e) => handleUserSettings(e)}
              style={{ width: "96%" }}
            /> */}
          </form>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserSettingsAccordion;

import { Button, InputAdornment, TextField, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TranslationContext } from "../../contexts/translation";
import useTranslations from "../../hooks/useTranslations";
import { toggleClinicInfoModal } from "../../store/slices/modals";
import { changeUserSettings } from "../../store/slices/userSettings";
import CustomizedDialogs from "../Dialog/Dialog";
import HelpIcon from "@material-ui/icons/Help";
import { fileToDataUri } from "../../utils/exportUtils/helpers";
import { useRef } from "react";

const useTextfieldStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function ClinicInfoModal() {
  const dispatch = useDispatch();
  const clinicLogoRef = useRef(null);

  const [emailError, setEmailError] = useState("");

  const { state: open } = useSelector((state) => state.modals.clinicInfoModdal);
  const userSettings = useSelector((state) => state.userSettings.userSettings);

  const { uiData } = useTranslations(TranslationContext);

  const textfieldClasses = useTextfieldStyles();

  const handleClose = () => {
    dispatch(toggleClinicInfoModal());
  };

  const handleUserSettings = useCallback(
    (e) => {
      dispatch(
        changeUserSettings({ name: e.target.name, value: e.target.value })
      );
    },
    [dispatch]
  );

  const handleStoreLogo = (event) => {
    const data = event.target.files[0];
    if (!data) return;

    fileToDataUri(data)
      .then(dataUri => {
        dispatch(
          changeUserSettings({ name: "clinicLogo", value: dataUri })
        );
      })
  }

  return (
    <CustomizedDialogs
      open={open}
      onClose={handleClose}
      title={uiData?.label_USER_ClinicInformation?.tr_text}
      body={
        <div>
          <form className={textfieldClasses.root} noValidate autoComplete="off">
            <TextField
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
            />

            <TextField
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
            />

            <TextField
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
                endAdornment: (
                  <InputAdornment position='end'>
                    <input type="file" accept=".png, .jpg" onChange={(e) => handleStoreLogo(e)} ref={clinicLogoRef} style={{display: 'none'}}/>
                    <Button onClick={() => clinicLogoRef.current.click()}>Choose File</Button>
                  </InputAdornment>
                )
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
            />
          </form>
        </div>
      }
    />
  );
}

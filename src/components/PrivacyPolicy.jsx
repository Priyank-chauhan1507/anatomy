import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { makeStyles } from "@material-ui/core/styles";
import { HelpOutlined, Language as LanguageIcon } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TranslationContext } from "../contexts/translation";
import { FormControlLabelWithStyles } from "./TermsAndConditions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  langDropdown: {
    display: "flex",
    alignItems: "center",
  },
  dialogTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
export default function PrivacyPolicy({
  setOpenpp,
  openpp,
  handleAccept,
  handleReject,
}) {
  const classes = useStyles();

  const [isChecked, setIsChecked] = useState(false);
  const { languagesData, language, changeLanguage, privacyTermsLicenseLabels } =
    useContext(TranslationContext);

  const [isEnable, setIsEnabled] = useState(false);
  const contentRef = useRef(null);

  const handleScroll = (e) => {
    if (isEnable) return;
    const bottom =
      Math.round(e.target.scrollHeight - e.target.scrollTop) ===
      e.target.clientHeight;
    setIsEnabled(bottom);
  };

  const handleEnablingScroll = (ref) => {
    if (ref) {
      if (ref.scrollTop === 0) {
        ref.scrollTop = 1;

        if (ref.scrollTop === 0) {
          setIsEnabled(true);
        } else {
          setIsEnabled(false);
        }
      }
    }

    contentRef.current = ref;
  };

  useEffect(() => {
    const handleEnablingScrollUsingRef = () => {
      if (contentRef.current) {
        if (contentRef.current.scrollTop === 0) {
          contentRef.current.scrollTop = 1;

          if (contentRef.current.scrollTop === 0) {
            setIsEnabled(true);
          } else {
            setIsEnabled(false);
          }
        }
      }
    };
    window.addEventListener("resize", handleEnablingScrollUsingRef);
    return () => {
      window.removeEventListener("resize", handleEnablingScrollUsingRef);
    };
  }, []);

  return (
    privacyTermsLicenseLabels && (
      <Dialog
        aria-labelledby='term-dialog-title'
        open={openpp}
        disableBackdropClick>
        <DialogTitle id='term-dialog-title'>
          <div className={classes.dialogTitle}>
            <Typography variant='h6'>
              {privacyTermsLicenseLabels?.label_USER_PrivacyPolicy?.tr_text}
            </Typography>
            <Typography variant='caption' style={{ color: "red" }}>
              {
                privacyTermsLicenseLabels
                  ?.label_MustScrollThroughAndCheckBoxToAccept?.tr_text
              }
            </Typography>
            <div className={classes.langDropdown}>
              <LanguageIcon />
              <FormControl className={classes.formControl}>
                <InputLabel id='demo-simple-select-label'>
                  {privacyTermsLicenseLabels?.label_USER_Language?.tr_text}
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={language}
                  onChange={(e) => changeLanguage(e.target.value)}>
                  {Object.values(languagesData).map((lang) => {
                    return (
                      <MenuItem value={lang.language_code}>
                        {lang.languages}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
        </DialogTitle>
        <DialogContent
          ref={handleEnablingScroll}
          onScroll={handleScroll}
          dividers>
          <PrivacyPolicyAccordian
            language={language}
            privacyTermsLicenseLabels={privacyTermsLicenseLabels}
          />

          <Typography gutterBottom>
            {privacyTermsLicenseLabels?.WebAppPrivacyPolicy?.tr_text}
          </Typography>

          <PrivacyPolicyAccordian
            language={language}
            privacyTermsLicenseLabels={privacyTermsLicenseLabels}
          />

          <div style={{ display: "flex", alignItems: "center" }}>
            <FormControlLabelWithStyles
              control={
                <Checkbox
                  checked={isChecked}
                  onChange={() => setIsChecked((prev) => !prev)}
                  color='primary'
                />
              }
              label={
                privacyTermsLicenseLabels?.label_ReadAndAgree_PrivacyPolicy
                  ?.tr_text
              }
            />
            <Tooltip
              title={
                privacyTermsLicenseLabels?.label_CheckThisBoxToAccept_help
                  ?.tr_text
              }
              // arrow
            >
              <HelpOutlined style={{ cursor: "pointer" }} fontSize={"small"} />
            </Tooltip>
          </div>
        </DialogContent>

        <DialogActions>
          <Button color='primary' onClick={handleReject}>
            {privacyTermsLicenseLabels?.transtext_Decline?.tr_text}
          </Button>
          <Button
            // disabled={isEnable === false}
            disabled={!isChecked}
            color='primary'
            onClick={handleAccept}>
            {privacyTermsLicenseLabels?.transtext_IAccept?.tr_text}
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
}

function PrivacyPolicyAccordian({ language, privacyTermsLicenseLabels }) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  return (
    <>
      {language !== "en" && (
        <div
          style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
          <div
            style={{
              marginTop: isAccordionOpen ? "35px" : "15px",
              marginRight: "5px",
            }}>
            <Tooltip
              title={
                privacyTermsLicenseLabels?.label_USER_OfficialEnglish_help
                  ?.tr_text
              }>
              <HelpOutlined style={{ cursor: "pointer" }} fontSize={"small"} />
            </Tooltip>
          </div>
          <Accordion
            onChange={(e, isExpanded) => setIsAccordionOpen(isExpanded)}
            style={{ marginBottom: "14px", width: "94%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className='TermsPolicyAccordianSummary'
              style={{
                backgroundColor: isAccordionOpen ? "#ebebeb" : "lightgray",
              }}>
              <p
                style={{
                  marginLeft: "10px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}>
                {privacyTermsLicenseLabels?.transtext_View?.tr_text} - &nbsp;
                {
                  privacyTermsLicenseLabels?.label_USER_OfficialEnglish?.tr_text
                }{" "}
                : {privacyTermsLicenseLabels?.WebAppPrivacyPolicy?.tr_text_all}
              </p>
            </AccordionSummary>
            <AccordionDetails
              className='TermsPolicyAccordianDetails'
              style={{ backgroundColor: "#ebebeb" }}>
              <Typography gutterBottom>
                {privacyTermsLicenseLabels?.WebAppPrivacyPolicy?.tr_text_all}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </>
  );
}

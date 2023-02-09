import React, { useContext } from "react";
import { Backdrop, Typography, Button, Box } from "@material-ui/core";
import { TranslationContext } from "../contexts/translation";

export default function DisablePopup({ open, isPrivacy, handleClose }) {
  const { uiData } = useContext(TranslationContext);

  return uiData ? (
    <Backdrop open={open} style={{ zIndex: 9999 }}>
      <div>
        <Typography
          variant="h5"
          component="h5"
          style={{ color: "#fff", textAlign: "center" }}
        >
          {isPrivacy
            ? uiData.label_USER_DeclinePrivacyStatement.tr_text
            : uiData.label_USER_DeclineLicenseTAC.tr_text}
        </Typography>
        <a
          style={{
            color: "#fff",
            textAlign: "center",
            display: "block",
            fontSize: "22px",
            marginTop: "20px",
          }}
          href="https://anatomymapper.com"
        >
          {" "}
          https://anatomymapper.com{" "}
        </a>

        <Typography
          variant="h5"
          component="h5"
          style={{ color: "#fff", textAlign: "center", marginTop: "20px" }}
        >
          {uiData.transtext_or.tr_text.toUpperCase()}
        </Typography>
        <Box display="flex" justifyContent="center" m={1}>
          <Button onClick={handleClose} variant="contained" color="primary">
            {uiData.label_USER_ReviewAgain.tr_text}
          </Button>
        </Box>
      </div>
    </Backdrop>
  ) : null;
}

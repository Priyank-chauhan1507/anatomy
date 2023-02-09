import { Backdrop, Typography } from "@material-ui/core";
import React from "react";
import useTranslations from "../hooks/useTranslations";

export default function BackdropWithLoader({ open }) {
  const { uiData } = useTranslations();
  return uiData ? (
    <Backdrop open={open} style={{ zIndex: 9999 }}>
      <div>
        <Typography
          variant="h5"
          component="h5"
          style={{ color: "#fff", textAlign: "center" }}
        >
          {uiData.label_GeneratingExport?.tr_text} ......
        </Typography>

        <Typography
          variant="h6"
          component="h6"
          style={{ color: "#fff", textAlign: "center" }}
        >
          {uiData.label_PleaseWait?.tr_text}{" "}
          {uiData.label_PleaseWait?.emoji_code}
        </Typography>
      </div>
    </Backdrop>
  ) : null;
}

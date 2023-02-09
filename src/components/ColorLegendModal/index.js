import { Switch, Tooltip, Typography } from "@material-ui/core";
import { Help } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useTranslations from "../../hooks/useTranslations";
import { toggleColorCodedLegendModal } from "../../store/slices/modals";
import { changeColorCodedLegendSettings } from "../../store/slices/userSettings";
import CustomizedDialogs from "../Dialog/Dialog";

export default function ColorLegendModal() {
  const { uiData } = useTranslations();
  /**
    correspondingColorText: true,
    semiTransparentBackgroud: true,
    indentAnatomicSite: false,
    showParentAtTop: false,
  */
  const colorCodedLegendSettings = useSelector(
    (state) => state.userSettings.colorCodedLegendSettings
  );

  const modalOpen = useSelector(
    (state) => state.modals.colorCodedLegendModal.state
  );
  const dispatch = useDispatch();
  const toggle = (settingName) => {
    dispatch(
      changeColorCodedLegendSettings({
        name: settingName,
        value: !colorCodedLegendSettings[settingName],
      })
    );
  };
  return (
    <CustomizedDialogs
      open={modalOpen}
      onClose={() => {
        dispatch(toggleColorCodedLegendModal());
      }}
      title={
        uiData?.transtext_Settings?.emoji_code +
        " " +
        uiData?.label_CCL_ColorCodedLegendSettings?.tr_text
      }
      body={
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Tooltip
              title={uiData?.label_CCL_IndentByHL_help?.tr_text}
              enterTouchDelay={30}>
              <Help />
            </Tooltip>
            <Switch
              color='primary'
              checked={colorCodedLegendSettings.indentAnatomicSite}
              onChange={() => toggle("indentAnatomicSite")}
            />
            <Typography>{uiData?.label_CCL_IndentByHL?.tr_text}</Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Tooltip
              title={uiData?.label_CCL_ShowColoredText_help?.tr_text}
              enterTouchDelay={30}>
              <Help />
            </Tooltip>
            <Switch
              color='primary'
              checked={colorCodedLegendSettings.correspondingColorText}
              onChange={() => toggle("correspondingColorText")}
            />
            <Typography>
              {uiData?.label_CCL_ShowColoredText?.tr_text}
            </Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Tooltip
              title={uiData?.label_CCL_SemiTransparentBG_help?.tr_text}
              enterTouchDelay={30}>
              <Help />
            </Tooltip>
            <Switch
              color='primary'
              checked={colorCodedLegendSettings.semiTransparentBackgroud}
              onChange={() => toggle("semiTransparentBackgroud")}
            />
            <Typography>
              {uiData?.label_CCL_SemiTransparentBG?.tr_text}
            </Typography>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Tooltip
              title={uiData?.label_CCL_ShowParentAtTop_help?.tr_text}
              enterTouchDelay={30}>
              <Help />
            </Tooltip>
            <Switch
              color='primary'
              checked={colorCodedLegendSettings.showParentAtTop}
              onChange={() => toggle("showParentAtTop")}
            />
            <Typography>
              {uiData?.label_CCL_ShowParentAtTop?.tr_text}
            </Typography>
          </div>
        </div>
      }
    />
  );
}

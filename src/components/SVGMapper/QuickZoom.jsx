import React from "react";
import Typography from "@material-ui/core/Typography";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

import Anogenital from "../../assets/svg/Zoom_Anogenital.svg";
import Axillae from "../../assets/svg/Zoom_Axillae.svg";
import Face from "../../assets/svg/Zoom_Face.svg";
import Feet from "../../assets/svg/Zoom_Feet.svg";
import Body from "../../assets/svg/Zoom_Full Body.svg";
import Hands from "../../assets/svg/Zoom_Hands.svg";
import Oral from "../../assets/svg/Zoom_Oral.svg";
import Scalp from "../../assets/svg/Zoom_Scalp.svg";
import { useContext } from "react";
import { TranslationContext } from "../../contexts/translation";

export default function QuickZoom({ setOpen, open, onClickQuickZoomTile }) {
  const { uiData } = useContext(TranslationContext);

  const content = [
    {
      title: uiData
        ? uiData.mapInteractionLabel_QuickZoom_HeadAndNeck?.tr_text
        : "Head & Neck",
      image: Face,
      id: "G-Head_and_Neck",
    },

    {
      title: uiData
        ? uiData.mapInteractionLabel_QuickZoom_Scalp?.tr_text
        : "Scalp",
      image: Scalp,
      id: "G-Scalp",
    },
    {
      title: uiData
        ? uiData.mapInteractionLabel_QuickZoom_FullBody?.tr_text
        : "Full Body",
      image: Body,
      id: "G-Full_Body",
    },
    {
      title: uiData
        ? uiData.mapInteractionLabel_QuickZoom_Anogenital?.tr_text
        : "Anogenital",
      image: Anogenital,
      id: "anogenital",
    },
    {
      title: uiData
        ? uiData.mapInteractionLabel_QuickZoom_Hands?.tr_text
        : "Hands",
      image: Hands,
      id: "G-Hands",
    },
    {
      title: uiData
        ? uiData.mapInteractionLabel_QuickZoom_Axillae?.tr_text
        : "Axillae",
      image: Axillae,
      id: "G-Axillae",
    },
    {
      title: uiData
        ? uiData.mapInteractionLabel_QuickZoom_Feet?.tr_text
        : "Feet",
      image: Feet,
      id: "G-Feet",
    },
    {
      title: uiData
        ? uiData.mapInteractionLabel_QuickZoom_Oral?.tr_text
        : "Oral",
      image: Oral,
      id: "G-Oral_Anatomy",
    },
  ];

  return (
    uiData && (
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="term-dialog-title"
        open={open}
        disableBackdropClick
      >
        <DialogTitle id="term-dialog-title" onClose={() => setOpen(false)}>
          {uiData.mapInteractionLabel_QuickZoom?.tr_text}
        </DialogTitle>
        <DialogContent id="content" dividers>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {content.map((val, ind) => {
              return (
                <div
                  key={ind}
                  style={{ flexBasis: "50%", cursor: "pointer" }}
                  onClick={() => onClickQuickZoomTile(val.id)}
                >
                  <img src={val.image} alt="head" />
                  <Typography style={{ textAlign: "center" }}>
                    {val.title}
                  </Typography>
                </div>
              );
            })}
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="primary" onClick={() => setOpen(false)}>
            {uiData.label_Close?.tr_text}
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
}

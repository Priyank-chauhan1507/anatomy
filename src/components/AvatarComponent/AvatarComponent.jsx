import { makeStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import MaleAvatar from "../../assets/male.jpg";
import FemaleAvatar from "../../assets/female.jpg";
// import { Create } from "@material-ui/icons";
import { useState } from "react";
import CustomizedDialogs from "../Dialog/Dialog";
import { Button } from "@material-ui/core";
import SplitButton from "../SplitButton/SplitButton";
import { useRef } from "react";
// import ReactCrop from "react-image-crop";
import WebcamCapture from "../Webcam";
import placeholderPhoto from "../../assets/photo-placeholder.svg";
import Editor from "../ImageEditor";
import { useContext } from "react";
import { TranslationContext } from "../../contexts/translation";
import useToasterMessage from "../../hooks/useToasterMessage";
// import { getCroppedImg } from "./cropUtils";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: "80px",
    height: "80px",
    border: "1px solid #8ce6e6",
    borderRadius: "50%",
    // overflow: "hidden",
    padding: "1px",
    "&:hover $editIcon": {
      opacity: "1",
    },
    "&>img": {
      width: "calc(100% - 1px)",
      height: "calc(100% - 1px)",
      borderRadius: "50%",
    },
  },
  editIcon: {
    position: "absolute",
    right: "-5px",
    backgroundColor: "#1093eb",
    top: "-5px",
    padding: "3px",
    borderRadius: "50%",
    opacity: 0,
    transition: "opacity .4s",
    "&:hover": {
      opacity: "1",
    },
  },
}));

const useAvatarModalStyles = makeStyles(() => ({
  body: {
    width: "400px",
    minHeight: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  footer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  cropCanvas: {
    marginTop: "20px",
    marginBottom: "20px",
    width: "350px",
    "& > .ReactCrop": {
      width: "100%",
      "& > div": {
        width: "100%",
        "& > img": {
          width: "100%",
        },
      },
    },
    // maxWidth: "300px",
    // height: "150px",
  },
  rotate: {
    display: "flex",
    flexDirection: "column",
    "& >.rotate-text": {
      marginTop: "0px",
      display: "flex",
      justifyContent: "center",
    },
  },
  patientInfoBox: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    margin: "10px",
  },
  cameraContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  facePlaceholder: {
    position: "absolute",
    top: "0",
    left: "50%",
    transform: "translateX(-50%)",
    height: "200px",
    // opacity: "4"
  },
  topButtons: {
    width: "300px",
    margin: "auto",
    display: "flex",
    gap: "10px",
    "& > *": {
      width: "50%",
    },
  },
}));

const genderAvatarMapping = {
  male: MaleAvatar,
  female: FemaleAvatar,
};

const options = (uiData) => [
  {
    id: "upload",
    label: uiData
      ? uiData.label_PT_PtPhoto_Upload?.tr_text
      : "Upload Patient Photo From your system",
  },
  {
    id: "take",
    label: uiData
      ? uiData.label_PT_PtPhoto_UseCamera?.tr_text
      : "Take Patient Photo using your camera",
  },
];

function AvatarModal({ open, onClose, onSave, src, patientInfoEle }) {
  const classes = useAvatarModalStyles();
  const [menuItemIndex, setMenuItemIndex] = useState(0);
  const [originalImage, setOriginalImage] = useState(src);
  const { uiData } = useContext(TranslationContext);
  // const [originalImageURL, setOriginalImageURL] = useState(src);

  useEffect(() => {
    if (src && open) {
      setOriginalImage(src);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const fileInputRef = useRef(null);
  // const cropToolRef = useRef(null);
  // const [rotation, setRotation] = useState(0);
  // const [doneButtonShown, setDoneButtonShown] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openWebcam, setOpenWebcam] = useState(false);

  const [cameraError, setCameraError] = useState(null);

  const onInsertButtonClick = (index = null) => {
    const actionId = options(uiData)[index !== null ? index : menuItemIndex].id;

    switch (actionId) {
      case "upload": {
        fileInputRef.current.click();
        break;
      }
      case "take":
        setOpenWebcam(true);
        break;
      default: {
        return null;
      }
    }
  };

  const toaster = useToasterMessage();
  const handlePhotoFileChange = (e) => {
    if (e.target.files && e.target.files.length === 1) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        // setDoneButtonShown(true);
        setOriginalImage(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
      // setOriginalImageURL(URL.createObjectURL(e.target.files[0]));
    } else {
      toaster({ message: "Only One Image File Allowed", type: "info" });
    }
  };
  const handleReset = () => {
    setOriginalImage(null);
    setIsEditMode(false);

    onClose();
  };

  const handleRemove = () => {
    setOriginalImage(null);
    setIsEditMode(false);
  };
  return (
    uiData && (
      <CustomizedDialogs
        open={open}
        onClose={() => handleReset()}
        title={uiData.label_PT_PtPhoto?.tr_text}
        body={
          <div className={classes.body}>
            <div className={classes.patientInfoBox}>{patientInfoEle}</div>

            {openWebcam ? (
              <div className={classes.cameraContainer}>
                {!Boolean(cameraError) && (
                  <img
                    src={placeholderPhoto}
                    alt={"Face Placeholder"}
                    className={classes.facePlaceholder}
                  />
                )}
                <WebcamCapture
                  onCapture={(imgSrc) => {
                    setOriginalImage(imgSrc);
                    setOpenWebcam(false);
                  }}
                  onCancel={() => {
                    setOpenWebcam(false);
                  }}
                  onCameraOpen={(mediaError) => {
                    if (mediaError) {
                      setCameraError(mediaError);
                    } else {
                      setCameraError(null);
                    }
                  }}
                />
              </div>
            ) : (
              <>
                {originalImage && (
                  <div className={classes.topButtons}>
                    <SplitButton
                      label={uiData.transtext_Replace.tr_text}
                      menuItemIndex={menuItemIndex}
                      onButtonClick={onInsertButtonClick}
                      onMenuItemChange={(index) => {
                        setMenuItemIndex(index);
                        onInsertButtonClick(index);
                      }}
                      options={options(uiData)}
                    />
                    <Button
                      className={classes.doneButton}
                      variant={"outlined"}
                      color={"secondary"}
                      onClick={() => {
                        handleRemove();
                      }}
                    >
                      {uiData.transtext_Remove.tr_text}
                    </Button>
                  </div>
                )}
                {!originalImage && (
                  <SplitButton
                    label={uiData.label_PT_PtPhoto_InsertPhoto?.tr_text}
                    menuItemIndex={menuItemIndex}
                    onButtonClick={onInsertButtonClick}
                    onMenuItemChange={(index) => {
                      setMenuItemIndex(index);
                      onInsertButtonClick(index);
                    }}
                    options={options(uiData)}
                  />
                )}

                {originalImage && !isEditMode && (
                  <img
                    src={originalImage}
                    alt={"Final Patient"}
                    style={{ margin: "10px 0", width: 250, height: 250 }}
                  />
                )}

                {isEditMode && originalImage && (
                  <Editor
                    path={originalImage}
                    placeholder={placeholderPhoto}
                    onExit={(img) => {
                      setOriginalImage(img);
                      setIsEditMode(false);
                    }}
                  />
                )}
                {!isEditMode && originalImage && (
                  <div className={classes.doneButtonContainer}>
                    <Button
                      className={classes.doneButton}
                      variant={"outlined"}
                      color={"primary"}
                      onClick={() => {
                        setIsEditMode(true);
                      }}
                    >
                      {uiData.transtext_Edit.tr_text}
                    </Button>
                  </div>
                )}
                <input
                  type={"file"}
                  ref={fileInputRef}
                  accept={"image/*"}
                  onChange={handlePhotoFileChange}
                  hidden
                />
              </>
            )}
          </div>
        }
        footer={
          <div className={classes.footer}>
            <Button
              className={classes.actionButtons}
              variant={"outlined"}
              color={"primary"}
              onClick={() => {
                handleReset();
              }}
            >
              {uiData.transtext_Cancel?.tr_text}
            </Button>
            <Button
              className={classes.actionButtons}
              variant={"contained"}
              color={"primary"}
              onClick={() => {
                onSave(originalImage);
                onClose();
              }}
            >
              Save
            </Button>
          </div>
        }
      />
    )
  );
}

export default function AvatarComponent({
  gender,
  onSave,
  src,
  patientInfoEle,
  isAvatarModal = true,
  isSmallAvatar = false,
}) {
  const classes = useStyles();
  const [openAvatarModal, setOpenAvatarModal] = useState(false);

  const getSRC = () => {
    if (src) {
      return src;
    }
    return gender === "male" || gender === "female"
      ? genderAvatarMapping[gender]
      : MaleAvatar;
  };
  return (
    <>
      {isAvatarModal ? (
        <AvatarModal
          open={openAvatarModal}
          src={src}
          patientInfoEle={patientInfoEle}
          onSave={onSave}
          onClose={() => setOpenAvatarModal(false)}
        />
      ) : null}

      <span
        className={classes.container}
        onClick={() => setOpenAvatarModal(true)}
        style={isSmallAvatar ? { width: "60px", height: "60px" } : {}}
      >
        <img alt={"avatar-sam"} src={getSRC()} />
      </span>
    </>
  );
}

import {
  Grid,
  makeStyles,
  Select,
  MenuItem,
  Accordion,
  IconButton,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@material-ui/core";
import {
  WarningOutlined,
  ExpandMore,
  Delete,
  AddAPhotoRounded,
} from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { TranslationContext } from "../../../contexts/translation";
import { getURL } from "../../../utils/cf";
import { getPinShape } from "../../../utils/pinUtils";
import SubToolbar from "../../subtoolbar/OrderedSubToolbar";
import { updatePinShape } from "../../subtoolbar/subToolHelpers";

const useStyles = makeStyles(() => {
  return {
    container: {
      fontSize: "16px",
      fontWeight: 600,
      padding: "20px",
      borderBottom: "4px solid #999",
    },
    header: {
      display: "flex",
      alignItems: "center",
    },
    headerIcon: {
      display: "flex",
      marginRight: "8px",
      height: "100%",
      "&>svg": {
        color: "#FFC947",
      },
    },
    codeDropdown: {
      margin: "10px 0",
      display: "flex",
      alignItems: "center",
      "& > p": {
        marginRight: "8px",
      },
    },
    leftMain: {
      height: "100%",
      paddingTop: "16px",
      paddingRight: 8,
    },
    photoTitle: {
      marginLeft: 16,
    },
    rightMain: {
      display: "flex",
      flexDirection: "column",
      height: "220px",
      overflowY: "auto",
    },
    photoBox: {
      flex: "1",
      border: "1px solid #eee",
      borderRadius: "12px",
      "&>div": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "50%",
        // height: "50px",
      },
    },
    inputBoxes: {
      marginTop: "16px",
    },
    additionalData: {
      width: "calc(100% - 40px)",
      margin: "0 auto",
      marginTop: "10px",
    },
    accordion: {
      padding: "10px",
    },
    imageContainer: {
      padding: "10px",
      width: "100%",
      height: "100%",
      position: "relative",
    },
    uploadedImg: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
    },
    deleteImgIcon: {
      position: "absolute",
      top: "0",
      right: "0",
    },
  };
});

const renderInput = (input, onInputChange, index) => {
  // eslint-disable-next-line default-case
  switch (input.type) {
    case "text":
      return (
        <TextField
          variant={"outlined"}
          key={input.name}
          label={input.label}
          value={input.value}
          name={input.name}
          onChange={(e) => onInputChange(e.target.value, index)}
        />
      );
    case "select":
      return (
        <TextField
          variant={"outlined"}
          select
          fullWidth
          label={input.label}
          value={input.value}
          name={input.name}
          onChange={(e) => onInputChange(e.target.value, index)}>
          {input.options.map((opt) => {
            return (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            );
          })}
        </TextField>
      );

    case "multiselect":
      return (
        <TextField
          variant={"outlined"}
          value={input.value}
          name={input.name}
          label={input.label}
          select
          multiple
          onChange={(e, newValue) => onInputChange(newValue, index)}>
          {input.options.map((opt) => {
            return (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            );
          })}
        </TextField>
      );
  }
};
export default function AdditionalDocumentation({
  locked,
  name,
  note,
  inputs,
  images,
  addDocs,
  onNoteChange,
  onInputChange,
  onImagesChange,
  code,
  onCodeChange,
  color,
  pinShape,
  plotOnSea,
  setplotOnSea,
  setPinShape,
  listItems,
  setSelectedSubToolbar,
}) {
  const classes = useStyles();
  const uploadFile = useRef();

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(false);

  const { languagesData, language } = useContext(TranslationContext);
  //subtoolbar states

  useEffect(() => {
    updatePinShape(
      listItems,
      pinShape,
      color,
      languagesData[language]?.left_to_right === "TRUE"
    );
  }, [pinShape, languagesData, language]);

  const handleClickOpen = (index) => {
    setIndex(index);
    setOpen(true);
  };

  const handleOk = () => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onImagesChange(newImages);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleListOrdering = () => {};

  const captureImage = async (e) => {
    e.preventDefault();
    try {
      const url = await getURL(e.target.files[0]);
      if (url) {
        const newImages = [
          ...images,
          {
            src: url,
            note: "",
          },
        ];
        onImagesChange(newImages);
      }
    } catch (err) {}
  };
  return (
    <div className={classes.container}>
      <SubToolbar
        locked={locked}
        selectedPinShape={pinShape}
        plotOnSea={plotOnSea}
        setplotOnSea={setplotOnSea}
        listColor={color}
        setPinShape={setPinShape}
        handleListOrdering={handleListOrdering}
        listType='grouped'
        setSelectedSubToolbar={setSelectedSubToolbar}
      />
      <div className={classes.header}>
        <span className={classes.headerIcon}>
          <WarningOutlined color={"action"} />
        </span>
        <p>Group Documentation For {name} Group: </p>
      </div>
      <Grid container className={classes.main}>
        <Grid item xs={7} className={classes.leftMain}>
          <Grid container className={classes.codeDropdown}>
            <p>Group : {code.name}</p>
            <Select
              variant={"outlined"}
              value={code.value}
              style={{ flex: 1 }}
              onChange={(e) => onCodeChange(e.target.value)}>
              {code.options.map((opt) => {
                return (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid container className={classes.noteTextBox}>
            <TextField
              multiline
              variant={"outlined"}
              rows={5}
              rowsMax={5}
              value={note}
              onChange={(e) => onNoteChange(e.target.value)}
              fullWidth
              label={"Group notes for " + name + " group"}
            />
          </Grid>
        </Grid>
        <Grid item xs={5} className={classes.rightMain}>
          <p className={classes.photoTitle}> Group Photos </p>
          <Grid container className={classes.photoBox}>
            <Grid item xs={6}>
              <div className='upload-container'>
                <input
                  type='file'
                  accept='image/*'
                  ref={uploadFile}
                  style={{ display: "none" }}
                  capture='camera'
                  onClick={(e) => (e.target.value = null)}
                  onChange={(e) => captureImage(e)}
                />
                <IconButton onClick={() => uploadFile.current.click()}>
                  <AddAPhotoRounded />
                </IconButton>
              </div>
            </Grid>
            {images.map((image, index) => {
              return (
                <Grid item xs={6}>
                  <div className={classes.imageContainer}>
                    <img
                      key={index}
                      className={classes.uploadedImg}
                      src={image.src}
                      alt='img'
                    />
                    <IconButton
                      className={classes.deleteImgIcon}
                      onClick={() => {
                        handleClickOpen(index);
                      }}>
                      <Delete />
                    </IconButton>
                  </div>
                  <div style={{ width: "100%" }}>
                    <TextField
                      className='image-list-textfield'
                      placeholder='notes'
                      autoComplete='off'
                      // autoFocus
                      margin='dense'
                      type='text'
                      value={image.note}
                      onChange={(e) => {
                        const newImages = [...images];
                        newImages[index] = {
                          ...newImages[index],
                          note: e.target.value,
                        };
                        onImagesChange(newImages);
                      }}
                      fullWidth
                      // onBlur={() => setUser__image(image)}
                    />
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <Grid container spacing={1} className={classes.inputBoxes}>
          {inputs.map((input, index) => (
            <Grid item xs={3} key={input.name}>
              {renderInput(input, onInputChange, index)}
            </Grid>
          ))}
        </Grid>

        <Grid container className={classes.additionalData}>
          <Accordion
            className={classes.accordion}
            // className="listContent__additionalMetaData"
            style={{ backgroundColor: "#999" }}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls='panel1a-content'
              id='panel1a-header'>
              -- Show additional documentation options --
            </AccordionSummary>
            <AccordionDetails className='app__mainBody__list__body'>
              {addDocs}
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby='delete-image-dialog'>
        <DialogTitle id='delete-image-dialog'>
          Are you sure you want to delete this Image - {index + 1}?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCancel} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleOk} color='secondary' variant='contained'>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

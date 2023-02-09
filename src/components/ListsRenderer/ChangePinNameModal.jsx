import { useState } from "react";
import RestoreIcon from "@material-ui/icons/Restore";
import { useSelector, useDispatch } from "react-redux";
import { setUiData, setPinTitles } from "../../store/slices/translation";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const ChangePinNameModal = ({
  setChangeTitle,
  OgTitle,
  target,
  changeTitle,
  handleClose,
  open,
}) => {
  const [change, setChange] = useState(changeTitle);
  const uiData = useSelector((state) => state.translation.uiData);
  const pinTitles = useSelector((state) => state.translation.pinTitles);
  const dispatch = useDispatch();

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Edit List Title
      </DialogTitle>
      <DialogContent dividers>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "20px",
          }}
        >
          <TextField
            value={change}
            onChange={(e) => {
              setChange(e.target.value);
            }}
            id="outlined-basic"
            label="Change Name"
            variant="outlined"
          />
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setChangeTitle(`${OgTitle}`);
              setChange(OgTitle);
              dispatch(
                setUiData({ ...uiData, [target]: { tr_text: OgTitle } })
              );
              dispatch(
                setPinTitles({
                  ...uiData,
                  [target]: { isChanged: false, changed: null },
                })
              );
              handleClose();
            }}
            style={{ marginLeft: "2%" }}
          >
            <RestoreIcon />
          </IconButton>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={(e) => {
            e.stopPropagation();
            setChangeTitle(change);
            setChange(change);
            dispatch(setUiData({ ...uiData, [target]: { tr_text: change } }));
            dispatch(
              setPinTitles({
                ...uiData,
                [target]: { isChanged: true, changed: change },
              })
            );
            handleClose();
          }}
          color="primary"
        >
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePinNameModal;

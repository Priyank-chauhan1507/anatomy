import { IconButton, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
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
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={7} style={{ maxWidth: "100%", flexBasis: "100%" }}>
            <Typography variant='h6'>{children}</Typography>
          </Grid>
          {other.langSelector && (
            <Grid item xs={4}>
              {other.langSelector}
            </Grid>
          )}
        </Grid>
      </Grid>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}>
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

export default function CustomizedDialogs({
  open,
  onClose,
  title,
  body,
  footer,
  langSelector,
  ...restProps
}) {
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby='customized-dialog-title'
      open={open}
      {...restProps}>
      <DialogTitle
        id='customized-dialog-title'
        onClose={onClose}
        langSelector={langSelector}>
        {title}
      </DialogTitle>
      <DialogContent dividers>{body}</DialogContent>
      {footer && <DialogActions>{footer}</DialogActions>}
    </Dialog>
  );
}

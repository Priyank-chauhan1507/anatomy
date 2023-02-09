import { useToasterMessageContext } from "../hooks/useToasterMessage";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const ToasterMessage = () => {
  const value = useToasterMessageContext();
  const classes = useStyles();

  // eslint-disable-next-line
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    value?.setStore((prev) => {
      return { ...prev, open: false };
    });
  };

  return (
    <div className={classes.root}>
      <Snackbar
        style={{ height: "20%" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={value?.store.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          style={{
            background:
              value?.store.type !== "error" && value?.store.type !== "success"
                ? "white"
                : "",
          }}
          onClose={handleClose}
          severity={value?.store.type === "info" ? "" : value?.store.type}
        >
          {value?.store.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ToasterMessage;

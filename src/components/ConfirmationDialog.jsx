import { useConfirmationDialogContext } from "../hooks/useConfirmationDialog";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog() {
  const value = useConfirmationDialogContext();

  const handleClose = () => {
	value?.setStore(prev=>{return {...prev, open: false}});
  };

  const handleCallback = (isAgree) => {
	value?.store.callback(isAgree);
	value?.setStore(prev=>{return {...prev, open: false}});
  }

  return (
    <div>
      <Dialog
        open={value?.store.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {value?.store.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
			{value?.store.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
		  <Button onClick={()=>handleCallback(false)} color="primary">
			{value?.store.disagreeText || 'Disagree'}
          </Button>
		  <Button onClick={()=>handleCallback(true)} color="primary" autoFocus>
			{value?.store.agreeText || 'Agree'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

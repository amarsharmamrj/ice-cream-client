import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip, IconButton } from '@mui/material';
import '../../../src/index.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ConfirmDialog = (props) => {
//   const [open, setOpen] = React.useState(false);
  const { title, desc, open, setOpen, handleConfirm, handleCancel }  = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth='fullwidth'
        maxWidth='sm'
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="bg-orange" style={{color: 'white'}}>
            {title}
            <span style={{float:'right'}}>
                <Tooltip title="Close">
                <IconButton 
                        aria-label="delete"
                        variant="contained"
                        // color="secondary"
                        style={{color: 'white'}}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                </IconButton>
                </Tooltip>
            </span>
            </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" style={{padding: '40px 0 10px 0', color: 'black', textAlign: 'center'}}>
            {desc}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{border: '1px solid #cfcbcb'}}>
          <Button onClick={handleConfirm} className="primary-button-dark">Confirm</Button>
          <Button onClick={handleCancel} className="primary-button-dark">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmDialog;

import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { Colors } from '../../utils/consts';

export default function ConfirmationDialog(props) {
  const { open, message, onConfirm, onClose, ...other } = props;
    const [msg, setMsg] = React.useState(message);

    React.useEffect(() => {
        setMsg(message);
    },[]);

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle sx={{backgroundColor:Colors.Secondary.Main, color:'#fff'}}>Confirmation</DialogTitle>
      <DialogContent dividers>
        <p>{msg}</p>
      </DialogContent>
      <DialogActions>
        Do you want to proceed?
        <Button autoFocus onClick={handleCancel}>No</Button>
        <Button onClick={handleOk}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}


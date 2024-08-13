import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { Colors } from '../../utils/consts';
import TextField from '@mui/material/TextField';
import {
    Box
  } from '@mui/material';

export default function EditDialog(props) {
  const { open, roles, object, onConfirm, onClose, ...other } = props;
  const [edit, setEdit] = React.useState(object);
  const [editDelta, setEditDelta] = React.useState(false);

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    if(edit.name === ''){
      alert('Can have a empty Name.\nPlease, check your input');
      return;
    }
    onConfirm(edit);
  };

  const handleChanges = async(e) => {
    setEdit({...edit, [e.target.name]:e.target.value})
    setEditDelta(true);
  }

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: 435 } }}
      open={open}
      {...other}
    >
      <DialogTitle sx={{backgroundColor:Colors.Secondary.Main, color:'#fff'}}>Tab Detail</DialogTitle>
      <DialogContent 
        dividers
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 2
        }}
        >
        <TextField id="outlined-basic" label="Header" placeholder='Header' variant="outlined" 
          sx={{
            width:'100%'
          }}
          name='header'
          value={edit.header}
          onChange={handleChanges}
        />
        <TextField id="outlined-basic" label="URL" placeholder='URL' variant="outlined" 
          sx={{
            width:'100%'
          }}
          name='url'
          value={edit.url}
          onChange={handleChanges}
        />
      </DialogContent>
      <DialogActions>
        
          <Box>
          {editDelta && (
            "Do you want to proceed with changes?"
          )}

            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleOk}>Yes</Button>
          </Box>
      </DialogActions>
    </Dialog>
  );
}

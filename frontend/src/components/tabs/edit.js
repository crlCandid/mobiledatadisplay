import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { Colors } from '../../utils/consts';
import TextField from '@mui/material/TextField';
import {
    Box,
    Switch,
    FormControlLabel,
    checkboxClasses
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

  const handleChanges = async(e, check) => {
    if(check){
      setEdit({...edit, [e.target.name]:e.target.checked})
    }else{
      setEdit({...edit, [e.target.name]:e.target.value})
    }
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
          flexDirection: 'column',
          gap: 2,
        }}
        >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 2,
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
          <TextField id="outlined-basic" label="Target URL" placeholder='URL' variant="outlined" 
            sx={{
              width:'100%'
            }}
            name='url'
            value={edit.url}
            onChange={handleChanges}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'start',
            gap: 2,
          }}
        >
          <TextField id="outlined-basic" label="Icon URL" placeholder='URL' variant="outlined" 
            sx={{
              width:'50%'
            }}
            name='icon'
            value={edit.icon}
            onChange={handleChanges}
          />
          <Box component='img' src={edit.icon} sx={{width:35}}></Box>
          <FormControlLabel control={<Switch name='embed' checked={edit.embed} onChange={(e) => handleChanges(e, true)}/>} label="Embeded" />
        </Box>
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


import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { Colors } from '../../utils/consts';
import TextField from '@mui/material/TextField';
import { Area } from '../../utils/consts';
import {
    Select,
    MenuItem,
    Box
  } from '@mui/material';

import { Session } from '../../utils';

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
      <DialogTitle sx={{backgroundColor:Colors.Secondary.Main, color:'#fff'}}>Area Detail</DialogTitle>
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
        <TextField id="outlined-basic" label="Area Name" placeholder='Area Name' variant="outlined" 
          sx={{
            width:'100%'
          }}
          name='name'
          value={edit.name}
          onChange={handleChanges}
        />
        <Select
          id="status"
          name='status'
          placeholder="Enter Description"
          value={edit.status}
          onChange={handleChanges}
          disabled={!roles.includes(Session.Indexes.Roles.Admin)}
        >
          {Area.Status.map((value, i) => (
              <MenuItem key={i} value={value}>{value}</MenuItem>
          ))}

        </Select>
      </DialogContent>
      <DialogActions>
        {editDelta && (
          <Box>
            Do you want to proceed with changes?
            <Button onClick={handleCancel}>No</Button>
            <Button onClick={handleOk}>Yes</Button>
          </Box>
        )}
      </DialogActions>
    </Dialog>
  );
}


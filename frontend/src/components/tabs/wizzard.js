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
    FormLabel,
    Select,
    MenuItem
  } from '@mui/material';

import { Constants } from '../../utils';

export default function WizzadDialog(props) {
  const { open, roles, object, onConfirm, onClose, ...other } = props;
  
  const [data, setEdit] = React.useState({
    header: '',
    type: '',
    url: ''
  });

  const [editDelta, setEditDelta] = React.useState(false);

  const handleCancel = () => {
    setEdit({
      header: '',
      type: '',
      url: ''
    });

    setEditDelta(false);

    onClose();
  };

  const handleOk = () => {
    const result = {
      header: data.header,
      url: data.type.Controller.urlConvert(data.url),
      icon: data.type.Controller.icon,
      embed: data.type.Controller.embed,
    }
    onConfirm(result);
  };

  const handleChanges = async(e) => {
    setEdit({...data, [e.target.name]:e.target.value})
    setEditDelta([data.header, data.url, data.type].every(Boolean));
  }

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: 435 } }}
      open={open}
      {...other}
    >
      <DialogTitle sx={{backgroundColor:Colors.Secondary.Main, color:'#fff'}}>Embeded Wizzard</DialogTitle>
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
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <FormLabel htmlFor="status" required>
            Select Type
          </FormLabel>
          <Select
              id="type"
              name='type'
              value={data.type}
              onChange={handleChanges}
              required
          >
              {Constants.TabWiz.Types.map((value, i) => (
                  <MenuItem key={i} value={value} selected>{value.Name}</MenuItem>
              ))}

          </Select>
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
          <TextField id="outlined-basic" label="Header" placeholder='Header' variant="outlined" 
            sx={{
              width:'100%'
            }}
            name='header'
            value={data.header}
            onChange={handleChanges}
          />
          <TextField id="outlined-basic" label="URL" placeholder='URL' variant="outlined" 
            sx={{
              width:'100%'
            }}
            name='url'
            value={data.url}
            onChange={handleChanges}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        
          <Box>
          {editDelta && (
            "Do you want to proceed with changes?"
          )}

            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleOk} disabled={![data.header, data.url, data.type].every(Boolean)}>Yes</Button>
          </Box>
      </DialogActions>
    </Dialog>
  );
}


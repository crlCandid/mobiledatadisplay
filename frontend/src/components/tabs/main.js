import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { 
  Box, 
  Typography, 
  LinearProgress, 
  Divider, 
  Link, 
  Switch, 
  Tooltip, 
  FormControlLabel 
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FeedIcon from '@mui/icons-material/Feed';

import { Tabs } from '../../controllers';
import * as StylesUtil from '../../utils/styles';
import { Session } from '../../utils';
import { ConfirmationDialog } from '../utils';
import {default as EditDialog } from './edit';

export default function Main() {
    document.title = 'Tabs';
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [roles, setRoles] = React.useState({});
    
    const [record, setRecord] = React.useState({
      header: '',
      url: '',
      icon: '',
      embed: false
    });

    const [recordOpen, setRecordOpen] = React.useState(false);
    const [recordEdit, setRecordEdit] = React.useState(undefined);
    const [recordEditOpen, setRecordEditOpen] = React.useState({});

    const [recordDelete, setRecordDelete] = React.useState(0);
    const [recordDeleteOpen, setRecordDeleteOpen] = React.useState(false);

  React.useEffect(() => {
    handleLoading();
  },[]);

  React.useEffect(() => {
    if(recordDelete === 0){
      return;
    }
    setRecordDeleteOpen(true);
  },[recordDelete]);

  const handleLoading = async() => {
    LoadData();
    LoadUserRoles();
  }

  const LoadData = async() =>{
    const result = await Tabs.List();
  
    if(!result.success){
      alert(`Error fetchin data from server. \nPlease, try again`);
      return;
    }

    setData(result.result);
    setLoading(false);
  }

  const LoadUserRoles = async() => {
    const result = await Session.Roles();
    setRoles(result);
  };

  const handleClickCrud = async() => {
    if(![record.header, record.url].every(Boolean)){
      alert(`Invalid Record. \nPlease, check your inputs.`);
      return;
    }
    
    setRecordOpen(true);
  }

  const handelCrudConfirm = async() => {
    const body = {
      ...record
    };

    const result = await Tabs.Create(body);
    
    if(result === undefined){
      alert('Error while connecting to Server. \nPlease, try again.');
      return;
    }

    if(!result.success){
      alert('Unable to create new record. \nPlease, try again');
      return;
    }

    setRecord({
      header: '',
      url: '',
      icon:''
    });
    LoadData();
  }

  const handleDetail = async(o) => {
    setRecordEdit(o);
    setRecordEditOpen(true);
  }

  const handleDetailClose = async() => {
    setRecordEdit(undefined);
    setRecordEditOpen(false);
  }

  const handleDetailConfirm = async(object) => {
    const body = {
      tab:{...object}
    }

    var result = await Tabs.Update(body);

    if(result === undefined){
      alert('Error while connecting to Server. \nPlease, try again.');
      return;
    }

    if(!result.success){
      alert('Unable to update record. \nPlease, try again');
      return;
    }

    setRecordEdit(undefined);
    setRecordEditOpen(false);
    LoadData();
  }

  const handleDeleteConfirm = async() => {
    const result = await Tabs.Remove(recordDelete);

    if(result === undefined){
      alert('Error while connecting to Server. \nPlease, try again.');
      return;
    }

    if(!result.success){
      alert('Unable to delete record. \nPlease, try again');
      return;
    }

    setRecordDelete(0);
    setRecordDeleteOpen(false);
    LoadData();
  }

  return (
    <Box>
      <ConfirmationDialog
        keepMounted
        onClose={() => setRecordOpen(false)}
        onConfirm={handelCrudConfirm}
        open={recordOpen}
        message={'A new record will be created with the given input.'}
      />

      {recordEdit !== undefined && (
        <EditDialog
          keepMounted
          onClose={handleDetailClose}
          onConfirm={handleDetailConfirm}
          open={recordEditOpen}
          object={recordEdit}
          roles={roles}
        />
      )}

      <ConfirmationDialog
        keepMounted
        onClose={() => {setRecordDeleteOpen(false); setRecordDelete(0)}}
        onConfirm={handleDeleteConfirm}
        open={recordDeleteOpen}
        message={'The Selected Record will be deleted.'}
      />

      {loading && (
        <Box
          sx={{
            pb: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">
            Tab Listing Loading
            <LinearProgress color="secondary" />
          </Typography>
        </Box>    
      )}

      {!loading && (
      <Box>
        <Box
          sx={{
            pb: 1,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">
            Tab Listing
          </Typography>
          <Box
            sx={{
              gap:2,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              display :  roles.includes(Session.Indexes.Roles.Edit)? 'flex' : 'none'
            }}
          > 
            <Typography variant="h6" sx={{display: {xs:'none', md:'initial'}}}>
              Create Record
            </Typography>
            <TextField id="outlined-basic" name='header' label="Header" placeholder='Header' variant="outlined" 
              value={record.header}
              onChange={(e) => setRecord({...record, [e.target.name]: e.target.value})}
            />
            <TextField id="outlined-basic" name='url' label="Target URL" placeholder='Target URL' variant="outlined" 
              value={record.url}
              onChange={(e) => setRecord({...record, [e.target.name]: e.target.value})}
            />
            <TextField id="outlined-basic" name='icon' label="Icon URL" placeholder='Icon URL' variant="outlined" 
              value={record.icon}
              onChange={(e) => setRecord({...record, [e.target.name]: e.target.value})}
            />
            <Box component='img' src={record.icon} sx={{width:35}}></Box>
            <Tooltip title="URL can be embedded">
              <FormControlLabel control={<Switch name='embed' checked={record.embed} onChange={(e) => setRecord({...record, [e.target.name]: e.target.checked})}/>} label="Embeded" />
            </Tooltip>
            <Tooltip title="Create">
              <IconButton onClick={handleClickCrud} >
                <AddCircleIcon color='secondary' fontSize='large'/>
              </IconButton>
            </Tooltip>
          </Box>    
        </Box>    
        
        <Divider orientation='horizontal'></Divider>

        <TableContainer component={Paper} sx={{mt:1}}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell sx={StylesUtil.Table001.Headers}>Header</TableCell>
                <TableCell sx={StylesUtil.Table001.Headers}>Url</TableCell>
                <TableCell sx={StylesUtil.Table001.Headers} align="center">Icon</TableCell>
                <TableCell sx={StylesUtil.Table001.Headers} align="center">Embed</TableCell>
                <TableCell sx={StylesUtil.Table001.Headers} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.header}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Link href={row.url} target='_blank'>Link</Link>
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    <Box component='img' src={row.icon} sx={{width:35}}></Box>
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {row.embed && (
                      <CheckCircleIcon fontSize='large' sx={{color:'#03fc0f'}}/>
                    )}
                    {!row.embed && (
                      <CancelIcon color='secondary' fontSize='large'/>
                    )}
                  </TableCell>
                  <TableCell align="center" sx={{display : roles.includes(Session.Indexes.Roles.View)? '' : 'none'}}>
                    <Tooltip title="Detail / Edit" >
                      <IconButton onClick={() => handleDetail(row)}>
                        <FeedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove" >
                      <IconButton onClick={() => setRecordDelete(row.id)}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      )}
    </Box>
  );
}
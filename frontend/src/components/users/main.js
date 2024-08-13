import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FeedIcon from '@mui/icons-material/Feed';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Typography, LinearProgress, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Users } from '../../controllers';
import * as StylesUtil from '../../utils/styles';
import { Session } from '../../utils';
import { ConfirmationDialog } from '../utils';

export default function Main() {
    document.title = 'Users';
    const nav = useNavigate();
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [roles, setRoles] = React.useState({});
    
    const [record, setRecord] = React.useState('');
    const [recordOpen, setRecordOpen] = React.useState(false);
    const [recordEdit, setRecordEdit] = React.useState(undefined);
    const [recordEditOpen, setRecordEditOpen] = React.useState({});

  React.useEffect(() => {
    handleLoading();
  },[]);

  const handleLoading = async() => {
    LoadData();
    LoadUserRoles();
  }

  const LoadData = async() =>{
    const result = await Users.List();
  
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
    if(record === ''){
      alert(`Invalid Area name. \nPlease, check your input.`);
      return;
    }
    
    setRecordOpen(true);
  }

  const handelCrudConfirm = async() => {
    const body = {
      name: record
    };

    const result = await Users.Create(body);
    
    if(result === undefined){
      alert('Error while connecting to Server. \nPlease, try again.');
      return;
    }

    if(!result.success){
      alert('Unable to create new record. \nPlease, try again');
      return;
    }

    setRecord('');
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
      area: {...object}
    }

    var result = await Users.Update(body);
    console.log('DAta', result);

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

  return (
    <Box>
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
            User Listing Loading
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
              User Listing
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
              <Tooltip title="Create">
                <IconButton onClick={() => nav('crud')} >
                  <AddCircleIcon color='secondary' fontSize='large'/>
                </IconButton>
              </Tooltip>
            </Box>    
        </Box>    
        
        <Divider orientation='horizontal'></Divider>

        <TableContainer component={Paper} sx={{mt:2}}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell sx={StylesUtil.Table001.Headers}>E-mail</TableCell>
                <TableCell sx={StylesUtil.Table001.Headers} align="center">Roles</TableCell>
                <TableCell sx={StylesUtil.Table001.Headers} align="center">Connect</TableCell>
                <TableCell sx={StylesUtil.Table001.Headers} align="center">Status</TableCell>
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
                    {row.email}
                  </TableCell>
                  <TableCell align="center">{row.roles.join(',')}</TableCell>
                  <TableCell align="center">{row.control}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center" sx={{display : roles.includes(Session.Indexes.Roles.View)? '' : 'none'}}>
                    <Tooltip title="Detail / Edit" >
                      <IconButton onClick={() =>  nav(`/app/users/detail/${row.id}`)}>
                        <FeedIcon />
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
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

import { Reports } from '../../controllers';
import * as StylesUtil from '../../utils/styles';
import { Session } from '../../utils';

export default function Main() {
    document.title = 'Reports';
    const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [roles, setRoles] = React.useState({});

  const nav = useNavigate();

  React.useEffect(() => {
    handleLoading();
  },[]);

  const handleLoading = async() => {
    LoadData();
    LoadUserRoles();
  }

  const LoadData = async() =>{
    const result = await Reports.List();
  
    if(!result.success){
      alert(`Error fetchin data from server. \nPlease, try again`);
      return;
    }
    
    setData(result.reports);
    setLoading(false);
  }

  const LoadUserRoles = async() => {
    const result = await Session.Roles();
    setRoles(result);
  };

  const handleClickCrud = async() => {
    nav('/app/reports/crud');
  }

  const handleDetail = async(id) => {
    nav(`/app/reports/detail/${id}`);
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
            Report Listing Loading
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
            <Typography variant="h6" sx={{width:'80%'}}>
              Report Listing
            </Typography>
            {/* <TextField id="outlined-basic" label="Search" variant="outlined" /> */}
            <Tooltip title="Create" sx={{display :  roles.includes(Session.Indexes.Roles.Edit)? '' : 'none'}}>
              <IconButton onClick={handleClickCrud} >
                <AddCircleIcon color='secondary' fontSize='large'/>
              </IconButton>
            </Tooltip>
        </Box>    
        
        <Divider orientation='horizontal'></Divider>

        <TableContainer component={Paper} sx={{mt:2}}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell sx={StylesUtil.Table001.Headers}>Name</TableCell>
                <TableCell sx={StylesUtil.Table001.Headers} align="right">Indentifier</TableCell>
                <TableCell sx={StylesUtil.Table001.Headers} align="right">Type</TableCell>
                <TableCell sx={StylesUtil.Table001.Headers} align="right">Status</TableCell>
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
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.identifier}</TableCell>
                  <TableCell align="right">{row.kind}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="center" sx={{display : roles.includes(Session.Indexes.Roles.View)? '' : 'none'}}>
                    <Tooltip title="Detail / Edit" >
                      <IconButton onClick={() => handleDetail(row.id)}>
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
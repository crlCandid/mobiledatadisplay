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
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Typography, LinearProgress, Divider } from '@mui/material';

import { Reports } from '../../controllers';
import * as StylesUtil from '../../utils/styles';
import { Report } from '../../utils/consts';

export default function Upper() {
  document.title = 'Reports';
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [lastSend, setLastSend] = React.useState(-1);

  const channel = React.useRef(null);

  React.useEffect(() => {
    handleLoading();

    return () => {
      if(channel.current){
        channel.current.removeEventListener('message', handleReceive);
        channel.current = null;
      }
    };
  },[]);

  React.useEffect(() => {
    if(data.length < 1){
      return;
    }

    if(lastSend < 0){
      handleReportSelect(data[0].id);
    }

  }, [data]);

  const handleLoading = async() => {
    LoadData();
    LoadComs();
  }

  const LoadComs = async() => {
    if(!channel.current){
      channel.current = new BroadcastChannel('dsp');
    }

    channel.current.addEventListener('message', handleReceive);
  }

  const LoadData = async() =>{
    const result = await Reports.List();
  
    if(!result.success){
      alert(`Error fetchin data from server. \nPlease, try again`);
      return;
    }

    ReportFiltering(result.reports);
  }

  const handleReceive = async(e) => {
    const data = e.data;

    if(data.sender === 0){ //Ignore self-msg
      return;
    }

    switch(data.action){
      case 'init':
        LowerInit();
        break;
    }

  }
  
  const handleSend = async(o) =>{
    await channel.current.postMessage(o);
  }

  const handleReportSelect = async(id) => {
    const msg = {
      sender: 0,
      action: 'report',
      id: id
    }

    setLastSend(id);
    handleSend(msg);
  }

  const LowerInit = async() => {
    if(lastSend < 0){
      return;
    }

    handleReportSelect(lastSend);
  }

  const ReportFiltering = async(data) => {
    const result = data.filter(x => 
      x.status === Report.Active
      && new Date(x.dtto) >= Date.now()
    ); //Add station areas 
    setData(result);
    setLoading(false);
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
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
            <Typography variant="h6" sx={{width:'80%'}}>
              Report Listing
            </Typography>
        </Box>    
        
        <Divider orientation='horizontal'></Divider>

        <TableContainer component={Paper} sx={{mt:2}}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell sx={StylesUtil.Table001.Headers}>Name</TableCell>
                <TableCell sx={StylesUtil.Table001.Headers} align="center">Indentifier</TableCell>
                <TableCell sx={StylesUtil.Table001.Headers} align="center">Type</TableCell>
                <TableCell sx={StylesUtil.Table001.Headers} align="center">Resources</TableCell>
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
                  <TableCell align="center">{row.identifier}</TableCell>
                  <TableCell align="center">{row.kind}</TableCell>
                  <TableCell align="center">{row.resources ? row.resources.length : 0}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Send to Lower" >
                      <IconButton onClick={() => handleReportSelect(row.id)}>
                        <DownloadIcon />
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
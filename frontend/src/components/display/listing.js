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
import HomeIcon from '@mui/icons-material/Home';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, Typography, LinearProgress, Divider, Button } from '@mui/material';

import { Reports } from '../../controllers';
import * as StylesUtil from '../../utils/styles';
import { Report } from '../../utils/consts';

export default function Listing(props) {
  const {doReturn} = props;
  document.title = 'Reports';
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [lastSend, setLastSend] = React.useState(-1);

  const [cycle, setCycle] = React.useState(false);
  const [timer, setTimer] = React.useState(0);

  const channel = React.useRef(null);

  React.useEffect(() => {
    handleLoading();

    return () => {
      if(channel.current){
        channel.current.removeEventListener('message', handleReceive);
        channel.current.close();
        channel.current = null;
      }
    };
  },[]);

  const handleLoading = async() => {
    LoadData();
    LoadComs();
  }

  const LoadComs = async() => {
    if(!channel.current){
      channel.current = new BroadcastChannel('dsp');
      channel.current.addEventListener('message', handleReceive);
    }

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
        console.log('recived init');
        LowerInit();
        break;
    }

  }
  
  const handleSend = async(o) =>{
    console.log('Send:', o);
    await channel.current.postMessage(o);
  }

  const handleReportSelect = async(id) => {
    const index = data[id].id;

    const msg = {
      sender: 0,
      action: 'report',
      id: index
    }

    setLastSend(id);
    handleSend(msg);
  }

  const LowerInit = async() => {
    if(lastSend === -1){
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
            gap: 2,
            p: 2
          }}
        >
            <Typography variant="h6" sx={StylesUtil.Card001}>
              Reportes QA
            </Typography>
            <Button variant='contained' color='secondary' onClick={doReturn} endIcon={<HomeIcon/>}>
              Ir a Inicio
            </Button>
        </Box>    
        
        <Divider orientation='horizontal'></Divider>

        <TableContainer component={Paper} sx={{mt:2}}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell sx={StylesUtil.Table001.Headers}>Nombre</TableCell>
                <TableCell sx={StylesUtil.Table001.Headers} align="center">Tipo</TableCell>
                <TableCell sx={StylesUtil.Table001.Headers} align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, i) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.kind}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Send to Lower" >
                      <IconButton onClick={() => handleReportSelect(i)}>
                        <RemoveRedEyeIcon />
                        <Typography
                          sx={{ml:1}}
                        >
                          Detalles
                        </Typography>
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
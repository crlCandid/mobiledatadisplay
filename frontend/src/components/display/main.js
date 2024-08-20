import React from 'react';
import {
    Box,
    Typography,
    Divider,
    Button, 
  } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';
import Upper from './upper';

const Main = () => {
  document.title = 'Display'
  const nav = useNavigate();
  return (
    <Box
      sx={{
        gap:2,
        display:'flex',
        flexDirection:'column',
      }}
    >
      <Typography variant='h6'>Display:</Typography>
      <Divider orientation='horizontal'></Divider>
      <Box sx={{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        gap: 2,
        p: 2
      }}>
        <Button variant='contained' color='secondary' fullWidth endIcon={<PublishIcon/>} onClick={() => nav('upper')}>
          Upper
        </Button>
        <Button variant='contained' color='secondary' fullWidth endIcon={<DownloadIcon/>} onClick={() => nav('lower')}>
          Lower
        </Button>
      </Box>
    </Box>
  );
};

export default Main;
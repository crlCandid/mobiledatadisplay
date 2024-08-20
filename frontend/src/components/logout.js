import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import * as Sessions from '../controllers/sessions';
import { GoogleLogin } from '@react-oauth/google';
import * as Decoder from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import * as Memory from '../utils/memory';
import { Session } from '../utils';

export default function Logout() {
    document.title = 'Logout';
    const nav = useNavigate();
  
    React.useEffect(() => {
      handleLoad();
    },[]);

    const handleLoad = async() => {
      await Session.Logout();
      nav('/');
    }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Logged Out
        </Typography>
        
      </Box>
    </Container>
  );
}
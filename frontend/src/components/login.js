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

export default function SignIn() {
  const nav = useNavigate();

  React.useEffect(() => {
    document.title = 'Login';
  }, [])
  
  const handleLogin = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    if(![data.get('email'), data.get('password')].every(Boolean)){
      alert('Missing information in Form. \nPlease, check input.');
      return;
    }

    const result = await Sessions.LocalLogin(data.get('email'), data.get('password'));
    
    if(!result.success){
      alert('Invalid Login information. \nPlease, try again or contact support');
      return;
    }

    const saved = await Memory.Set(Memory.Indexes.UserSession, result.result);

    if(!saved){
      alert('Error while Loging In. \nPlease, try again');
      return;
    }

    nav('/main');
  };

  const handleLoginSuccess = (response) => {
    const decoded = Decoder.jwtDecode(response.credential);
    console.log('Login Success:', decoded);
  };

  const handleLoginFailure = (response) => {
    console.log('Login Failed:', response);
  };

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
        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color='secondary'
          >
            Sign In
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
      <hr/>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          useOneTap
        />
      </Box>
    </Container>
  );
}
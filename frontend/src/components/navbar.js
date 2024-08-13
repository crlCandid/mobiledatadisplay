import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TvIcon from '@mui/icons-material/Tv';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Outlet, useNavigate } from 'react-router-dom';
import { ConfirmationDialog } from './utils';
import { Session } from '../utils';

const Const = require('../utils/consts');

function NavBar() {
    const nav = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [logoutOpen, setLogoutOpen] = React.useState(false);
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePageClick = async(i) => {
    nav(Const.NavBar.Pages[i].route);
  }

  const handleLogoutConfirm = async() => {
    const result = await Session.Logout();

    if(!result){
        alert('Error while logging out. \nPlease, try again');
        return;
    }

    nav('/');
  }

  return (
    <Box>
        <ConfirmationDialog
            keepMounted
            onClose={() => setLogoutOpen(false)}
            onConfirm={handleLogoutConfirm}
            open={logoutOpen}
            message={'You will be logged out.'}
        />

        <AppBar position="static" color='secondary'>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <TvIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                MoD2
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
                <MenuIcon />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
                >
                {Const.NavBar.Pages.filter(x => x.admin ? Session.Admin() : true).map((page, i) => (
                    <MenuItem key={page.text} onClick={() => handlePageClick(i)}>
                    <Typography textAlign="center">{page.text}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            <TvIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                MoD2
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {Const.NavBar.Pages.filter(x => x.admin ? Session.Admin() : true).map((page, i) => (
                <Button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page.text}
                </Button>
                ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} >
                    <AccountCircleIcon sx={{color:'#fff'}} fontSize='large'/>
                </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                    <MenuItem key={0} onClick={() => {setLogoutOpen(true); handleCloseUserMenu();}}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
        <Box sx={{p:2}}> 
            <Outlet />
        </Box>
    </Box>
  );
}
export default NavBar;

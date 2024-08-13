import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Box, 
    Typography, 
    Divider, 
    Button, 
    Select, 
    TextField,
    MenuItem,
    FormGroup,
    FormControlLabel,
    Switch
    } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { ConfirmationDialog } from '../utils';
import { Users } from '../../controllers';

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));
    
export default function Crud() {
    document.title = 'Users';
    const nav = useNavigate();

    const [data, setData] = React.useState({});
    const [openForm, setOpenForm] = React.useState(false);
    const [openDismiss, setOpenDismiss] = React.useState(false);

    const [isDisplay, setIsDisplay] = React.useState(false);
    const [isNormal, setIsNormal] = React.useState(false);
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [roles, setRoles] = React.useState([]);

    const handleChecks = async(e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        
        var delta = roles;
        if(checked){
            delta.push(value);
        }else{
            delta = delta.filter(x => x !== value);
        }   

        setIsAdmin(delta.includes('Admin'));
        setIsDisplay(delta.includes('Display'));
        setIsNormal(!delta.includes('Display') && delta.length > 0);
        setRoles(delta);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        if(roles.length === 0){
            alert('Invalid Input. Must select 1 role as minimum');
            return;
        }

        const form = new FormData(event.currentTarget);
        setData({
            email: form.get('email'),
            password: form.get('password'),
            roles: form.getAll('roles'),
            control: 'Local'
        });

        setOpenForm(true);
    };

    const handelRequestDismiss = async() => {
        setOpenDismiss(true);
    }
  
    const handleConfirm = async() => {
        try{
            var result = await Users.Create(data);
        }catch(e){
            alert('Something went wrong while creating User. \nPlease, try again');
            return;
        }

        if(result === undefined){
            alert('User could not be created. \nPlease, try again');
            return;
        }

        if(!result.success){
            alert('User could not be created. \nPlease, verify your input');
            return;
        }

        nav(`/app/users/detail/${result.result}`);
    }

    const handleDismiss = async() => {
        nav('/app/users');
    }

    const handleClose = async() => {
        setOpenForm(false);
        setOpenDismiss(false);
    }

  return (
    <Box>
        <ConfirmationDialog
            keepMounted
            onClose={handleClose}
            onConfirm={handleConfirm}
            open={openForm}
            message={'A new record will be created with the given input.'}
        />
        <ConfirmationDialog
            keepMounted
            onClose={handleClose}
            onConfirm={handleDismiss}
            open={openDismiss}
            message={'The Form input will be discarted.'}
        />
        <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
            component="form"
            onSubmit={handleSubmit}
            >
            <Box
                sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: 2,
                height: { xs: 300, sm: 350, md: 375 },
                width: '100%',
                borderRadius: '20px',
                border: '1px solid ',
                borderColor: 'divider',
                backgroundColor: 'background.paper',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                    <Tooltip title="Dismiss">
                        <IconButton onClick={handelRequestDismiss}>
                            <ArrowCircleLeftIcon color='secondary' fontSize='large'/>
                        </IconButton>
                    </Tooltip>
                <Typography variant="h6">User Form</Typography>
                </Box>
                <Divider orientation='horizontal' />
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    gap: 2,
                    pb: 2
                }}
                >
                    <FormGrid sx={{ flexGrow: 1 }}>
                        <FormLabel htmlFor="email" required>
                        E-mail
                        </FormLabel>
                        <TextField
                        id="email"
                        name='email'
                        placeholder="Enter E-mail"
                        required
                        />
                    </FormGrid>
                    <FormGrid sx={{ flexGrow: 1 }}>
                        <FormLabel htmlFor="password" required>
                        Password
                        </FormLabel>
                        <OutlinedInput
                        id="password"
                        name='password'
                        placeholder="123-ABC"
                        type='password'
                        required
                        />
                    </FormGrid>
                </Box>
                <Divider orientation='horizontal' />
                <FormLabel htmlFor="rol">Roles</FormLabel>
                <FormGroup row name='rol' sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Tooltip title='User intended to be only used in Mobile Station'>
                        <FormControlLabel control={<Switch name='roles' value='Display' onChange={handleChecks} disabled={isNormal && !isDisplay}/>} label="Display" />
                    </Tooltip>
                    <Tooltip title='Can enable/disable records, if applicable. Can manage User records'>
                        <FormControlLabel control={<Switch name='roles' value='Admin' onChange={handleChecks} disabled={isDisplay}/>} label="Admin" />
                    </Tooltip>
                    <Tooltip title='Can View records and their detail, if appliacable'>
                        <FormControlLabel control={<Switch name='roles' value='View' onChange={handleChecks} disabled={isDisplay}/>} label="View" />
                    </Tooltip>
                    <Tooltip title='Can Edit records'>
                        <FormControlLabel control={<Switch name='roles' value='Edit' onChange={handleChecks} disabled={isDisplay}/>} label="Edit" />
                    </Tooltip>
                    <Tooltip title='Can Remove records. Use with caution, permament deletion only'>
                        <FormControlLabel control={<Switch name='roles' value='Remove' onChange={handleChecks} disabled={isDisplay}/>} label="Remove" />
                    </Tooltip>
                </FormGroup>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                    color='secondary'
                >
                    Confirm
                </Button>

            </Box>
            </Box>
        </Stack>
    </Box>
  );
}
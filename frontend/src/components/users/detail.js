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
import { useNavigate, useParams } from 'react-router-dom';
import { ConfirmationDialog } from '../utils';
import { Users } from '../../controllers';
import { User } from '../../utils/consts';

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));
    
export default function Detail() {
    document.title = 'Users';
    const nav = useNavigate();
    const { id } = useParams();

    const [data, setData] = React.useState(undefined);
    const [hasChanges, setHasChanges] = React.useState(false);
    const [openForm, setOpenForm] = React.useState(false);
    const [openDismiss, setOpenDismiss] = React.useState(false);

    const [isDisplay, setIsDisplay] = React.useState(false);
    const [isNormal, setIsNormal] = React.useState(false);

    React.useEffect(() => {
        handleLoad();
    },[])

    React.useEffect(() => {
        if(data === undefined){
            return;
        }

        setIsDisplay(data.roles.includes('Display'));
        setIsNormal(!data.roles.includes('Display') && data.roles.length > 0);
    }, [data]);

    const handleLoad = async() => {
        const result = await Users.Find(id);

        if(result === undefined){
            alert('No user data was retrived. \nWill be returned to Users dashboard');
            nav('/app/users');
            return;
        }

        if(!result.success){
            alert('No user data was found. \nWill be returned to Users dashboard');
            nav('/app/users');
            return;
        }
        
        setData(result.result);
    }

    const handleChecks = async(e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        
        var delta = data.roles;
        if(checked){
            delta.push(value);
        }else{
            delta = delta.filter(x => x !== value);
        }   

        setData({...data, roles: delta});
        setHasChanges(true);
    }

    const handleChanges = async(e) => {
        setHasChanges(true);
        setData({...data, [e.target.name]:e.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!hasChanges){
            return;
        }

        if(data.roles.length === 0){
            alert('Invalid Input. Must select 1 role as minimum');
            return;
        }
        
        setOpenForm(true);
    };

    const handelRequestDismiss = async() => {
        if(!hasChanges){
            nav('/app/users');
            return;
        }

        setOpenDismiss(true);
    }
  
    const handleConfirm = async() => {
        try{
            var result = await Users.Update({user:{...data}});
        }catch(e){
            alert('Something went wrong while updating User. \nPlease, try again');
            return;
        }

        if(result === undefined){
            alert('User was not be updated. \nPlease, try again');
            return;
        }

        if(!result.success){
            alert('User could not be updated. \nPlease, verify your input');
            return;
        }

        setHasChanges(false);
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
            message={'The record will be Updated with the given input.'}
        />
        <ConfirmationDialog
            keepMounted
            onClose={handleClose}
            onConfirm={handleDismiss}
            open={openDismiss}
            message={'The Form input will be discarted.'}
        />

        {data !== undefined && (
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
                // justifyContent: 'space-between',
                p: 2,
                minHeight: { xs: 300, sm: 300, md: 300 },
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
                <Typography variant="h6">User Detail</Typography>
                </Box>
                <Divider orientation='horizontal' />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection:'row',
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
                        value={data.email}
                        onChange={handleChanges}
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
                        value={data.password}
                        onChange={handleChanges}
                        />
                    </FormGrid>
                    <FormGrid sx={{ flexGrow: 1 }}>
                        <FormLabel htmlFor="status" required>
                        Status
                        </FormLabel>
                        <Select
                            id="status"
                            name='status'
                            placeholder="Enter Description"
                            value={data.status}
                            onChange={handleChanges}
                            required
                        >
                            {User.Status.map((value, i) => (
                                <MenuItem key={i} value={value} selected>{value}</MenuItem>
                            ))}

                        </Select>
                    </FormGrid>
                </Box>
                <Divider orientation='horizontal' />
                <FormLabel htmlFor="rol">Roles</FormLabel>
                <FormGroup name='rol' sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                }}>
                    <Tooltip title='User intended to be only used in Mobile Station'>
                        <FormControlLabel control={<Switch name='roles' value='Display' onChange={handleChecks} disabled={isNormal && !isDisplay} checked={data.roles.includes('Display')}/>} label="Display" />
                    </Tooltip>
                    <Tooltip title='Can enable/disable records, if applicable. Can manage User records'>
                        <FormControlLabel control={<Switch name='roles' value='Admin' onChange={handleChecks} disabled={isDisplay} checked={data.roles.includes('Admin')}/>} label="Admin" />
                    </Tooltip>
                    <Tooltip title='Can View records and their detail, if appliacable'>
                        <FormControlLabel control={<Switch name='roles' value='View' onChange={handleChecks} disabled={isDisplay} checked={data.roles.includes('View')}/>} label="View" />
                    </Tooltip>
                    <Tooltip title='Can Edit records'>
                        <FormControlLabel control={<Switch name='roles' value='Edit' onChange={handleChecks} disabled={isDisplay} checked={data.roles.includes('Edit')}/>} label="Edit" />
                    </Tooltip>
                    <Tooltip title='Can Remove records. Use with caution, permament deletion only'>
                        <FormControlLabel control={<Switch name='roles' value='Remove' onChange={handleChecks} disabled={isDisplay} checked={data.roles.includes('Remove')}/>} label="Remove" />
                    </Tooltip>
                </FormGroup>
                <Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ 
                            mt: 2, 
                            mb: 2, 
                            display: hasChanges ? 'flex' : 'none'
                        }}
                        color='secondary'
                    >
                        Confirm
                    </Button>
                </Box>
            </Box>
            </Box>
        </Stack>
        )}
    </Box>
  );
}
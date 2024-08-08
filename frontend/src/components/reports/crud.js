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
    MenuItem
    } from '@mui/material';
import { styled } from '@mui/system';
import { Report } from '../../utils/consts';
import { useNavigate } from 'react-router-dom';
import { ConfirmationDialog } from '../utils';
import { Reports } from '../../controllers';

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));
    
export default function Crud() {
    const nav = useNavigate();

    const [data, setData] = React.useState({});
    const [openForm, setOpenForm] = React.useState(false);
    const [openDismiss, setOpenDismiss] = React.useState(false);

    const handleSubmit = async(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        
        //TODO get logged user info
        setData({
            creator: 1,
            name: form.get('name'),
            identifier: form.get('identifier'),
            description: form.get('description'),
            kind: form.get('kind'),
            from: form.get('dtfrom'),
            to: form.get('dtto')
        });

        setOpenForm(true);
    };

    const handelRequestDismiss = async() => {
        setOpenDismiss(true);
    }
  
    const handleConfirm = async() => {

        try{
            var result = await Reports.Create(data);
        }catch(e){
            alert('Something went wrong while creating Report. \nPlease, try again');
            return;
        }

        if(result === undefined){
            alert('Report could not be created. \nPlease, try again');
            return;
        }

        if(!result.success){
            alert('Report could not be created. \nPlease, verify your input');
            return;
        }

        nav(`/app/reports/detail/${result.result}`);
    }

    const handleDismiss = async() => {
        nav('/app/reports');
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
                <Typography variant="h6">Report Form</Typography>
                </Box>
                <Divider orientation='horizontal' />
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    gap: 2
                }}
                >
                <FormGrid sx={{ flexGrow: 1 }}>
                    <FormLabel htmlFor="name" required>
                    Name
                    </FormLabel>
                    <TextField
                    id="name"
                    name='name'
                    placeholder="Enter Name"
                    required
                    />
                </FormGrid>
                <FormGrid sx={{ minWidth: '20%' }}>
                    <FormLabel htmlFor="identifier" required>
                    Indentifier
                    </FormLabel>
                    <OutlinedInput
                    id="identifier"
                    name='identifier'
                    placeholder="123-ABC"
                    required
                    />
                </FormGrid>
                <FormGrid sx={{ minWidth: '20%' }}>
                    <FormLabel htmlFor="kind" required>
                    Kind
                    </FormLabel>
                    <Select
                        id="kind"
                        name='kind'
                        placeholder="Enter Description"
                        value={0}
                        required
                    >
                        <MenuItem key={0} value={0} selected disabled>Select Kind</MenuItem>

                        {Report.Kinds.map((value, i) => (
                            <MenuItem key={i} value={value}>{value}</MenuItem>
                        ))}
                    </Select>
                </FormGrid>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                <FormGrid sx={{ flexGrow: 1 }}>
                    <FormLabel htmlFor="description" required>
                    Description
                    </FormLabel>
                    <OutlinedInput
                    id="description"
                    name='description'
                    placeholder="Enter Description"
                    required
                    multiline
                    />
                </FormGrid>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                <FormGrid sx={{ flexGrow: 1 }}>
                    <FormLabel htmlFor="dtfrom" required>
                    Start date
                    </FormLabel>
                    <OutlinedInput
                    id="dtfrom"
                    name='dtfrom'
                    placeholder="MM/DD/YY"
                    type='date'
                    required
                    />
                </FormGrid>
                <FormGrid sx={{ flexGrow: 1 }}>
                    <FormLabel htmlFor="dtto" required>
                    Expiration date
                    </FormLabel>
                    <OutlinedInput
                    id="dtto"
                    name='dtto'
                    placeholder="MM/DD/YY"
                    type='date'
                    required
                    />
                </FormGrid>
                </Box>
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
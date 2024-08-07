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
    LinearProgress,
    Link
    } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { styled } from '@mui/system';
import { Report } from '../../utils/consts';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfirmationDialog } from '../utils';
import { Reports, Areas } from '../../controllers';
import * as StylesUtil from '../../utils/styles';

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));
    
export default function Detail() {
    const { id } = useParams();
    const nav = useNavigate();

    const [loading, setLoading] = React.useState(true);
    const [areas, setAreas] = React.useState([]);
    const [validAreas, setValidAreas] = React.useState([]);
    const [report, setReport] = React.useState({});

    const [data, setData] = React.useState({});
    const [openForm, setOpenForm] = React.useState(false);
    const [openDismiss, setOpenDismiss] = React.useState(false);
    
    const [areaOpen, setAreaOpen] = React.useState(false);
    const [areaId, setAreaId] = React.useState(0);
    const [areaRemoveOpen, setAreaRemoveOpen] = React.useState(false);
    const [areaRemoveId, setAreaRemoveId] = React.useState(0);

    const [resourceUrl, setResourceUrl] = React.useState('');
    const [resourceOpen, setResourceOpen] = React.useState(false);
    const [resourceId, setResourceId] = React.useState(0);
    const [resourceRemoveOpen, setResourceRemoveOpen] = React.useState(false);

    React.useEffect(() => {
        handleLoad();
    },[]);

    React.useEffect(() => {
        if(areaRemoveId === 0){
            setAreaRemoveOpen(false);
            return;
        }

        setAreaRemoveOpen(true);
    }, [areaRemoveId]);

    React.useEffect(() => {
        if(resourceId === 0){
            setResourceRemoveOpen(false);
            return;
        }

        setResourceRemoveOpen(true);
    }, [resourceId]);

    React.useEffect(() => {
        if(areas.length < 1){
            return;
        }

        ValidAreas();
    }, areas);

    const handleLoad = async() => {
        await LoadReport();
        await LoadAreas();

        setLoading(false);
    }

    const LoadAreas = async() => {
        try{
            var result = await Areas.List();
        }catch(e){
            alert('Error rised while fetching Report/Areas info. \nWill be returned to Report dashboard');
            nav('/app/reports');
            return;
        }

        if(result === undefined){
            alert('No report/areas data was retrived. \nWill be returned to Report dashboard');
            nav('/app/reports');
            return;
        }

        if(!result.success){
            alert('No report/areas data was found. \nWill be returned to Report dashboard');
            nav('/app/reports');
            return;
        }
        setAreas(result.result);
    }

    const LoadReport = async() => {
        try{
            var result = await Reports.Find(id);
        }catch(e){
            alert('Error rised while fetching Report info. \nWill be returned to Report dashboard');
            nav('/app/reports');
            return;
        }

        if(result === undefined){
            alert('No report data was retrived. \nWill be returned to Report dashboard');
            nav('/app/reports');
            return;
        }

        if(!result.success){
            alert('No report data was found. \nWill be returned to Report dashboard');
            nav('/app/reports');
            return;
        }

        result.result.dtfrom = new Date(result.result.dtfrom).toISOString().split('T')[0];
        result.result.dtto = new Date(result.result.dtto).toISOString().split('T')[0];
        setReport(result.result);
    }

    const ValidAreas = async() => {
        var reportInfo = report.areas;
        
        if(reportInfo === null){
            setValidAreas(areas);
            return;
        }

        var result = areas.filter(x => !reportInfo.some(y => y.id == x.id));
        setValidAreas(result);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);

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
            alert('Something went wrong while creating Report, \nPlease, try again');
            return;
        }

        if(result === undefined){
            alert('Something went wrong while creating Report, \nPlease, try again');
            return;
        }

        console.log(result);
        //TODO Redirect to Detail
    }

    const handleDismiss = async() => {
        nav('/app/reports');
    }

    const handleClose = async() => {
        setOpenForm(false);
        setOpenDismiss(false);
    }

    const handleRequestArea = async() => {
        if(areaId === 0){
            alert('Invalid selected Area. \nPlease use other Option');
            return;
        }
        
        setAreaOpen(true);
    }

    const handleAreaConfirm = async() => {
        const body = {
            reportId: report.id,
            areaId: areaId
        };

        try{
            var result = await Reports.AddArea(body);
        }catch(e){
            alert('Error rised while adding Area to Report . \nPlease, try again.');
            return;
        }

        if(result === undefined){
            alert('Unable to add Area to Report . \nPlease, try again.');
            return;
        }

        if(!result.success){
            alert('Unable to add Area to Report . \nPlease, try again.');
            return;
        }

        setAreaId(0);
        handleLoad();
    }

    const handleAreaRemoveConfirm = async() => {
        try{
            var result = await Reports.RemoveArea(areaRemoveId);
        }catch(e){
            alert('Error rised while removing Area from Report . \nPlease, try again.');
            return;
        }

        if(result === undefined){
            alert('Unable to remove Area from Report . \nPlease, try again.');
            return;
        }

        if(!result.success){
            alert('Unable to remove Area from Report . \nPlease, try again.');
            return;
        }

        setAreaRemoveId(0);
        handleLoad();
    }

    const handleRequestResource = async() => {
        if(resourceUrl === ''){
            alert('Invalid Input for new Resource. \nPlease, check your inputs');
            return;
        }
        setResourceOpen(true);
    }

    const handleResourceConfirm = async() => {
        const body = {
            reportId: report.id,
            url: resourceUrl
        };

        try{
            var result = await Reports.AddResource(body);
        }catch(e){
            alert('Error rised while adding Resource to Report . \nPlease, try again.');
            return;
        }

        if(result === undefined){
            alert('Unable to add Resource to Report . \nPlease, try again.');
            return;
        }

        if(!result.success){
            alert('Unable to add Resource to Report . \nPlease, try again.');
            return;
        }

        setResourceUrl('')
        handleLoad();
    }

    const handeResourceRemoveConfirm = async() => {
        try{
            var result = await Reports.RemoveResource(resourceId);
        }catch(e){
            alert('Error rised while removing Resource from Report . \nPlease, try again.');
            return;
        }

        if(result === undefined){
            alert('Unable to remove Resource from Report . \nPlease, try again.');
            return;
        }

        if(!result.success){
            alert('Unable to remove Resource from Report . \nPlease, try again.');
            return;
        }

        setResourceId(0);
        handleLoad();
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
                Report Info Loading
                <LinearProgress color="secondary" />
            </Typography>
            </Box>    
        )}

        {!loading && (
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
                    message={'Any usaved changes will be lost.'}
                />

                <ConfirmationDialog
                    keepMounted
                    onClose={() => setAreaOpen(false)}
                    onConfirm={handleAreaConfirm}
                    open={areaOpen}
                    message={'The selected Area will be sync with the Report'}
                />
                <ConfirmationDialog
                    keepMounted
                    onClose={() => setAreaRemoveId(0)}
                    onConfirm={handleAreaRemoveConfirm}
                    open={areaRemoveOpen}
                    message={'The selected Area will be desync from the Report. \nAny usaved changes will be lost.'}
                />

                <ConfirmationDialog
                    keepMounted
                    onClose={() => setResourceOpen(false)}
                    onConfirm={handleResourceConfirm}
                    open={resourceOpen}
                    message={'The selected Resource will be sync with the Report. \nAny usaved changes will be lost.'}
                />
                <ConfirmationDialog
                    keepMounted
                    onClose={() => setResourceId(0)}
                    onConfirm={handeResourceRemoveConfirm}
                    open={resourceRemoveOpen}
                    message={'The selected Resource will be desync from the Report. \nAny usaved changes will be lost.'}
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
                            <Typography variant="h6" sx={{width:'50%'}}>Report Detail</Typography>
                            <Typography variant="h7" >Created By: {report.creatorinfo || 123}</Typography>
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
                                value={report.name}
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
                                placeholder="123"
                                value={report.identifier}
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
                                    value={report.kind}
                                    required
                                >
                                    {Report.Kinds.map((value, i) => (
                                        <MenuItem key={i} value={value} selected>{value}</MenuItem>
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
                                value={report.description}
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
                                value={report.dtfrom}
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
                                value={report.dtto}
                                type='date'
                                required
                                />
                            </FormGrid>
                            </Box>
                        </Box>
                    </Box>
                </Stack>
                <Box
                    sx={{
                        mt:2,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '50%',
                            gap: 2,
                        }}
                    >
                        <Box
                            sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            p: 2,
                            // height: { xs: 300, sm: 350, md: 375 },
                            width: '100%',
                            borderRadius: '20px',
                            border: '1px solid ',
                            borderColor: 'divider',
                            backgroundColor: 'background.paper',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                            <Typography variant="h7" sx={{width:'20%'}}> Areas</Typography>
                            <Select
                                sx={{
                                    width:'100%'
                                }}
                                id="kind"
                                name='kind'
                                value={areaId}
                                onChange={(e) => setAreaId(e.target.value)}
                            >
                                <MenuItem key={0} value={0} selected>Select Area</MenuItem>

                                {validAreas.map((value, i) => (
                                    <MenuItem key={i} value={value.id}>{value.name}</MenuItem>
                                ))}

                            </Select>
                            <Tooltip title="Add Area">
                                <IconButton onClick={() => handleRequestArea()}>
                                    <AddCircleIcon color='secondary' fontSize='large'/>
                                </IconButton>
                            </Tooltip>
                            </Box>
                            <Divider orientation='horizontal' sx={{pt:2}} />
                            <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                                gap: 2
                            }}
                            >
                                <TableContainer sx={{mt:2}}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                        <TableRow >
                                            <TableCell sx={StylesUtil.Table001_s.Headers}>Name</TableCell>
                                            <TableCell sx={StylesUtil.Table001_s.Headers} align="center">Actions</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {report.areas !== null && report.areas.map((row) => (
                                                <TableRow
                                                key={row.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Tooltip title="Delete">
                                                    <IconButton onClick={() => setAreaRemoveId(row.relation)}>
                                                        <DeleteIcon fontSize='small'/>
                                                    </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '50%',
                            gap: 2,
                        }}
                    >
                        <Box
                            sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            p: 2,
                            // height: { xs: 300, sm: 350, md: 375 },
                            width: '100%',
                            borderRadius: '20px',
                            border: '1px solid ',
                            borderColor: 'divider',
                            backgroundColor: 'background.paper',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                <Typography variant="h7" sx={{width:'20%'}}>Resources</Typography>
                                <OutlinedInput
                                    sx={{width:'100%'}}
                                    id="resource"
                                    name='resource'
                                    placeholder="Input Resource URL"
                                    value={resourceUrl}
                                    onChange={(e) => setResourceUrl(e.target.value)}
                                />
                                <Tooltip title="Add Resource">
                                    <IconButton onClick={handleRequestResource}>
                                        <AddCircleIcon color='secondary' fontSize='large'/>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Divider orientation='horizontal' sx={{pt:2}} />
                            <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                                gap: 2
                            }}
                            >
                                <TableContainer sx={{mt:2}}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                        <TableRow >
                                            <TableCell sx={StylesUtil.Table001_s.Headers}>URL</TableCell>
                                            <TableCell sx={StylesUtil.Table001_s.Headers} align="center">Actions</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {report.resources !== null && report.resources.map((row) => (
                                            <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                            <TableCell component="th" scope="row">
                                                <Link href={row.url} target='_blank'>Link To be Name</Link>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Tooltip title="Delete">
                                                <IconButton onClick={() => setResourceId(row.id)}>
                                                    <DeleteIcon fontSize='small'/>
                                                </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            
        )}

    </Box>
  );
}
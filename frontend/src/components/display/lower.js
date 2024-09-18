import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { Box, 
    Typography, 
    Divider, 
    Select, 
    TextField,
    MenuItem,
    LinearProgress,
    Button,
    } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { styled } from '@mui/system';
import { Report } from '../../utils/consts';
import { useNavigate } from 'react-router-dom';
import { Reports } from '../../controllers';
import * as StylesUtil from '../../utils/styles';

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));
    
export default function Lower() {
    const channel = React.useRef(null);
    const nav = useNavigate();

    const [vh, setVh] = React.useState(window.innerHeight);
    const [vw, setVw] = React.useState(window.innerWidth);

    const [loading, setLoading] = React.useState(true);
    const [report, setReport] = React.useState({});
    const [readId, setReadId] = React.useState(0);
    const [embed, setEmbed] = React.useState(undefined);
    
    React.useEffect(() => {
        LoadComs();
        window.addEventListener('resize', ScreenHook);

        return () => {
            window.removeEventListener('resize', ScreenHook);
            if(channel.current){
                channel.current.removeEventListener('message', handleReceive);
                channel.current.close();
                channel.current = null;
            }
        };
    },[]);

    React.useEffect(() => {
        if(readId < 1){
            return;
        }
        console.log('Hook');
        handleLoad();
    }, [readId]);

    const ScreenHook = async() => {
        setVh(window.innerHeight);
        setVw(window.innerWidth);
    }

    const LoadComs = async() => {
        if(!channel.current){
            channel.current = new BroadcastChannel('dsp');
            channel.current.addEventListener('message', handleReceive);
        }

        setTimeout(Init, 500);
    }

    const Init = async() => {
        const msg = {
            sender: 1,
            action: 'init',
        }

        handleSend(msg);
    }

    const handleReceive = async(e) => {
        const data = e.data;

        if(data.sender === 1){ //Ignore self-msg
        return;
        }

        switch(data.action){
            case 'report':
                console.log("Report: ", data);
                setReadId(data.id);
                break;
            case 'nav':
                window.open(data.url, '_self');
                break;
            case 'embed':
                OpenEmbed(data.url);
                break;
        }
    }


    const handleSend = async(o) =>{
        await channel.current.postMessage(o);
    }

    const handleLoad = async() => {
        setEmbed(undefined);
        setLoading(true);
        await LoadReport();
        setLoading(false);
    }

    const LoadReport = async() => {
        console.log('Loading....');
        try{
            var result = await Reports.Find(readId);
        }catch(e){
            return;
        }

        if(result === undefined){
            return;
        }

        if(!result.success){
            return;
        }

        result.result.dtfrom = new Date(result.result.dtfrom).toISOString().split('T')[0];
        result.result.dtto = new Date(result.result.dtto).toISOString().split('T')[0];
        setReport(result.result);
    }
    
    const CloseReport = async() => {
        setReadId(0);
        setLoading(true);
    }

    const OpenEmbed = async(url) => {
        setReadId(0);
        setEmbed(url);
        setLoading(false);
    }

    const CloseEmbed = async() => {
        setEmbed(undefined);
        setLoading(true);
        Init()
    }

    const OpenResource = async(url) => {
        const msg = {
            sender: 1,
            action: 'banner',
        }

        handleSend(msg);
        window.open(url, '_self');
    }

  return (
    <Box>
        {loading && (
            <Box
            sx={{
                mt: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Typography variant="h4">
                Usa el panel superior para seleccionar la sección de tu interes
                <LinearProgress color="secondary" />
            </Typography>
            </Box>    
        )}

        {(!loading && readId > 0)&& (
            <Box>
                <Stack spacing={{ xs: 2, sm: 2 }} useFlexGap>
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                    >
                        <Box
                            sx={{
                            display: 'flex',
                            flexDirection: 'column',
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
                            <Box sx={{ display: 'flex', alignItems: 'center', gap:2, mb:2}}>
                                <Button color='secondary' variant='contained' onClick={CloseReport} startIcon={<ReplayCircleFilledIcon/>}>Regresar</Button>
                                <Typography sx={{width:'50%'}}>Detalles de Reporte</Typography>
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
                            <FormGrid sx={{ flexGrow: 1,}}>
                                <FormLabel htmlFor="name" required>
                                Nombre
                                </FormLabel>
                                <TextField
                                size='small'
                                id="name"
                                name='name'
                                placeholder="Enter Name"
                                value={report.name}
                                readOnly
                                />
                            </FormGrid>
                            <FormGrid sx={{ minWidth: '20%' }}>
                                <FormLabel htmlFor="identifier" required>
                                Identificador
                                </FormLabel>
                                <OutlinedInput
                                size='small'
                                id="identifier"
                                name='identifier'
                                placeholder="123"
                                value={report.identifier}
                                readOnly
                                />
                            </FormGrid>
                            <FormGrid sx={{ minWidth: '20%' }}>
                                <FormLabel htmlFor="kind" required>
                                Tipo
                                </FormLabel>
                                <Select
                                size='small'
                                    id="kind"
                                    name='kind'
                                    placeholder="Enter Description"
                                    value={report.kind}
                                    readOnly
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
                                Descripcion
                                </FormLabel>
                                <OutlinedInput
                                size='small'
                                id="description"
                                name='description'
                                placeholder="Enter Description"
                                value={report.description}
                                readOnly
                                multiline
                                />
                            </FormGrid>
                            <FormGrid sx={{ flexGrow: 1 }}>
                                <FormLabel htmlFor="dtfrom" required>
                                Inicia
                                </FormLabel>
                                <OutlinedInput
                                size='small'
                                id="dtfrom"
                                name='dtfrom'
                                placeholder="MM/DD/YY"
                                type='date'
                                value={report.dtfrom}
                                readOnly={true}
                                />
                            </FormGrid>
                            <FormGrid sx={{ flexGrow: 1 }}>
                                <FormLabel htmlFor="dtto" required>
                                Expira
                                </FormLabel>
                                <OutlinedInput
                                size='small'
                                id="dtto"
                                name='dtto'
                                placeholder="MM/DD/YY"
                                value={report.dtto}
                                type='date'
                                readOnly={true}
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
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: { xs: '100%', md: '100%' },
                            gap: 2,
                        }}
                    >
                        <Box
                            sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            p: 1,
                            width: '100%',
                            borderRadius: '20px',
                            border: '1px solid ',
                            borderColor: 'divider',
                            backgroundColor: 'background.paper',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                <Typography sx={{width:{sm:'10%', md:'25%'}}}>Recursos</Typography>
                            </Box>
                            <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                                gap: 2
                            }}
                            >
                                <TableContainer sx={{mt:2}}>
                                    <Table aria-label="simple table" size='small'>
                                        <TableHead>
                                        <TableRow >
                                            <TableCell sx={StylesUtil.Table001_s.Headers}>Nombre</TableCell>
                                            <TableCell sx={StylesUtil.Table001_s.Headers} align='center'>Revisar</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {report.resources !== null && report.resources.map((row) => (
                                            <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell component="th" scope="row" align='center'>
                                                <Button variant='contained' color='secondary' startIcon={<VisibilityIcon />} onClick={() => OpenResource(row.url)}>Ver</Button>
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

        {(!loading && embed !== undefined) && (
            <Box
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    padding:1
                }}
            >
                <Box
                    sx={{
                        marginBottom: 1
                    }}
                >
                    <Button color='secondary' variant='contained' onClick={CloseEmbed} startIcon={<ReplayCircleFilledIcon/>}>Regresar</Button>
                </Box>
                <iframe height={vh*0.85} src={embed}/>
            </Box>
        )}
    </Box>
  );
}
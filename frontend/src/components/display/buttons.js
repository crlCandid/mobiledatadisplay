import * as React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { Box, Typography, LinearProgress, Divider, Switch, FormControlLabel, Button, Collapse,Zoom } from '@mui/material';
import lwr001 from '../../media/img/lwr001.png';
import lwr002 from '../../media/img/lwr002.png';
import lwr003 from '../../media/img/lwr003.png';

import { Tabs } from '../../controllers';
import { Styles } from '../../utils';

export default function Buttons(props) {
  const {doReturn} = props;
  const imgs = [lwr001, lwr002, lwr003];

  const [vh, setVh] = React.useState(window.innerHeight);
  const [vw, setVw] = React.useState(window.innerWidth);
  const [view, setView] = React.useState(false);
  const [tabs, setTabs] = React.useState([]);
  const [img, setImg] = React.useState(0);
  const [imgCycle, setImgCycle] = React.useState(false);
  const [imgShow, setImgShow] = React.useState(false);
  const [imgId, setImgId] = React.useState(0);

  const channel = React.useRef(null);

  React.useEffect(() => {
    handleLoad();

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
    if(tabs.length < 1){
      return;
    }

    setView(true);
  },[tabs]);

  const handleHome = async() => {
    setView(false);
  }

  const handleLoad = async() => {
    LoadTabs();
    ScreenHook();
    LoadComs();
  }

  const LoadTabs = async() => {
    const result = await Tabs.List();

    if(result === undefined){
      alert('No se puede conectar con el servidor. Volviendo a inicio');
      doReturn();
      return;
    }

    if(!result.success){
      alert('No se pueden cargar los accesos de tabs. Volviendo a inicio');
      doReturn();
      return;
    }

    setTabs(result.result);
  }

  const ScreenHook = async() => {
    setVh(window.innerHeight);
    setVw(window.innerWidth);
  }

  const LoadComs = async() => {
    if(!channel.current){
      channel.current = new BroadcastChannel('dsp');
      channel.current.addEventListener('message', handleReceive);
    }
  }

  const handleReceive = async(e) => {
    const data = e.data;

    if(data.sender === 0){ //Ignore self-msg
      return;
    }

    switch(data.action){
      case 'init':
        handleReset();
        break;
    }
  }
  
  const handleSend = async(o) =>{
    await channel.current.postMessage(o);
  }

  const handleClick = async(data) => {
    const msg = {
      sender: 0,
      action: data.embed ? 'embed' : 'nav',
      url: data.url,
    }

    handleSend(msg);
    setImgCycle(true);
    setView(false);
  }

  const handleAction = async() => {
    if(imgCycle){
      setImgShow(true);
      return;
    }

    doReturn();
  }

  const handleReset = async() => {
    clearTimeout(imgId);
    setImgShow(false);
    setImgCycle(false);
    setView(true);
  }

  const handleCycleEnter = async() =>{
    const id = setTimeout(() => {
      setImgCycle(false);
    }, 5000);

    setImgId(id);
  }

  const handleCycleExit = async() =>{
    const next = img + 1 >= imgs.length ? 0 : img + 1;
    setImg(next);
    setImgCycle(true);
  }

  return (
    <Box
      sx={{
        display:'flex',
        flexDirection:'row',
        width: '100%',
        height: '100vh',
        flexWrap: 'wrap',
      }}
    >

      {imgShow && (
        <Box
          sx={{
            display:'flex',
            flexDirection:'column',
            height:(vh * 0.5),
            width:vw,
            alignItems:'center'
          }}
        >
          <Zoom in={imgShow && imgCycle} onEntered={handleCycleEnter} onExited={handleCycleExit}>
            <Box
              component='img'
              src={imgs[img]}
              sx={{
                height:(vh * 0.75),
              }}
            >
            </Box>
          </Zoom>
          <Typography variant='h4' 
            sx={{
              ...Styles.Table001.Headers, 
              display:'flex', 
              width:'100%', 
              height:'100%',
              flexDirection:'column', 
              alignItems:'center', 
              fontSize:(vw*0.025)}} 
            >
            Realiza un touch de 3 dedos en la pantalla inferior para volver al inicio
          </Typography>
        </Box>
      )}

      {!imgShow && (
        <Zoom in={view} onExited={handleAction}>
          <Button variant='contained' color='secondary' sx={{ width:(vw * 0.248), height:'50%', borderInlineColor:'#fff', border:4, borderRadius:4}} onClick={handleHome} >
            <Box>
              <HomeIcon sx={{fontSize:100}}/>
              <Typography variant='h6'>
                Ir a Inicio
              </Typography>
            </Box>
          </Button>
        </Zoom>
      )}
      {!imgShow && tabs.map((data,i) => (
        <Zoom in={view} style={{transitionDelay: view ? (100 * (i + 1)) : 0}}>
          <Button variant='contained' color='secondary' sx={{ width:(vw * 0.248), height:'50%', borderInlineColor:'#fff', border:4, borderRadius:4}} onClick={() => handleClick(data)} >
          <Box>
            <Box component='img' src={data.icon} sx={{width:75, borderRadius:7}}></Box>
            <Typography variant='h6'>
              {data.header}
            </Typography>
          </Box>
        </Button>
        </Zoom>
      ))}

    </Box>
  );
}
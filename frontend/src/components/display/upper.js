import * as React from 'react';
import FactoryIcon from '@mui/icons-material/Factory';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Box, Typography, LinearProgress, Divider, Switch, FormControlLabel, Collapse, Button, Paper } from '@mui/material';

import Listing from './listing';
import Buttons from './buttons';

export default function Upper() {
  document.title = 'Reports';

  const [view, setView] = React.useState(true);
  const [show, setShow] = React.useState(false);
  const [component, setComponent] = React.useState(<Listing />)

  const handleSelect = async(c) => {
    setComponent(c);
    setView(false);
  }
  
  const handleReturn = async() => {
    setView(true);
  }

  return (
    <Box>
      <Collapse 
        in={view}
        onEnter={() =>  setShow(false)}
        onExited={() => setShow(true)}
      >
        <Box
          sx={{
            p:1,
            gap:1,
            display:'flex',
            height:'100vh'
          }}
        >
          <Button variant='contained' color='secondary' fullWidth onClick={() => handleSelect(<Listing doReturn={handleReturn}/>)}>
            <Box>
            <WorkspacePremiumIcon sx={{fontSize:150}}/>
            <Typography variant='h4'>
                Reportes QA
              </Typography>
            </Box>
          </Button>
          <Button variant='contained' color='secondary' fullWidth onClick={() => handleSelect(<Buttons doReturn={handleReturn}/>)}>
            <Box>
            <FactoryIcon sx={{fontSize:150}}/>
            <Typography variant='h4'>
                Producción
              </Typography>
            </Box>
          </Button>
        </Box>
      </Collapse>
      {show && component}
    </Box>
  );
}
import React from 'react';
import ActionCard from './actionCard';
import {
    Box,
    Typography,
    Divider,
    nativeSelectClasses
  } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { Reports } from '../../controllers';
import { Report } from '../../utils/consts';

const Main = () => {
  document.title = 'Dashboard'
  const nav = useNavigate();

  const [reportsCard, setReportsCard] = React.useState(['Loading Information']);

  React.useEffect(() => {
    handleLoad();
  }, []);

  const handleLoad = async() => {
    LoadReportsCard();
  }

  const LoadReportsCard = async() => {
    const response = await Reports.List();

    if(response === undefined){
      return;
    }

    if(!response.success){
      return;
    }

    const data = response.reports;
    var result = [];
    result.push(`Active Alerts: ${await AnalizeReports(Report.Kind.Alert, data)}`);
    result.push(`Active NCRs: ${await AnalizeReports(Report.Kind.Ncr, data)}`);
    result.push(`Active Deviations: ${await AnalizeReports(Report.Kind.Deviation, data)}`);

    setReportsCard(result);
  }

  const AnalizeReports = async(kind, data) => {
    const result = data.filter(x => x.kind === kind && x.status === Report.Active && new Date(x.dtto) >= Date.now());
    return result.length;
  }

  return (
    <Box
      sx={{
        gap:2,
        display:'flex',
        flexDirection:'column',
      }}
    >
      <Typography variant='h6'>Main Dashboard</Typography>
      <Divider orientation='horizontal'></Divider>
      <Box row>
        <ActionCard 
          title='Active Reports'
          info={reportsCard}
          foot='Go to Reports'
          action={() => nav('/app/reports')}
        />
      </Box>
    </Box>
  );
};

export default Main;

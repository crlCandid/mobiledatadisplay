import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { 
  CardHeader,
  CardActions,
  Button
 } from '@mui/material';

import { Styles } from '../../utils';

export default function ActionCard(props) {
  const {title, info, foot, action} = props
  return (
    <Card sx={{ 
        maxWidth: 345, 
        boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)',
      }} 
      variant='outlined'
    >
      <CardHeader
        sx={
          Styles.Card001.Headers
        }
        title={title}
      />
      <CardContent>
        {info.map(x =>(
          <Typography variant="body2" color="text.secondary">
            {x}
          </Typography>
        ))}
      </CardContent>
      <CardActions sx={{
          ...Styles.Card001.Headers,
          display: 'flex',
          flexDirection: 'row-reverse',
        }}>
        <Button 
          onClick={action}
          sx={{color: 'white', display: 'block-inline', }}
          endIcon={<ArrowForwardIosIcon/>}
        >
          {foot} 
        </Button>
      </CardActions>
    </Card>
  );
}

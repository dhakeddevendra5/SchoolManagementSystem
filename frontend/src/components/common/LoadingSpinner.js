import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingSpinner = ({ fullHeight }) => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center"
      minHeight={fullHeight ? '80vh' : 'auto'}
      p={4}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
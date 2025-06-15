import React from 'react';
import { Typography, Container, Paper } from '@mui/material';

const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome to your dashboard. Here you can view important information and quick actions.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Dashboard;
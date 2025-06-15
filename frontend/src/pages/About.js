import React from 'react';
import { Typography, Container, Paper } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          About This Application
        </Typography>
        <Typography variant="body1" paragraph>
          Student Management System is a full-stack application built with:
        </Typography>
        <ul>
          <li><Typography>React.js for the frontend</Typography></li>
          <li><Typography>Material-UI for UI components</Typography></li>
          <li><Typography>Spring Boot for the backend</Typography></li>
          <li><Typography>JPA/Hibernate for database operations</Typography></li>
        </ul>
      </Paper>
    </Container>
  );
};

export default About;
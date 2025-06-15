import React from 'react';
import { Container } from '@mui/material';
import StudentList from '../components/students/StudentList';

const Students = () => {
  return (
    <Container maxWidth="lg">
      <StudentList />
    </Container>
  );
};

export default Students;
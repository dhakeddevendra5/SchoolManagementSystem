// Home.js
import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Box, Button, Grid, Divider, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import useStudents from '../hooks/useStudents'; // assumes a custom hook exists

const Home = () => {
  const { students, loading, error } = useStudents();
  const [recentStudents, setRecentStudents] = useState([]);

  useEffect(() => {
    if (students && students.length > 0) {
      const sorted = [...students].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRecentStudents(sorted.slice(0, 5)); // show top 5 most recent
    }
  }, [students]);

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Student Management System
        </Typography>
        <Typography variant="body1" paragraph>
          This dashboard helps you manage student records efficiently.
        </Typography>

        <Box mt={4}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper elevation={1} sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6">Total Students</Typography>
                <Typography variant="h4" color="primary">
                  {loading ? '...' : students.length}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
              <Paper elevation={1} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Recently Added Students
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List dense>
                  {recentStudents.map((student) => (
                    <ListItem key={student.id} divider>
                      <ListItemText
                        primary={`${student.firstName} ${student.lastName}`}
                        secondary={student.department}
                      />
                      <Button
                        size="small"
                        component={Link}
                        to={`/students/${student.id}`}
                      >
                        View
                      </Button>
                    </ListItem>
                  ))}
                  {recentStudents.length === 0 && !loading && (
                    <Typography variant="body2" color="text.secondary">
                      No students found.
                    </Typography>
                  )}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Box mt={4} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/students"
          >
            Manage Students
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Grid, 
  Divider,
  Chip
} from '@mui/material';
import { Edit, ArrowBack } from '@mui/icons-material';
import { getStudentById } from '../../services/StudentService';
import { formatDate } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';

const StudentView = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await getStudentById(id);
        setStudent(response.data);
      } catch (err) {
        setError('Failed to fetch student details');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!student) return <Typography>Student not found</Typography>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Button
          component={Link}
          to="/students"
          startIcon={<ArrowBack />}
          variant="outlined"
        >
          Back to Students
        </Button>
        <Button
          component={Link}
          to={`/students/${id}/edit`}
          startIcon={<Edit />}
          variant="contained"
          color="primary"
        >
          Edit Student
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {student.firstName} {student.lastName}
        </Typography>
        <Chip 
          label={student.department} 
          color="primary" 
          variant="outlined" 
          sx={{ mb: 3 }} 
        />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Personal Information</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Email</Typography>
              <Typography>{student.email}</Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Date of Birth</Typography>
              <Typography>{formatDate(student.dateOfBirth)}</Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Phone Number</Typography>
              <Typography>{student.phoneNumber || 'N/A'}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Additional Information</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Address</Typography>
              <Typography>
                {student.address || 'No address provided'}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Student ID</Typography>
              <Typography>{student.id}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default StudentView;
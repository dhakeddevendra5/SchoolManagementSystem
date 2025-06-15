import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Chip,
  Box
} from '@mui/material';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';

const StudentCard = ({ student }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {student.firstName} {student.lastName}
        </Typography>
        
        <Chip 
          label={student.department} 
          color="primary" 
          size="small" 
          sx={{ mb: 2 }} 
        />

        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Email: {student.email}
          </Typography>
        </Box>

        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            DOB: {formatDate(student.dateOfBirth)}
          </Typography>
        </Box>

        <Box sx={{ mt: 'auto', pt: 2 }}>
          <Button
            component={Link}
            to={`/students/${student.id}`}
            variant="outlined"
            size="small"
            fullWidth
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StudentCard;
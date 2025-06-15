import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Typography,
  Box,
  TextField
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useStudents from '../../hooks/useStudents';
import StudentForm from './StudentForm';
import LoadingSpinner from '../common/LoadingSpinner';

const StudentList = () => {
  const { 
    students, 
    loading, 
    error,
    deleteStudent,
    fetchStudents
  } = useStudents();

  const [editingStudent, setEditingStudent] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleFormClose = (success) => {
    if (success) {
      fetchStudents(); // Refresh list only if student was added/updated
    }
    setEditingStudent(null);
    setIsAdding(false);
  };

  const filteredStudents = students.filter(student =>
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Student Management</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => {
            setEditingStudent(null);
            setIsAdding(true);
          }}
        >
          Add Student
        </Button>
      </Box>

      <TextField
        label="Search Students"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />

      {(isAdding || editingStudent) && (
        <StudentForm 
          student={editingStudent} 
          onSubmit={handleFormClose}
        />
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Link 
                    to={`/students/${student.id}`} 
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {student.firstName} {student.lastName}
                  </Link>
                </TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.department}</TableCell>
                <TableCell>
                  <IconButton 
                    onClick={() => {
                      setEditingStudent(student);
                      setIsAdding(false);
                    }}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton 
                    onClick={() => deleteStudent(student.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentList;

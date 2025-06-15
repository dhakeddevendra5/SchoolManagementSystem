import { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { 
  getAllStudents, 
  createStudent, 
  updateStudent, 
  deleteStudent as apiDeleteStudent 
} from '../services/StudentService';

const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  // Memoize fetchStudents to prevent re-creation on each render
  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllStudents();
      setStudents(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch students');
      enqueueSnackbar('Failed to fetch students', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar]);

  // Fetch students once on mount
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const addStudent = async (studentData) => {
    try {
      const response = await createStudent(studentData);
      setStudents(prev => [...prev, response.data]);
      enqueueSnackbar('Student added successfully', { variant: 'success' });
      return true;
    } catch (err) {
      enqueueSnackbar('Failed to add student', { variant: 'error' });
      return false;
    }
  };

  const updateStudentRecord = async (id, studentData) => {
    try {
      const response = await updateStudent(id, studentData);
      setStudents(prev => 
        prev.map(student => student.id === id ? response.data : student)
      );
      enqueueSnackbar('Student updated successfully', { variant: 'success' });
      return true;
    } catch (err) {
      enqueueSnackbar('Failed to update student', { variant: 'error' });
      return false;
    }
  };

  const deleteStudent = async (id) => {
    try {
      await apiDeleteStudent(id);
      setStudents(prev => prev.filter(student => student.id !== id));
      enqueueSnackbar('Student deleted successfully', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar('Failed to delete student', { variant: 'error' });
    }
  };

  return {
    students,
    loading,
    error,
    fetchStudents,
    addStudent,
    updateStudent: updateStudentRecord,
    deleteStudent
  };
};

export default useStudents;

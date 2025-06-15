import axios from 'axios';
import { handleApiError } from '../utils/helpers';
import api from './authService';

//const API_URL = 'http://localhost:8080/api/students'; // Full backend URL

const getAllStudents = () => api.get('/api/students');
const getStudentById = (id) => api.get(`/api/students/${id}`);
const createStudent = (student) => api.post('/api/students', student);
const updateStudent = (id, student) => api.put(`/api/students/${id}`, student);
const deleteStudent = (id) => api.delete(`/api/students/${id}`);


export {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent
};

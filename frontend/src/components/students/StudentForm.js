import React, { useState, useEffect } from 'react';
import { 
    TextField, Button, Box, Typography, 
    Grid, Paper 
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createStudent, updateStudent } from '../../services/StudentService';

const StudentForm = ({ student, onSubmit }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        dateOfBirth: null,
        phoneNumber: '',
        address: ''
    });

    useEffect(() => {
        if (student) {
            setFormData({
                firstName: student.firstName || '',
                lastName: student.lastName || '',
                email: student.email || '',
                department: student.department || '',
                dateOfBirth: student.dateOfBirth ? new Date(student.dateOfBirth) : null,
                phoneNumber: student.phoneNumber || '',
                address: student.address || ''
            });
        } else {
            // reset when no student (adding new)
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                department: '',
                dateOfBirth: null,
                phoneNumber: '',
                address: ''
            });
        }
    }, [student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            dateOfBirth: date
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const studentData = {
                ...formData,
                dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth.toISOString().split('T')[0] : null
            };

            if (student && student.id) {
                await updateStudent(student.id, studentData);
            } else {
                await createStudent(studentData);
            }

            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                department: '',
                dateOfBirth: null,
                phoneNumber: '',
                address: ''
            });

            if (onSubmit) onSubmit(true);  // signal successful submit & refresh list
        } catch (error) {
            console.error('Error saving student:', error);
        }
    };

    const handleCancel = () => {
        if (onSubmit) onSubmit(false); // signal cancel without refresh
    };

    return (
        <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
            <Typography variant="h6" gutterBottom>
                {student ? 'Edit Student' : 'Add New Student'}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date of Birth"
                                value={formData.dateOfBirth}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            multiline
                            rows={3}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end" gap={2}>
                            <Button 
                                variant="outlined" 
                                color="secondary"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary"
                            >
                                {student ? 'Update' : 'Save'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default StudentForm;

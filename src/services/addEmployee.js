
import api from '../api';

const addEmployee = async (formData, token) => {
  try {
    const response = await api.post('employees', formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Employee added successfully:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Error adding employee:', error.response?.data || error.message);
    throw error; 
  }
};

export default addEmployee;

import api from '../api';

const EmpService = {
  // Register new user
  getAllEmployee: (token, page=0, size=20) => api.get(`employees?page=${page}&size=${size}`, {headers: {
            Authorization: `Bearer ${token}`,
          },} ),

  getEmployeeInfo: (token, url) => 
    api.get(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

};

export default EmpService
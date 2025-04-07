import api from '../api';

const EmpLeave = {
  // Register new user
  getAllLeave: (token, page=0, size=20) => api.get(`leaveRequests?page=${page}&size=${size}`, {headers: {
            Authorization: `Bearer ${token}`,
          },} ),


}

export default EmpLeave
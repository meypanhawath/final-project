import api from "../api";

const adminAttendance = {
  // Register new user
  getAllAttendances: (token, page = 0, size = 20) =>
    api.get(`attendances?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  // Get attendance by employee ID
  getEmployeeAttendance: (token, url) => 
    api.get(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
};

export default adminAttendance;

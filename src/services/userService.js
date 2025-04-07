import api from '../api';

const UserService = {
  // Register new user
  register: (userData) => api.post('/users/register', userData),

  // Login user
  login: (credentials) => api.post('api/v1/auth/login', credentials),

  // Get current user profile
//   getProfile: (token) =>
//     api.get('/users/me', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }),

//   // Update user profile
//   updateProfile: (userData, token) =>
//     api.put('/users/me', userData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }),

//   // Get all users (admin feature for example)
//   getAllUsers: (token) =>
//     api.get('/users', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }),
};

export default UserService;
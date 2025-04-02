// api.js
import axios from 'axios';

const API_BASE = 'https://users-production-d7c9.up.railway.app';

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE}/app/users/login/1`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

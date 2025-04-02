// api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export const getAllProducts = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.get(
      'https://esb-service-production-132b.up.railway.app/api/v1/esb/product/get',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
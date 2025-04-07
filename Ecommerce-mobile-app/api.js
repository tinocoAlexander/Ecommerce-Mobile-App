// api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ESB_BASE = 'https://esb-service-production-132b.up.railway.app/api/v1/esb';

/**
 * LOGIN USER via ESB
 */
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${ESB_BASE}/user/login`, {
      username,
      password,
    });

    if (response.data?.data) {
      await AsyncStorage.setItem('userToken', response.data.data);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

/**
 * OBTENER LISTA DE PRODUCTOS (ejemplo, con token)
 */
export const getAllProducts = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    const response = await axios.get(`${ESB_BASE}/product/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

/**
 * CREAR UNA ORDEN (con token)
 */
export const createOrder = async (clientId, products, total) => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    // Petición POST al ESB
    const response = await axios.post(
      `${ESB_BASE}/order`,
      {
        clientId,
        products,
        total,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al crear la orden' };
  }
};

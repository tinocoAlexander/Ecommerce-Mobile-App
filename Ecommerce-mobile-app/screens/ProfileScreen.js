import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as atob } from 'base-64';

export default function ProfileScreen({ setIsLoggedIn }) {
  const [userData, setUserData] = useState({
    username: '',
    phone: '',
  });

  useEffect(() => {
    const fetchUserFromToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserData({
          username: payload.username,
          phone: payload.phone,
        });
      }
    };

    fetchUserFromToken();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    Alert.alert('Session closed', 'You have been logged out.');
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      {/* Foto simulada */}
      <Image
        source={require('../assets/Logo.png')} // 💡 asegúrate de tener esta imagen
        style={styles.avatar}
      />

      <Text style={styles.title}>Perfil de Usuario</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Usuario:</Text>
        <Text style={styles.value}>{userData.username}</Text>
      </View>

      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 30,
    width: '100%',
    paddingHorizontal: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  value: {
    fontSize: 18,
    marginBottom: 15,
    color: '#000',
  },
});

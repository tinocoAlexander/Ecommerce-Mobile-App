import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import axios from 'axios';

const USER_ENDPOINT = 'https://esb-service-production-132b.up.railway.app/api/v1/esb/user';
const LOGIN_ENDPOINT = 'https://esb-service-production-132b.up.railway.app/api/v1/esb/user/login';
const CLIENT_ENDPOINT = 'https://esb-service-production-132b.up.railway.app/api/v1/esb/client';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [direction, setDirection] = useState('');

  const handleRegister = async () => {
    if (!username || !password || !phone || !name || !lastName || !birthDate || !direction) {
      Alert.alert('Campos requeridos', 'Completa todos los campos');
      return;
    }

    try {
      // Paso 1: Crear el usuario con roleId: 4 (cliente)
      await axios.post(USER_ENDPOINT, {
        username,
        password,
        phone,
        roleId: 2,
      });

      // Paso 2: Login para obtener el token
      const loginRes = await axios.post(LOGIN_ENDPOINT, { username, password });
      const token = loginRes.data.token;

      // Paso 3: Crear el cliente usando el token
      await axios.post(CLIENT_ENDPOINT,
        {
          name,
          lastName,
          birthDate,
          direction,
          mail: username,
          phone,
        },
        {
          headers: {
          },
        }
      );

      Alert.alert('Registro exitoso', 'Ya puedes iniciar sesión');
      navigation.replace('Login');
    } catch (error) {
      console.error('Register error:', error.response?.data || error.message);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'No se pudo registrar'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Crear cuenta</Text>

      <TextInput placeholder="Nombre" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Apellido" value={lastName} onChangeText={setLastName} style={styles.input} />
      <TextInput placeholder="Fecha de nacimiento (YYYY-MM-DD)" value={birthDate} onChangeText={setBirthDate} style={styles.input} />
      <TextInput placeholder="Dirección" value={direction} onChangeText={setDirection} style={styles.input} />
      <TextInput placeholder="Correo electrónico" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <TextInput placeholder="Teléfono" value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.loginLink}>
        <Text style={styles.loginText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos (igual que antes)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 30,
    color: '#000',
  },
  input: {
    width: '100%',
    padding: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 12,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  loginLink: {
    marginTop: 25,
  },
  loginText: {
    color: '#007bff',
    fontSize: 14,
  },
});

// screens/ProfileScreen.js
import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation, route }) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    Alert.alert('Session closed', 'You have been logged out.');
    // Regresa al login
    route.params.setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
});

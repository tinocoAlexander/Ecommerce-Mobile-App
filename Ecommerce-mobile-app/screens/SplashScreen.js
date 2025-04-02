// screens/SplashScreen.js
import React from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Logo.png')} style={styles.logo} resizeMode="contain" />
      <ActivityIndicator size="large" color="#000" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  loader: {
    marginTop: 30,
  },
});

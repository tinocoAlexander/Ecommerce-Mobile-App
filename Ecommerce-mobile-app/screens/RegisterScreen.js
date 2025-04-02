// screens/RegisterScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function RegisterScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Register Screen</Text>
      <Button title="Register" onPress={() => navigation.replace('MainApp')} />
      <Button title="Back to Login" onPress={() => navigation.goBack()} />
    </View>
  );
}

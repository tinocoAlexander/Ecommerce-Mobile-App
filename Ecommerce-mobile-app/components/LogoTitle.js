// components/LogoTitle.js
import React from 'react';
import { Image } from 'react-native';

export default function LogoTitle() {
  return (
    <Image
      source={require('../assets/Logo.png')}
      style={{ width: 400, height: 100, resizeMode: 'contain' }}
    />
  );
}

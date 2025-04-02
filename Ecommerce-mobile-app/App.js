// App.js
import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { CartProvider } from './contexts/CartContext';

export default function App() {
  return (
    <CartProvider>
      <AppNavigator />
    </CartProvider>
  );
}
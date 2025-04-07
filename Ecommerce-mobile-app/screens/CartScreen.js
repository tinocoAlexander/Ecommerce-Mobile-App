import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as atob } from 'base-64';

// Context para el carrito
import { useCart } from '../contexts/CartContext';

// Función para crear la orden
import { createOrder } from '../api';

export default function CartScreen() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [clientId, setClientId] = useState(null);

  useEffect(() => {
    const getClientIdFromToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setClientId(payload.id); // Ajusta la propiedad si tu payload usa otra key
      }
    };
    getClientIdFromToken();
  }, []);

  const getTotal = () => {
    return cart
      .reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = async () => {
    if (!clientId) {
      Alert.alert('Error', 'No se encontró el ID del usuario');
      return;
    }

    const productsFormatted = cart.map((item) => ({
      productId: item.id,       // Asegúrate de usar 'productId'
      quantity: item.quantity,  // y 'quantity'
    }));

    try {
      await createOrder(clientId, productsFormatted, parseFloat(getTotal()));

      Alert.alert('✅ Orden completada', 'Tu pedido ha sido registrado correctamente.');
      clearCart();
    } catch (error) {
      console.error('Error al registrar orden:', error);
      Alert.alert('Error', error.message || 'No se pudo registrar la orden.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${Number(item.price).toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Cantidad:</Text>
          <TextInput
            style={styles.quantityInput}
            value={String(item.quantity)}
            keyboardType="numeric"
            onChangeText={(text) =>
              updateQuantity(item.id, Math.max(1, parseInt(text) || 1))
            }
          />
        </View>
        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
          <Text style={styles.remove}>Quitar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Tu carrito</Text>

      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          <View style={styles.footer}>
            <Text style={styles.total}>Total: ${getTotal()}</Text>
            <TouchableOpacity style={styles.payButton} onPress={handleCheckout}>
              <Text style={styles.payText}>Pagar</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.empty}>Tu carrito está vacío.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
  details: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    color: '#555',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityLabel: {
    marginRight: 8,
    fontSize: 14,
  },
  quantityInput: {
    width: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    textAlign: 'center',
    borderRadius: 6,
  },
  remove: {
    color: '#ff4444',
    marginTop: 10,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    marginTop: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  payButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  payText: {
    color: '#fff',
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 16,
    color: '#777',
  },
});

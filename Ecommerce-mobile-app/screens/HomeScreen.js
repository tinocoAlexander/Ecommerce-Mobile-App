import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllProducts } from '../api';
import { decode as atob } from 'base-64';
import { useCart } from '../contexts/CartContext'; // al inicio


const BRANDS = [
  { name: 'Xbox', image: require('../assets/brands/Xbox.png') },
  { name: 'Playstation', image: require('../assets/brands/Playstation.png') },
  { name: 'Logitech', image: require('../assets/brands/Logitech.png') },
  { name: 'Amd', image: require('../assets/brands/Amd.png') },
  { name: 'Nvidia', image: require('../assets/brands/Nvidia.png') },
  { name: 'Alienware', image: require('../assets/brands/Alienware.png') },
];

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [products, setProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [selectedProduct, setSelectedProduct] = useState(null); // producto activo
  const [modalVisible, setModalVisible] = useState(false); // visibilidad del modal

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUsername(payload.username || '');
      }
    };

    const fetchProducts = async () => {
      const all = await getAllProducts();
      setProducts(all);
    };

    fetchUser();
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setModalVisible(false);
  };

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(selectedProduct);
    closeProductModal();
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openProductModal(item)}>
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      <Text style={styles.productBrand}>{item.category}</Text>
      <Text style={styles.productTitle}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  const renderBrand = ({ item }) => (
    <View style={styles.brandCard}>
      <Image source={item.image} style={styles.brandImage} resizeMode="contain" />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Welcome, {username} 👋</Text>

      <View style={styles.banner}>
        <Text style={styles.bannerText}>🕐 20% OFF ends in {formatTime(timeLeft)}</Text>
      </View>

      <Text style={styles.sectionTitle}>For You</Text>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Text style={styles.sectionTitle}>Brands</Text>
      <FlatList
        data={BRANDS}
        renderItem={renderBrand}
        keyExtractor={(item) => item.name}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      />

      {/* Modal de producto */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedProduct && (
              <>
                <Image source={{ uri: selectedProduct.imageUrl }} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                <Text style={styles.modalDesc}>{selectedProduct.description}</Text>
                <Text style={styles.modalPrice}>${selectedProduct.price}</Text>
                <View style={styles.modalButtons}>
                  <Button title="Close" color="#666" onPress={closeProductModal} />
                  <Button title="Add to Cart" onPress={handleAddToCart} />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
  },
  banner: {
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  bannerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    width: '48%',
    marginBottom: 20,
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  productBrand: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
  },
  productPrice: {
    fontSize: 14,
    color: '#000',
    marginTop: 4,
  },
  brandCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    padding: 10,
  },
  brandImage: {
    width: 70,
    height: 70,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '85%',
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalDesc: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#444',
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 15,
  },
});

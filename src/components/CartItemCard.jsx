import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeCartItem } from '../features/cart/cartSlice';

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(removeCartItem({ id: item.id, selectedSize: item.selectedSize }));
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.images[0] }} style={styles.image} />
      </View>
      <View style={styles.info}>
        <Text style={styles.itemName}>{item.name.toUpperCase()}</Text>
        <Text style={styles.itemPrice}>${item.price} ARS</Text>
        <Text style={styles.itemExtra}>{item.quantity} | {item.selectedSize}</Text>
      </View>
      <TouchableOpacity onPress={handleRemoveItem}>
        <Text style={{fontSize: 20, margin: 5}}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    height: 200,
    justifyContent: "space-between"
  },
  imageContainer: {
    width: "30%",
    height: 200
  },
  image: {
    height: 200,
    width: "100%"
  },
  info: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "flex-end",
    width: "50%"
  },
  itemName: {
    fontSize: 12,
    fontWeight: 300,
  },
  itemPrice: {
    fontSize: 12,
    fontWeight: 300,
  },
  itemExtra: {
    fontSize: 12,
    fontWeight: 300,
    marginTop: 10,
    color: "gray"
  }
});

export default CartItemCard;

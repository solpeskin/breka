import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import CartItemCard from '../components/CartItemCard'; 
import { useSelector } from "react-redux"

const Cart = () => {
  const {items: cartItems, total} = useSelector(state => state.cart.value)
  console.log(total)

  const renderItem = ({ item }) => <CartItemCard item={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CART</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id + item.selectedSize}
        contentContainerStyle={styles.list}
      />
      <Text>TOTAL: ${total} ARS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 300,
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
    height: "100%"
  },
});

export default Cart;

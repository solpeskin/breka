import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import CartItemCard from '../components/CartItemCard'; 
import { useSelector } from "react-redux"

const Cart = () => {
  const {items: cartItems, total} = useSelector(state => state.cart.value)
  const renderItem = ({ item }) => <CartItemCard item={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CART</Text>
      {
        cartItems.length == 0
        ? ( <View style={{alignItems:"center", height: "100%", justifyContent: "center"}}><Text>START ADDING PRODUCTS</Text></View>)
        : (
          <>
            <FlatList
              data={cartItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id + item.selectedSize}
              contentContainerStyle={styles.list}
            />
            <Text>TOTAL: ${total} ARS</Text>
          </>
        )
      }
      
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
    paddingTop: 30,
    fontSize: 24,
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
    height: "100%"
  },
});

export default Cart;

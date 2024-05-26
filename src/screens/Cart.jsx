import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
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
          <View style={styles.listContainer}>
            <FlatList
              data={cartItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id + item.selectedSize}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
            />
            <View style={styles.buttonBox}>
              <Text>TOTAL: ${total} ARS</Text>
              <TouchableOpacity style={styles.button}>
                <Text>BUY</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    fontWeight: "300",
    paddingTop: 30,
    fontSize: 30,
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  listContainer:{
    paddingBottom: 130,
  },
  button: {
    height: 30,
    width: 60,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBox:{
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%", 
    marginTop: 10
  }
});

export default Cart;

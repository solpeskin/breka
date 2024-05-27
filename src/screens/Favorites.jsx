import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import CartItemCard from '../components/CartItemCard'; 
import { useSelector } from "react-redux";

const Favorites = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SAVED</Text>
      {}
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
});

export default Favorites;

import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setItemIdSelected } from '../features/shop/shopSlice';

const ProductCard = ({ product, navigation }) => {
  const { name, price, images, id } = product;
  
  const dispatch = useDispatch()
  const handleNavigate = () => {
    dispatch(setItemIdSelected(id))
    navigation.navigate('ProductDetail')
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handleNavigate}>
        <Image source={{ uri: images[0] }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{name.toUpperCase()}</Text>
          <Text style={styles.price}>${price} ARS</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRightWidth: 0.7,
    borderBottomWidth: 0.7,
    borderColor: "black",
    width: `${100 / 2}%`
  },
  info: {
    paddingLeft: 5,
    borderTopWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
  },
  image: {
    width: '100%',
    height: 213,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 10,
    marginTop: 8,
    fontWeight: "300",
  },
  price: {
    fontSize: 10,
    marginBottom: 8,
    fontWeight: "300",
  },
});

export default ProductCard;

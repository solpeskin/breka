import {StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useGetCategoriesQuery } from '../services/shopService';
import { setCategorySelected } from '../features/shop/shopSlice';
import { useDispatch } from 'react-redux';
import Loading from '../components/Loading';

const Categories = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data: categories, error, isLoading } = useGetCategoriesQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error al cargar las categorías.</Text>
      </View>
    );
  }

  const handleNavigate = (category) => {
    dispatch(setCategorySelected(category));
    navigation.navigate('ItemListContainer', { category });
  };

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          onPress={() => handleNavigate(category)}
        >
          <Text style={styles.text}>{category.toUpperCase()}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginVertical: 2,
    fontSize: 16,
    color: '#000',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: 'black',
  },
});

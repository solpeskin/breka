import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ProductCard from '../components/ProductCard';
import { useGetProductsQuery, useGetSavedProductsQuery } from '../services/shopService';
import Loading from '../components/Loading';
import { setSavedProducts } from '../features/shop/shopSlice';

const Favorites = ({ navigation }) => {
  const { localId } = useSelector(state => state.auth.value);
  const savedProductIds = useSelector((state) => state.shop.value.savedProducts);
  const { data: products, isLoading, error } = useGetProductsQuery();
  const { data: savedProductsFirebase, isSuccess } = useGetSavedProductsQuery(localId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && savedProductsFirebase) {
      dispatch(setSavedProducts(savedProductsFirebase.savedProducts));
    }
  }, [isSuccess, savedProductsFirebase, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  let savedProductsList = [];
  if (products) {
    savedProductsList = products.filter(product => savedProductIds.includes(product.id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SAVED</Text>
      {
        (savedProductsList.length > 0)
        ? <FlatList
            data={savedProductsList}
            key={'2'}
            numColumns={2}
            renderItem={({ item }) => (
              <ProductCard product={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
          />
        : <View style={{ alignItems: "center", height: "100%", justifyContent: "center" }}>
            <Text>START ADDING PRODUCTS</Text>
          </View>
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
    fontWeight: '300',
    paddingTop: 30,
    fontSize: 30,
    marginBottom: 16,
  },
  flatListContent: {
    paddingBottom: 16,
  },
});

export default Favorites;

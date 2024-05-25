import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemListGrid from '../components/ItemListGrid';
import SearchBar from '../components/SearchBar';
import ItemsFilter from '../components/ItemsFilter';
import { useGetProductsByCategoryQuery, useGetProductsQuery } from '../services/shopService';
import Loading from '../components/Loading';

const ItemListContainer = ({ navigation, route }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [keyWord, setKeyword] = useState("");
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  
  const { category: categorySelected } = route.params || {};
  
  const {
    data: productsData,
    error,
    isLoading,
  } = categorySelected
  ? useGetProductsByCategoryQuery(categorySelected)
  : useGetProductsQuery();

  useEffect(() => {
    // Que haga loading c/vez que renderizo
    setIsProductsLoading(true);
    resetFilters()
    setKeyword("")
  }, [categorySelected]);

  useEffect(() => {
    if (productsData) {
      setIsProductsLoading(false);
      setProducts(productsData);
    }
  }, [productsData]);

  useEffect(() => {
    if (products.length) {
      filtrarProducts();
    }
  }, [products, selectedColors, selectedSizes, selectedMaterials, keyWord]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const filterState = {
    selectedColors,
    setSelectedColors,
    selectedSizes,
    setSelectedSizes,
    selectedMaterials,
    setSelectedMaterials,
  };

  const sizeMatch = (product, selectedSizes) => {
    if (selectedSizes.length === 0) return true;
    for (let i = 0; i < product.size.length; i++) {
      const sizeObj = product.size[i];
      const size = Object.keys(sizeObj)[0];
      const quantity = sizeObj[size];
      if (selectedSizes.includes(size) && quantity > 0) {
        return true;
      }
    }
    return false;
  };

  const filtrarProducts = () => {
    const preFilteredProducts = products.filter(
      (product) =>
        (selectedColors.length === 0 || selectedColors.includes(product.color)) &&
        (selectedMaterials.length === 0 || selectedMaterials.includes(product.material)) &&
        sizeMatch(product, selectedSizes)
    );

    const productsSearched = preFilteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(keyWord.toLowerCase()) ||
        product.description.toLowerCase().includes(keyWord.toLowerCase())
    );

    setFilteredProducts(productsSearched);
  };

  const resetFilters = () => {
    setSelectedColors("")
    setSelectedSizes("")
    setSelectedMaterials("")
  }

  const numFilters = selectedColors.length + selectedSizes.length + selectedMaterials.length;

  if (isLoading || isProductsLoading) {
    return (
      <Loading/>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Error al cargar los productos.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pressableBox}>
        <SearchBar keyWord={keyWord} setKeyword={setKeyword} />
        <TouchableOpacity onPress={toggleModal} style={styles.pressable}>
          <Text style={{ fontSize: 16 }}>
            {numFilters > 0 ? `FILTERS (${numFilters})` : 'FILTERS'}
          </Text>
        </TouchableOpacity>
      </View>
      <ItemsFilter
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        filterState={filterState}
        products={products}
        resetFilters={resetFilters}
      />
      <View style={styles.gridContainer}>
        <ItemListGrid products={filteredProducts} navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default ItemListContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  pressableBox: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 1,
    width: '100%',
    paddingBottom: 40,
    paddingTop: 70,
    paddingHorizontal: 20,
    justifyContent: 'center',
    flexDirection: 'column',
    height: 150,
    borderBottomWidth: 0.5
  },
  pressable: {
    width: 90,
    height: 40,
    marginTop: 15,
    marginLeft: 5,
  },
  gridContainer: {
    flex: 1,
    width: '100%',
    paddingTop: "28%",
  },
});

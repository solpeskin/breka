import { FlatList, StyleSheet} from 'react-native';
import React from 'react';
import ProductCard from '../components/ProductCard';

const ItemListGrid = ({products, navigation}) => {
  return (
    <FlatList
      data={products}
      key={'2'}
      numColumns={2}
      renderItem={({ item }) => (
        <ProductCard product={item} navigation={navigation} />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.flatListContent}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default ItemListGrid;

const styles = StyleSheet.create({
  flatListContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',

  },
});

import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import CartItemCard from '../components/CartItemCard'; 
import { useSelector, useDispatch } from "react-redux";
import { useGetProductsCartQuery } from '../services/shopService';
import { setCartItems } from '../features/cart/cartSlice'; 
import Loading from '../components/Loading';

const Cart = () => {
  const dispatch = useDispatch();
  const { localId } = useSelector(state => state.auth.value);
  const { items, total } = useSelector(state => state.cart.value);
  const { data: firebaseCartItems, error, isLoading } = useGetProductsCartQuery(localId);

  useEffect(() => {
    if (firebaseCartItems) {
      dispatch(setCartItems(firebaseCartItems.cartList));
      console.log(setCartItems(firebaseCartItems.cartList));
    }
  }, [firebaseCartItems, dispatch]);

  const renderItem = ({ item }) => <CartItemCard item={item} />;

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error al cargar el carrito.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CART</Text>
      {
        items.length !== 0 || firebaseCartItems.length !== 0
        ? (
          <View style={{ alignItems: "center", height: "100%", justifyContent: "center" }}>
            <Text>START ADDING PRODUCTS</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              data={firebaseCartItems ? firebaseCartItems : items}
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
  listContainer: {
    paddingBottom: 130,
  },
  button: {
    height: 30,
    width: 60,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBox: {
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%", 
    marginTop: 10
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

export default Cart;

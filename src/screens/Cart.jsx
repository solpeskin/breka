import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import CartItemCard from '../components/CartItemCard'; 
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsCartQuery, usePostProductsCartMutation } from '../services/shopService';
import { resetCartItems, setCartItems } from '../features/cart/cartSlice';
import Loading from '../components/Loading';

const Cart = () => {
  const { localId } = useSelector(state => state.auth.value);
  const { items, total } = useSelector(state => state.cart.value);
  const { data: firebaseCartItems, isSuccess, isLoading } = useGetProductsCartQuery(localId);
  const [isInitialLoad, setInitianLoad] = useState(true)

  const dispatch = useDispatch();
  const [triggerPostProductCart] = usePostProductsCartMutation();

  useEffect(() => {
    if (isSuccess && firebaseCartItems && firebaseCartItems.cartList) {
      dispatch(setCartItems(firebaseCartItems.cartList));
    }
    setInitianLoad(false)
  }, [isSuccess, firebaseCartItems]);

  useEffect(() => {
    if (!isInitialLoad) {
      triggerPostProductCart({ cartList: items, localId });
    }
  }, [isInitialLoad]);

  const handleBuy = () => {
    dispatch(resetCartItems())
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CART ({items.length})</Text>
      {
        items.length == 0 
        ? (
          <View style={{ alignItems: "center", height: "100%", justifyContent: "center" }}>
            <Text>START ADDING PRODUCTS</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              data={items}
              renderItem={({ item }) => <CartItemCard item={item} />}
              keyExtractor={(item) => item.id + item.selectedSize}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
            />
            <View style={styles.buttonBox}>
              <Text>TOTAL: ${total} ARS</Text>
              <TouchableOpacity style={styles.button} onPress={handleBuy}>
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
    paddingBottom: 110,
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

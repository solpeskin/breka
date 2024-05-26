import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { getSession } from '../presistence';
import { setUser } from '../features/user/userSlice';
import { useGetProductsCartQuery, usePostProductsCartMutation } from '../services/shopService';
import { setCartItems } from '../features/cart/cartSlice';

const Navigator = () => {
  const { user, localId } = useSelector(state => state.auth.value);
  const { data: firebaseCartItems, isSuccess } = useGetProductsCartQuery(localId);
  const { items } = useSelector(state => state.cart.value);

  const dispatch = useDispatch();
  const [triggerPostProductCart] = usePostProductsCartMutation();

  useEffect(() => {
    (async () => {
      const response = await getSession();
      if (response.rows._array.length) {
        const user = response.rows._array[0];
        dispatch(setUser({
          email: user.email,
          localId: user.localId,
          idToken: user.token,
        }));
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && firebaseCartItems && firebaseCartItems.cartList) {
      dispatch(setCartItems(firebaseCartItems.cartList));
    }
  }, [isSuccess, firebaseCartItems, dispatch]);

  useEffect(() => {
    if (items.length > 0) {
      triggerPostProductCart({ cartList: items, localId });
    }
  }, [items, triggerPostProductCart, localId]);

  return (
    <NavigationContainer>
      {user ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;

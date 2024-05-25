import React from 'react'
import Cart from '../screens/Cart'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const CartStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Cart'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Cart"
        component={Cart}
      />
    </Stack.Navigator>
  )
}


export default CartStackNavigator


import React from 'react'
import Home from '../screens/Home'
import ItemListContainer from '../screens/ItemListContainer'
import ProductDetail from '../screens/ProductDetail'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="ItemListContainer"
        component={ItemListContainer}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
      />
    </Stack.Navigator>
  )
}

export default HomeStackNavigator

import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../screens/Profile'
import ImageSelector from '../screens/ImageSelector'

const Stack = createNativeStackNavigator()

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Profile'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        name="ImageSelector"
        component={ImageSelector}
      />
    </Stack.Navigator>
  )
}

export default AuthStackNavigator

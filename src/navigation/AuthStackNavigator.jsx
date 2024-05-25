import React from 'react'
import LogIn from '../screens/LogIn'
import SignUp from '../screens/SignUp'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='LogIn'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="LogIn"
        component={LogIn}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
      />
    </Stack.Navigator>
  )
}

export default AuthStackNavigator

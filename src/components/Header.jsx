import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
  return (
    <View style={styles.header}>
      <Ionicons name="menu-outline" size={30} color="black" />
      <View style={{flexDirection:"row"}}>
        <Ionicons name="search-outline" size={30} color="black" style={{marginRight: 10}}/>
        <Ionicons name="bag-outline" size={30} color="black" />
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    flex: 1,
    height: 50,
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10
  }

})
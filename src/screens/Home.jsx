import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Home = ({navigation}) => {

  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image 
            resizeMode='cover'
            style = {styles.image}
            source={require('../../assets/img/new-collection.jpeg')}
            />
            <View style={styles.textContainer}>
                <Text style={[styles.text, {fontSize: 60}]}>B R E K A</Text>
                <Pressable onPress={()=>navigation.navigate("ItemListContainer")}>
                    <Text style={[styles.text, {fontSize: 20}]}>SHOP NOW</Text>
                </Pressable>
            </View>
        </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
    },
    headline: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        height: 70,
        justifyContent: "center"
    },
    imageContainer: {
        flex: 1,
        width: "100%",
        overflow: "hidden"
    },
    image: {
        flex: 1,
        width: "100%",
    },
    textContainer: {
        position: 'absolute',
        top: "50%",
        left: 0,
        right: 0,
        height: 70,
        justifyContent: "center"
    },
    text: {
        color: "white",
        textAlign: "center"
    }
})

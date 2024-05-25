import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useGetProfileImageQuery } from '../services/shopService';

const Profile = ({navigation}) => {
  const {user} = useSelector(state => state.auth.value)
  const {imageCamera, localId} = useSelector(state => state.auth.value)
  const {data: imageFromBase} = useGetProfileImageQuery(localId)

  //console.log(imageFromBase)

  const launchCamera = async () => {
    navigation.navigate('ImageSelector')
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        {imageCamera || imageFromBase
          ?
            <Image 
              resizeMode='cover'
              style={styles.image}
              source={{uri: imageFromBase?.image || imageCamera}}
            />
          : 
            <Image 
              resizeMode='cover'
              style={styles.image}
              source={require('../../assets/img/myProfileDefault.jpg')}
            />
        }
        
      </View>
      <TouchableOpacity style={styles.button} onPress={launchCamera}>
        <Text style={{color: "white"}}>CHANGE PROFILE PICTURE</Text>
      </TouchableOpacity>
      <View>
        <Text style={{marginTop: 100}}>E-MAIL: {user}</Text>
      </View>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    //justifyContent: 'center', 
    alignItems: 'center',      
  },
  imgContainer: {
    marginTop: 100,
    height: 250,   
    width: 250,    
    borderRadius: 250,
    overflow: 'hidden'  
  },
  image: {
    height: '100%',
    width: '100%',
  },
  button: {
    width: 220,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    marginTop: 30
  }
});

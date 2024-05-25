import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProfileImageQuery } from '../services/shopService';
import { clearUser } from '../features/user/userSlice';
import { truncateSessionsTable } from '../presistence';

const Profile = ({navigation}) => {
  const {user} = useSelector(state => state.auth.value)
  const {imageCamera, localId} = useSelector(state => state.auth.value)
  const {data: imageFromBase} = useGetProfileImageQuery(localId)
  const dispatch = useDispatch()

  const launchCamera = async () => {
    navigation.navigate('ImageSelector')
  };

  const signOut = async () => {
    try {
      console.log("try")
      const response = await truncateSessionsTable()
      console.log(response);
      dispatch(clearUser())
    } catch (error) {
      console.log({errorSignOutDB: error});
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>{user}</Text>
      </View>
      <View style={{alignItems: "center"}}>
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
      </View>
      <TouchableOpacity style={styles.signOut} onPress={signOut}>
        <Text>SIGN OUT</Text>
      </TouchableOpacity>
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
    justifyContent: "space-around"  
  },
  imgContainer: {
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
  },
  signOut: {
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginTop: 30
  }
});

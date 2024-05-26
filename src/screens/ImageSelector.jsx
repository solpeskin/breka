import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from 'react-redux';
import { setCameraImage } from '../features/user/userSlice';
import { usePostProfileImageMutation } from '../services/shopService';
import ButtonBlack from '../components/ButtonBlack';

const ImageSelector = ({navigation}) => {
  const [image, setImage] = useState(null)
  const {localId} = useSelector(state => state.auth.value)
  const dispatch = useDispatch()
  const [triggerPostImage, result] = usePostProfileImageMutation() // el trigger es pars "postear"

  const verifyCameraPermissions = async () => {
    const {granted} = await ImagePicker.requestCameraPermissionsAsync()
    return granted
  }

  const pickImage = async () => {
    const permissionCamera = await verifyCameraPermissions()
      
    if (permissionCamera) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 0.2    
      })
      if (!result.canceled){
        const imageURL = `data:image/jpeg;base64,${result.assets[0].base64}`
        setImage(imageURL)
      }
    }
  }

  const saveImage = () => {
    dispatch(setCameraImage(image))
    triggerPostImage({image, localId})
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      {image 
        ? (
          <View style={{alignItems: "center"}}>
            <Image source={{ uri: image }} style={styles.image} />
            <ButtonBlack style={styles.button} onPress={pickImage} title={"TAKE ANOTHER PHOTO"}/>
            <ButtonBlack style={styles.button} onPress={saveImage} title={"SAVE"}/>
          </View>) 
          
        : (
          <View style={{alignItems: "center"}}>
            <View style={styles.noPhoto}>
              <Text>NO PHOTO TAKEN</Text>
            </View>
            <ButtonBlack style={styles.button} onPress={pickImage} title={"TAKE A PHOTO"}/>
          </View>
        )
      }
    </View>
  )
}

export default ImageSelector

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  image: {
    height: 250,   
    width: 250,
    alignItems: "center",
    justifyContent: "center",    
    borderRadius: 250,
    borderWidth: 1,
    overflow: 'hidden'
  },
  button: {
    width: 220,
    height: 40,
    marginTop: 30
  }
})
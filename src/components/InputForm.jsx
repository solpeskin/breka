import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const InputForm = ({label, onChange, error = "", isSecure = false}) => {
  const [input, setInput] = useState("");
  
  const onChangeText = (text) => {
    setInput(text)
    onChange(text)
  }
  
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style ={[styles.input, error && {borderColor: "red", color: "red"}]}
        value={input}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
        placeholder={label}
      />
      {error ? 
        <Text style = {styles.error}>
            {error}
        </Text>
        :
        null
    }
    </View>
  )
}

export default InputForm

const styles = StyleSheet.create({
  input: {
    height: 30,
    width: '80%',
    borderWidth: 0,
    borderBottomWidth: 1.5,
    marginBottom: 10,
    fontSize: 11,
    fontWeight: '300',
    paddingHorizontal: 5,
    borderColor: 'black', 
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
  },
  error: {
    paddintTop: 2,
    fontSize: 10,
    color: 'red',
  }
})
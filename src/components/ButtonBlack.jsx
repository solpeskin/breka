import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";

const ButtonBlack = ({ title, onPress, width}) => {
  return (
    <Pressable style={[styles.button, {width: width}]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

export default ButtonBlack;

const styles = StyleSheet.create({
  button: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'black',
    paddingVertical: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 11,
  },
});
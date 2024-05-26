import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";

const ButtonBlack = (props) => {
  const {style, ...rest} = props;

  return (
    <Pressable style={[styles.button, style]} {...rest}>
      <Text style={styles.buttonText}>{props.title}</Text>
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
    fontSize: 13,
  },
});
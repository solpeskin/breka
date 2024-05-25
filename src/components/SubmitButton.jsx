import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";

const SubmitButton = ({ title }) => {
    return (
        <Pressable style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    );
};

export default SubmitButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'black',
        width: "80%",
        paddingVertical: 5,
        marginTop: 50,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 11,
    },
});
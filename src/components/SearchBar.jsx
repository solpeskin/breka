import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const SearchBar = ({keyWord, setKeyword}) => {
    return (
        <View style={[styles.container]}>
            <TextInput
                style={styles.input}
                placeholder="SEARCH..."
                value={keyWord}
                onChangeText={setKeyword}
                placeholderTextColor="black"
                onSearch={setKeyword}
            />
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        width: "85%",
        height: 50,
        borderWidth: 1,
        justifyContent: 'center',
        paddingLeft: 20,
    },
    input: {
        height: 50,
        fontSize: 16,
        color: 'black'
    },
});

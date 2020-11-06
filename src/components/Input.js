import React from "react";
import {StyleSheet,TextInput} from "react-native";

const styles = StyleSheet.create({
    input: {
        marginTop: 35,
        padding: 8,
        height: 35,
        backgroundColor: "#eee",
        alignSelf: "stretch",
        borderColor: "#bbb",
        borderWidth: 1,
    },
});

const Input = ({onChange, onSubmit, value, ...rest}) => {
    return (
        <TextInput
            style={styles.input}
            value={value} 
            onChangeText={onChange} 
            onSubmitEditing={onSubmit}
            {...rest}
        />
    );
}

export default Input;
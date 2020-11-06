import React from "react";
import {StyleSheet,TouchableOpacity, Text, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    todo: {
        flex: 6,
        paddingHorizontal: 15,
        height: 60,
        justifyContent: "center",
        backgroundColor: "#e6e6e6",
    },
    edit: {
        flex: 1,
        paddingHorizontal: 15,
        height: 60,
        justifyContent: "center",
        backgroundColor: "orange",
        alignItems: "center",
    },
    delete: {
        flex: 1,
        paddingHorizontal: 15,
        height: 60,
        justifyContent: "center",
        backgroundColor: "red",
        alignItems: "center",
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
    },
    strike: {
        textDecorationLine: "line-through",
        textDecorationStyle: "solid",
    },
    panel: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        alignSelf: "stretch",
      },

})

export default ({completed, desc, onPress, onEdit, onDelete}) => {
    return (
        <View style={styles.panel}>
            <TouchableOpacity style={styles.todo} onPress={onPress}>
                { completed 
                ? <Text style={[styles.text, styles.strike]}> {desc} </Text> 
                : <Text style={styles.text}> {desc} </Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.edit} onPress={onEdit}>
                <Icon
                    name="edit"
                    size={35}
                    color="white"
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.delete} onPress={onDelete}>
                <Icon
                    name="trash"
                    size={35}
                    color="white"
                />
            </TouchableOpacity>
        </View>
        
    );
}
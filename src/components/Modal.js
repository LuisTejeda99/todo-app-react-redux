import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View, 
  Dimensions,
  Button
} from "react-native";
import Input from "./Input";

const Mod = ({visibility, children}) => {
  return (
      <Modal animationType="slide" transparent={false} visible={visibility}>
          <View style={styles.center}>
              <View style={styles.modal}>{children}</View>
          </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.3)",
    },
    modal: {
        backgroundColor: "#fff",
        maxWidth: Dimensions.get("window").width - 50,
        width: Dimensions.get("window").width - 50,
        borderRadius: 4,
        backgroundColor: "#eee",
      },
    text:{
      fontSize: 18,
      fontStyle:"italic",
      fontWeight: "bold",
    },
});

export default Mod;
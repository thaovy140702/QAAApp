import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const IconItem = (props) => {
  return (
    <View style={styles.iconItemStyle}>
      <Text style={styles.text}>{props.label}</Text>
      <View style={{ marginLeft: 8}}>
        <AntDesign name={props.iconName} size={20} color={props.color} />
      </View>
    </View>
  );
};

export default IconItem;

const styles = StyleSheet.create({
  iconItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "medium",
  },
});

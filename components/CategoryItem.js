import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../constants/colors";
import RegularText from "./text/RegularText";

const CategoryItem = (props) => {
  return (
    <View style={styles.categoryItemStyle}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  categoryItemStyle: {
    backgroundColor: colors.purple,
    marginLeft: 70,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 15,
    shadowColor: "purple",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 15,
    shadowOpacity: 1.5,
    elevation: 10,
  },
  text: {
    color: "white",
    fontFamily: 'bold',
    fontSize: 11
  }
});

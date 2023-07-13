import { Text, StyleSheet } from "react-native";

const BoldText = props => {

    return (
    <Text style={[styles.boldText, {color: props.color, fontSize: props.font, textDecorationLine: props.textDecorationLine}]}>{props.text}</Text>
    );
}

const styles = StyleSheet.create({
    boldText:{
        fontSize: 14,
        fontFamily: 'bold'
    }
});
export default BoldText;
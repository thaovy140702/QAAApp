import { Text, StyleSheet } from "react-native";

const RegularText = props => {

    return (
    <Text 
    style={[styles.regText, {color: props.color, marginStart: props.marginStart, fontSize: props.fontSize}]}>
            {props.text}
    </Text>
    );
}

const styles = StyleSheet.create({
    regText:{
        fontSize: 14,
        fontFamily: 'regular'
    }
});
export default RegularText;
import { Text, StyleSheet } from "react-native";

const LightText = props => {

    return (
    <Text 
    style={[styles.lightText, {color: props.color, marginStart: props.marginStart, fontSize: props.fontSize}]}>
            {props.text}
    </Text>
    );
}

const styles = StyleSheet.create({
    lightText:{
        fontFamily: 'light'
    }
});
export default LightText;
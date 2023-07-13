import { Text, StyleSheet } from "react-native";

const HeaderTitle = props => {
    return (
    <Text 
    style={[styles.text, {color: props.color, marginStart: props.marginStart, fontSize: props.fontSize}]}>
            {props.text}
    </Text>
    );
}

const styles = StyleSheet.create({
    text:{
        fontFamily: 'bold',
        marginTop: 20
    }
});
export default HeaderTitle;
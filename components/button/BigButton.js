import { StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../../constants/colors";
import { useNavigation } from '@react-navigation/native'

const BigButton = props => {

    const enabledBgColor = props.color || '#64A587';
    const disabledBgColor = colors.lightGrey;
    const bgColor = props.disabled ? disabledBgColor : enabledBgColor;

    const navigation = useNavigation()
    return (
        <TouchableOpacity 
        style={{
            ...styles.button,
            ...props.style,
            ...{ backgroundColor: bgColor }}}
        onPress={props.onPress}>
        <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
    },
    button: {
        alignItems: 'center',
        padding: 10,
        width: 325,
        height: 57,
        borderRadius: 30,
        // marginHorizontal: 24,
        justifyContent: 'center'
        // alignSelf:'center'
      },
      text: {
        marginStart: 15,
        fontSize: 16,
        fontFamily: 'bold',
        color: colors.textColorWhite,
      },
});
export default BigButton;
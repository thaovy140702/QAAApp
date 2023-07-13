import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native'

const RectangleButton = props => {

    const navigation = useNavigation()
    return (
      <TouchableOpacity style={[styles.button, {backgroundColor: props.backgroundColor, borderColor: props.borderColor}]}
        onPress={() => navigation.navigate(`${props.page}`)}>
        <Text style={[styles.text, {color: props.color}]}>{props.text}</Text>
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
        width: 148,
        height: 50,
        borderRadius: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        justifyContent: 'center'
      },
      text: {
        fontSize: 16,
        fontFamily: 'bold'
      },
});
export default RectangleButton;
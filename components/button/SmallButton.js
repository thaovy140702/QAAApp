import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native'

const SmallButton = props => {

    const navigation = useNavigation()
    return (
      <TouchableOpacity style={[styles.button, {backgroundColor: props.backgroundColor}]}
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
        height: 60,
        borderRadius: 30,
        marginHorizontal: 5,
        justifyContent: 'center'
      },
      text: {
        fontSize: 16,
        fontFamily: 'bold'
      },
});
export default SmallButton;
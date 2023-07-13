import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';


const ButtonIcon = props => {

    const navigation = useNavigation()
    return (
      <TouchableOpacity style={[styles.button, {backgroundColor: props.backgroundColor}]}
        onPress={() => navigation.navigate(`${props.page}`)}>
        <Text style={[styles.text, {color: props.color}]}>{props.text}</Text>
        <View style={{marginLeft: 5}}>
            <Feather name="check-square" size={24} color="white" />
        </View>
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
        width: 180,
        height: 60,
        borderRadius: 30,
        marginHorizontal: 5,
        justifyContent: 'center',
        flexDirection: 'row'
      },
      text: {
        fontSize: 16,
        fontFamily: 'bold'
      },
});
export default ButtonIcon;
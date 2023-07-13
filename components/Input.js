import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import colors from "../constants/colors";
import { AntDesign } from '@expo/vector-icons';

const Input = props => {
    const [value, setValue] = useState(props.initialValue)

    // const [text, onChangeText] = React.useState('');
    const onChangeText = text => {
        setValue(text)
        props.onInputChanged(props.id, text)
    }

    let field = props.id

    return <View>

        <View style={[styles.inputContainer]}>
        <TextInput
        {...props}
        style={[styles.input, {backgroundColor: props.color}]}
        selectionColor={colors.pink}
        borderColor={props.borderColor}
        onChangeText={onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor={colors.grey}
        value={value}
        />
        </View>


       {
            props.errorText &&
            <View style={styles.errorContainer}>
                <AntDesign 
                    name="exclamationcircleo" 
                    size={16} 
                    color={colors.textColorRed} 
                />
                <Text style={styles.errorText}>{props.errorText[field]}</Text>
            </View>
        }

    </View>
}

const styles = StyleSheet.create({
    inputContainer:{
        alignItems: 'center'
    },
    input: {
        height: 50,
        width: 300,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        // marginTop: 20,
        color: colors.textColorBlack,
        // backgroundColor: 'pink',
        paddingStart: 20,
        fontFamily: 'medium'
      },
      errorContainer:{
        marginStart: '9%',
        marginTop: '2%',
        flexDirection: 'row'
      },
      errorText: {
        marginLeft: '2%',
        color: colors.textColorRed,
        fontFamily: 'regular',
        fontSize: 12
      },
});

export default Input;
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import colors from '../../constants/colors';

const BackButton = (props) => {
    const navigation = useNavigation()
  return (
    <TouchableOpacity 
        {...props}
        onPress={() => navigation.dispatch(CommonActions.goBack())}
        style={styles.buttonStyle}>
        <Feather name="chevron-left" size={24} color={colors.pink} />
    </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({
    buttonStyle: {
        width: 26,
        height: 26,
        backgroundColor: 'rgba(233,119,119,0.1)',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
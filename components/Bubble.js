import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from "../constants/colors";
import RegularText from '../components/text/RegularText'

    

const Bubble = ({message, time}) => {
    // const enabledBgColor = props.color || colors.pink;
    // const disabledBgColor = colors.lightGrey;
    // const bgColor = props.disabled ? disabledBgColor : enabledBgColor;

  return (
    <View style={{backgroundColor: 'pink'}}>
        <RegularText text={message} fontSize={12}/>
    </View>
  )
}

export default Bubble

const styles = StyleSheet.create({
    
})
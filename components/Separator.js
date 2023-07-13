import { StyleSheet, View } from 'react-native'
import React from 'react'
import colors from '../constants/colors'

const Separator = props => {
  return (
    <View style={[styles.separator, {width: props.width}]}/>
      
  )
}

export default Separator

const styles = StyleSheet.create({
    separator: {
        marginVertical: 20,
        marginHorizontal: 15,
        borderBottomColor: colors.mediumGrey,
        borderBottomWidth: 1,
    }
})
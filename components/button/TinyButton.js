import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RegularText from '../text/RegularText'
import colors from '../../constants/colors'


const Item = props => (
  <View style={[styles.buttonStyle, { shadowColor: props.shadowColor,backgroundColor: props.backgroundColor}]}>
    <RegularText text={props.title} color={props.color} fontSize={12}/>
  </View>
)

const ComingButton = () => {
  return (
    <Item 
      title="Coming"
      color={colors.textColorWhite}
      backgroundColor={colors.lightPink}
      shadowColor={colors.pink}
    />
  )
}

const FinishButton = () => {
  return (
    <Item 
      title="Finish"
      color={colors.textColorBlack}
      backgroundColor="#E5E4E3"
      shadowColor="black"
    />
  )
}

const CanceledButton = () => {
  return (
    <Item 
      title="Canceled"
      color={colors.textColorWhite}
      backgroundColor="#EA5541"
      shadowColor="red"
    />
  )
}

export {ComingButton, FinishButton, CanceledButton}
const styles = StyleSheet.create({
  buttonStyle: {
    width: 90,
    height: 22,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    shadowOffset: {width: -12, height: 8},
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 8
  }
})
import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import colors from '../constants/colors'


const UserImageSquare = (props) => {
  return (
    <View style={styles.imageSquareContainer}>
        <Image source={{ uri: props.image }} style={styles.userSquareImage} />
    </View>
  )
}


const UserImageCircle = (props) => {
  return (
    <View style={[styles.imageCircleContainer, {width: props.widthContainer, height: props.heightContainer}]}>
        <Image source={{ uri: props.image }} style={[styles.userCircleImage, {width: props.width, height: props.height}]} />
    </View>
  )
}

export {UserImageSquare, UserImageCircle}

const styles = StyleSheet.create({
  userSquareImage: {
    height: 70,
    width: 70,
    borderRadius: 20,
    overlayColor: "40%",
    shadowColor: colors.grey,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 20,
    shadowOpacity: 0.25,
    elevation: 3,
  },
  imageSquareContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(255, 159, 159, 0.2)',
    borderRadius: 50,
    overlayColor: "40%",
    width: 70,
    height: 70,
    overlayColor: "40%"
  },
  userCircleImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  imageCircleContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGrey,
    borderRadius: 50,
    overlayColor: "40%",
    resizeMode: 'contain'
  },
})
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../../components/button/BackButton'
import BoldText from '../../components/text/BoldText'
import MyStyles from '../../constants/MyStyles'
import RegularText from '../../components/text/RegularText'
import colors from '../../constants/colors'

const { width, height } = Dimensions.get("screen");

// dummy data
const data = [
 {
  id: 1,
  user: {
    idUser: 123,
    image: 'https://i.pinimg.com/564x/ff/c4/b7/ffc4b7a16b9f80fae9a81c36ce9cbb54.jpg'
  },
  notification: 'Lis has confirm your appointment',
  time: "Jan 14 2023"
 },
 {
  id: 2,
  user: {
    idUser: 123,
    image: 'https://i.pinimg.com/564x/ff/c4/b7/ffc4b7a16b9f80fae9a81c36ce9cbb54.jpg'
  },
  notification: 'Lis has confirm your appointment',
  time: "Jan 14 2023"
 }
]

const NotificationScreen = () => {

  const NotificationItem = ({image, notification, time}) => (
    <TouchableOpacity 
      style={styles.item}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.userImage} />
      </View>
  
      <View style={styles.content}>
        <RegularText text={notification}/>
        <View style={MyStyles.flexDirection}>
          <RegularText text={time} color="#8A8A8E" fontSize={12}/>
          <View style={styles.labelStyle}>
            <RegularText text="New" fontSize={12} color={colors.textColorWhite}/>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={{ width, height, position:'absolute', top:0 }}>

      {/* header start */}
      <View style={{flexDirection: 'row'}}>
        <View style={{alignItems: 'center', width: '100%', position: 'absolute', marginTop: 20}}>
          <BoldText text="Notifications" font={20} />
        </View>

        <View style={{width: 50, marginTop: 20, marginStart: 20}}>
          <BackButton/>
        </View>
      </View>
      
      {/* header end */}

      {/* notifcation list */}
      <View
        style={{ flex: 1 }}>
          <View style={{marginStart: 20, marginTop: 20}}> 
            <RegularText text="Today" color={colors.grey}/>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            bounces={false}
            decelerationRate = "fast"
            scrollEventThrottle={16}
            data={data}
            renderItem={({ item }) => (
              <NotificationItem
                image={item.user.image}
                notification={item.notification}
                time={item.time}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
    </SafeAreaView>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({

  item: {
    flexDirection: "row",
    paddingTop: "5%",
    width: "90%",
    marginHorizontal: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  userImage: {
    height: 70,
    width: 70,
    borderRadius: 20,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(255, 159, 159, 0.2)',
    borderRadius: 50,
    overlayColor: "40%",
    width: 70,
    height: 70
  },
  content: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    height: 70,
    width: "80%",
    paddingHorizontal: "5%",
    justifyContent: "center",
  },
  labelStyle: {
    backgroundColor: colors.darkPink,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 15,
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 15,
    shadowOpacity: 1.5,
    elevation: 10,
  }
})
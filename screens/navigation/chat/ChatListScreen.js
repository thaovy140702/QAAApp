import {
  Dimensions,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import HeaderTitle from '../../../components/text/HeaderTitle'
import RegularText from "../../../components/text/RegularText";
import { Feather } from "@expo/vector-icons";
import colors from "../../../constants/colors";
import MyStyles from "../../../constants/MyStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { UserImageCircle } from "../../../components/UserImage";

const { width, height } = Dimensions.get("screen");

const DATA = [
  {
    id: "123456",
    image:
      "https://res.cloudinary.com/dg2rjdf5q/image/upload/v1686687185/x9srwek4gq1ud425xk6f.jpg",
    name: "Ngann2011",
    lastMessage: "Hi",
    time: "06:00 AM",
  }
];



const ChatListScreen = () => {
  
  const navigation = useNavigation();

  // user item
  const Item = ({ image, name, lastMessage, time }) => (
  
    <TouchableOpacity
      onPress={() => navigation.navigate('ChatScreen')}
      style={styles.item}>
      
      <UserImageCircle height={60} width={60} image={image} widthContainer={70} heightContainer={70}/>
  
      <View style={styles.content}>
        <HeaderTitle text={name} fontSize={16} />
        <View style={MyStyles.flexDirection}>
          <RegularText text={lastMessage} color={colors.grey} />
          <RegularText text={time} color={colors.grey} />
        </View>
      </View>
    </TouchableOpacity>
  
  )
  
  return (
    <SafeAreaView style={{ width, height, backgroundColor:'#f7f7f7' }}>
      <View style={{flex:1}}>
        <View style={styles.headerTitle}>
          <HeaderTitle text="Message" fontSize={20} />
          <TouchableOpacity onPress={() => navigation.navigate("NotificationScreen")}>
              <Feather name="bell" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchInput}>
          <TextInput
            style={styles.textInputSearch}
            placeholder="Search"
            selectionColor={colors.pink}
          />
          <Feather
            style={styles.iconSearch}
            name="search"
            size={24}
            color="white"
          />
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            // style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            bounces={false}
            decelerationRate = "fast"
            scrollEventThrottle={16}
            data={DATA}
            renderItem={({ item }) => (
              <Item
                image={item.image}
                name={item.name}
                lastMessage={item.lastMessage}
                time={item.time}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

      </View>
    </SafeAreaView>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  headerTitle: {
    marginVertical: "5%",
    marginHorizontal: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchInput: {
    position:'relative',
    flexDirection: "row",
    alignSelf: "center",
    alignItems:'center',
    marginVertical: "2%",
  },
  iconSearch: {
    start: -10,
    position: "absolute",
    backgroundColor: colors.lightPink,
    borderRadius: 20,
    padding: 16,
    // width: 50,
    // height: 50,
  },
  textInputSearch: {
    height: 50,
    width: "85%",
    borderWidth: 1,
    borderRadius: 20,
    paddingStart: 65,
    backgroundColor: 'white',
    borderColor: 'white',
    color: colors.textColorBlack,
    fontFamily: "medium",
  },
  item: {
    flexDirection: "row",
    paddingTop: "5%",
    width: "90%",
    marginHorizontal: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    borderTopRightRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 159, 159, 0.2)',
    borderBottomRightRadius: 20,
    height: 70,
    width: "80%",
    paddingHorizontal: "5%",
    justifyContent: "center",
  },
});

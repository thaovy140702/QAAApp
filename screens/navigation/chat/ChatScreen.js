import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../../constants/colors";
import BoldText from "../../../components/text/BoldText";
import { Feather, FontAwesome } from "@expo/vector-icons";
import BackButton from "../../../components/button/BackButton";
import RegularText from '../../../components/text/RegularText'
import { useRoute } from "@react-navigation/native";

const ChatScreen = () => {
  const [inputValue, setInputValue] = useState("");
  const [displayValues, setDisplayValues] = useState([]);

  const handleButtonClick = () => {
    setDisplayValues([...displayValues, inputValue]);
    setInputValue("");
  };

  const {
    params: { userChatId, imageUser, usernameChat },
  } = useRoute();
  console.log(userChatId, imageUser, usernameChat)


  const currentTime = new Date();
  const inputDate = new Date(currentTime);



  const options = {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Asia/Ho_Chi_Minh'
  };
  
  const formattedDate = inputDate.toLocaleTimeString('en-VN', options);
  
  const renderDisplayValue = ({ item }) => (
    <View style={{ marginStart: 300}}>
    <Text style={styles.displayText}>{item}</Text>
    <RegularText text={formattedDate} fontSize={10}/>
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* header start*/}
      <View style={styles.headerStyle}>
        <View style={{ flexDirection: "row", width: 300 }}>
          <View style={{ marginTop: 10 }}>
            <BackButton />
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Image
              source={{
                uri: imageUser,
              }}
              style={styles.imageUser}
            />
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <BoldText text={usernameChat} color={colors.textColorBlack} fontSize={16} />
          </View>
        </View>
      </View>
      {/* header end */}

      {/* message start */}
      <View style={{ flex: 1 }}>
        <FlatList
        style={{ marginTop: 20}}
          data={displayValues}
          renderItem={renderDisplayValue}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>

      {/* message end */}

      <View style={styles.textInputMessage}>
        <TouchableOpacity>
          <Feather
            name="camera"
            size={20}
            color="black"
            style={{ marginTop: 20 }}
          />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Enter your message"
          onChangeText={(text) => setInputValue(text)}
          value={inputValue}
        />

        <TouchableOpacity>
          <Feather
            name="smile"
            size={20}
            color="black"
            style={{ position: "absolute", marginStart: -35 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleButtonClick}>
          <FontAwesome
            name="send"
            size={20}
            color={colors.pink}
            style={{ marginTop: 20 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  headerStyle: {
    marginTop: 20,
    backgroundColor: "rgba(255, 159, 159, 0.2)",
    borderRadius: 20,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  imageUser: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  buttonContainer: {
    backgroundColor: "rgba(255,159,159,0.6)",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 5,
    width: 26,
    height: 26,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "red",
    shadowOffset: { width: -1, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 8,
  },
  textInputMessage: {
    marginBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: colors.pink,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowRadius: 5,
    shadowOpacity: 0.25,
    elevation: 3,
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
    fontFamily: "medium",
  },
  displayText: {
    backgroundColor: colors.lightPink,
    color: "white",
    width: 60,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontFamily: "regular",
    borderRadius: 20,
  },
});

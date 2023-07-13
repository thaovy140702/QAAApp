import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MyStyles from "../../constants/MyStyles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../utils/actions/userActions";
import RegularText from "../../components/text/RegularText";
import colors from "../../constants/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderTitle from "../../components/text/HeaderTitle";
import { BottomSheet } from "react-native-btr";
import { Feather } from "@expo/vector-icons";

import BoldText from "../../components/text/BoldText";
import CategoryItem from "../../components/CategoryItem";
import ContentText from "../../components/text/ContentText";
import IconItem from "../../components/IconItem";
import VerticalLine from "../../components/VerticalLine";
import { AntDesign } from "@expo/vector-icons";
import BackButton from "../../components/button/BackButton";
import { getAllPostByUserId } from "../../utils/actions/postActions";


const { width, height } = Dimensions.get("window");

const UserScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation()

  const { id, username, profilePicture } = useSelector((state) => state.auth);
  const { posts, messageLike, userPost} = useSelector((state) => state.post);
  const dataUserPost =  userPost.blogs
  console.log("nnn", dataUserPost)
  const { userinfo } = useSelector((state) => state.user);
  
  const {
    params: { userId },
  } = useRoute();
  console.log(userId)
  

  useEffect(() => {
    dispatch(getUser(userId));
    dispatch(getAllPostByUserId(userId))
  }, [dispatch]);

  const [liked, setLiked] = useState(false);
  return (
    <SafeAreaView style={{ width, height, backgroundColor: "#f7f7f7" }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          style={{ paddingHorizontal: 20 }}
        >
          <View style={{}}>
            <View style={{ marginStart: 20,
            marginTop: 50}}>
            <BackButton />
            </View>
            
            <View style={{ marginTop: "8%", alignItems: "center" }}>
            <Image
              style={styles.userImage1}
              source={{ uri: userinfo.profilePicture}}
            />
            <Text style={[MyStyles.text_xl, { marginTop: 3 }]}>{userinfo.username}</Text>
            <Text style={MyStyles.text_sm}>{userinfo.email}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: colors.lightPink,
                borderRadius: 15,
                alignItems: "center",
                width: 170,
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}
              onPress={ ()=> {setLiked(!liked)} }
            >
              {}
              <RegularText text={liked ? "Follow" : "Following"} fontSize={14} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: colors.lightPink,
                borderRadius: 15,
                alignItems: "center",
                width: 170,
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}
              onPress={() => {
                navigation.navigate("ChatScreen", {
                  userChatId: userinfo._id,
                  usernameChat: userinfo.username,
                  imageUser: userinfo.profilePicture
                })
              }}
            >
              <RegularText text="Chat" fontSize={14} color="white" />
            </TouchableOpacity>
          </View>

          <View style={{ marginStart: 20 }}>
        <HeaderTitle text="All Posts" />

        <View style={{ marginBottom: 40 }}>
        {posts.map((item) => {
          let reaction = item.like.length;
          let dateTimeString = item.createdAt;
          let dateTime = new Date(dateTimeString);
          let time =
            dateTime.toLocaleTimeString("en-US", options) +
            " " +
            dateTime.toLocaleDateString("en-US", options);
          const options = {
            timeZone: "Asia/Ho_Chi_Minh",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          };

          const [liked, setLiked] = useState(false);

          const [visible, setVisible] = useState(false);

          const toggleBottomNavigationView = () => {
            //Toggling the visibility state of the bottom sheet
            setVisible(!visible);
          };

          return (
            <View key={item._id}>
              <View style={styles.postItemStyle}>
              <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}
      >
        {/*Bottom Sheet inner View*/}
        <View style={styles.bottomNavigationView}>
          <View>
            <BoldText text="All comments" font={14}/>
            <View style={styles.userStyle}>
                  <Image
                    source={{
                      uri: item.user["profilePicture"],
                    }}
                    style={{ borderRadius: 50, width: 40, height: 40}}
                  />
                  <View style={{ marginLeft: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("UserScreen");
                        }}
                      >
                        <BoldText text={item.user["username"]} />
                      </TouchableOpacity>
                    </View>
                    <RegularText text={time} fontSize={12} />
                  </View>
                </View>
                <View style={{ borderRadius: 20, borderWidth: 1, marginVertical: 10, borderColor: colors.lightGrey, width: 350, paddingVertical: 10, paddingStart: 20}}>
                <RegularText text="Thanks so much" fontSize={14}/>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 30,
                  }}
                >
                  <Image
                    source={{
                      uri: profilePicture,
                    }}
                    style={{ height: 35, width: 35, borderRadius: 50 }}
                  />
                  <TextInput style={styles.inputStyle} />
                  <Feather name="send" size={24} color={colors.grey} />
                </View>
          </View>
        </View>
      </BottomSheet>
                <View style={styles.userStyle}>
                  <Image
                    source={{
                      uri: userinfo.profilePicture,
                    }}
                    style={styles.userImage}
                  />
                  <View style={{ marginLeft: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("UserScreen");
                        }}
                      >
                        <BoldText text={userinfo.username}/>
                      </TouchableOpacity>
                      <CategoryItem text={item.topic} />
                    </View>
                    <RegularText text={time} fontSize={12} />
                  </View>
                </View>

                <View style={[styles.contentStyle, styles.shadowProp]}>
                  <View>
                    <BoldText text={item.title} font={16} />
                    <View>
                      <ContentText text={item.content} />
                    </View>
                    <Image
                      source={{
                        uri: item.image,
                      }}
                      style={styles.contentImage}
                    />
                  </View>
                </View>

                <View style={[styles.reactStyle, { marginBottom: 10 }]}>
                  <IconItem
                    label={reaction}
                    iconName="heart"
                    color={colors.pink}
                  />
                  <IconItem label="Share" iconName="sharealt" color="black" />
                </View>

                <View style={styles.line} />
                <View style={[styles.reactStyle]}>
                  <View style={{ marginTop: 10 }}>
                    {/* handle like post*/}
                    <TouchableOpacity
                      onPress={() => {
                        setLiked(!liked);
                        console.log(item._id);
                        dispatch(likePost(item._id, id));
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        {liked ? (
                          <AntDesign
                            name="heart"
                            size={20}
                            color={colors.pink}
                          />
                        ) : (
                          <AntDesign name="hearto" size={20} color="black" />
                        )}
                      </View>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: "pink" }}></View>
                  </View>
                  <VerticalLine />
                  <TouchableOpacity
                    style={{ marginTop: 10 }}
                    onPress={toggleBottomNavigationView}
                  >
                    <IconItem
                      label="Comment"
                      iconName="message1"
                      color="black"
                    />
                  </TouchableOpacity>
                  <VerticalLine />
                  <View style={{ marginTop: 10 }}>
                    <IconItem label="12" iconName="eyeo" color="black" />
                  </View>
                </View>
                <View style={styles.line} />


              </View>
              
            </View>
          );
        })}
      </View>
      </View>
          <View style={{ paddingStart: 20 }}></View>
          <View style={{ margin: "20%" }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  userImage1: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  setting: {
    flexDirection: "row",
    backgroundColor: "white",
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
  },
  container: {
    backgroundColor: "white",
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  slideStyle: {
    width: 300,
    height: 150,
    borderRadius: 20,
    resizeMode: "contain",
    marginRight: 10,
  },
  topPost: {
    backgroundColor: "rgba(247, 192, 170, 0.2)",
    borderRadius: 20,
    width: 350,
    marginRight: 10,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  imageTopPostStyle: {
    borderRadius: 10,
    width: 100,
    height: 90,
    resizeMode: "contain",
  },
  postItemStyle: {
    backgroundColor: "rgba(247, 192, 170, 0.2)",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  contentStyle: {
    marginTop: 20,
  },
  userStyle: {
    flexDirection: "row",
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  contentImage: {
    height: 250,
    resizeMode: "contain",
  },
  reactStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputStyle: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.grey,
    height: 40,
    width: 230,
    paddingStart: 20
  },
  shadowProp: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
  },
  line: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  tabView: {
    height: 2500,
  },
  routeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonStyle: {
    alignItems: "center",
    padding: 10,
    width: 140,
    height: 50,
    borderRadius: 30,
    marginHorizontal: 5,
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: colors.pink,
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: 700,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
});

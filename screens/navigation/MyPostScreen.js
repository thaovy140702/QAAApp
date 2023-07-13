import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import BoldText from "../../components/text/BoldText";
import RegularText from "../../components/text/RegularText";
import ContentText from "../../components/text/ContentText";
import IconItem from "../../components/IconItem";
import colors from "../../constants/colors";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import VerticalLine from "../../components/VerticalLine";
import CategoryItem from "../../components/CategoryItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostByUserId, getAllPosts, likePost } from "../../utils/actions/postActions";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { getUser } from "../../utils/actions/userActions";
import BackButton from "../../components/button/BackButton";
import { MaterialIcons } from "@expo/vector-icons";

const MyPostScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { id, username, profilePicture } = useSelector((state) => state.auth);
  const { posts, messageLike, userPost } = useSelector((state) => state.post);
  const { userinfo } = useSelector((state) => state.user);
  const dataUserPost = userPost.blogs
  console.log(dataUserPost)

  useEffect(() => {
    // dispatch(getAllPosts());
    dispatch(getUser(id));
    dispatch(getAllPostByUserId(id))
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          paddingTop: "8%",
          paddingHorizontal: 20,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BackButton />
        <View>
          <BoldText text="My post" font={18} />
        </View>

        <View style={{ flexDirection: 'row', width: 70, justifyContent: 'space-between'}}>
            <TouchableOpacity>
          <Feather name="delete" size={24} color="black"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("EditPostScreen")}>
          <Feather name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ marginBottom: 40, marginTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {dataUserPost.map((item) => {
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

          return (
            <TouchableOpacity key={item._id}>
              <View style={styles.postItemStyle}>
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
                        <BoldText text={userinfo.username} />
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
                        dispatch(likePost(item._id, userId));
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
                  <View style={{ marginTop: 10 }}>
                    <IconItem
                      label="Comment"
                      iconName="message1"
                      color="black"
                    />
                  </View>
                  <VerticalLine />
                  <View style={{ marginTop: 10 }}>
                    <IconItem label="12" iconName="eyeo" color="black" />
                  </View>
                </View>
                <View style={styles.line} />

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
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPostScreen;

const styles = StyleSheet.create({
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
    marginTop: 20,
    marginBottom: 40,
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
});

import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
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
import Input from "../../components/Input";
import { UserImageCircle } from "../../components/UserImage";
import HeaderTitle from "../../components/text/HeaderTitle";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFollowingPosts,
  getAllPosts,
  likePost,
} from "../../utils/actions/postActions";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { BottomSheet } from "react-native-btr";

const data = [
  {
    id: "1",
    name: "Harry",
    image:
      "https://i.pinimg.com/474x/a5/21/51/a521512e949534d91ec030cea7b8352c.jpg",
    time: "15 minutes ago",
    title: "7 tips and tricks in RN",
    content: "Here are some tips that the React developer have to know ...",
    imageContent:
      "https://i.pinimg.com/474x/2e/0a/7c/2e0a7c993a0e8a0f119c514694d81a18.jpg",
    reactions: "500",
    category: "English",
    comment: {},
    view: "600",
  },
  {
    id: "2",
    name: "Kaisa",
    image:
      "https://i.pinimg.com/474x/ad/d5/dc/add5dcf005ae1542a45934245175c095.jpg",
    time: "15 minutes ago",
    title: "7 tips and tricks in React native",
    content: "Here are some tips that the React developer have to know ...",
    imageContent:
      "https://i.pinimg.com/474x/ab/13/c8/ab13c80dbe70ed5aa72376f3a54558dc.jpg",
    reactions: "500",
    comment: {},
    view: "600",
    category: "IT",
  },
  {
    id: "3",
    name: "Harry",
    image:
      "https://i.pinimg.com/474x/4a/4b/ac/4a4bac5776ad38b670f6695500bd144e.jpg",
    time: "15 minutes ago",
    title: "7 tips and tricks in React native",
    content: "Here are some tips that the React developer have to know ...",
    imageContent:
      "https://i.pinimg.com/474x/2e/0a/7c/2e0a7c993a0e8a0f119c514694d81a18.jpg",
    reactions: "500",
    category: "History",
    comment: {},
    view: "600",
  },
];

const slideData = [
  {
    id: 2,
    slide:
      "https://i.pinimg.com/564x/ca/fc/8e/cafc8e3e3eb11be41e3f4403a50e5b7a.jpg",
  },
  {
    id: 1,
    slide:
      "https://i.pinimg.com/564x/8f/37/be/8f37be749ff4037ef5ff9faae4fd6d33.jpg",
  },
  {
    id: 3,
    slide:
      "https://i.pinimg.com/564x/75/73/b3/7573b3633ba4b912a7ca8a83f8c78e7d.jpg",
  },
];

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { id, username, profilePicture } = useSelector((state) => state.auth);
  const { posts, messageLike, followingPost } = useSelector(
    (state) => state.post
  );
  console.log(posts);

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllFollowingPosts(id));
  }, [dispatch]);

  // All posts
  const FirstRoute = () => (
    <ScrollView>
      
      <View style={{ marginStart: 20 }}>
        <HeaderTitle text="All Posts" />
      </View>

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

          const [inputValue, setInputValue] = useState("");
          const [displayValues, setDisplayValues] = useState([]);

          const handleButtonClick = () => {
            setDisplayValues([...displayValues, inputValue]);
            setInputValue("");
          };
          const currentTime = new Date();
          const inputDate = new Date(currentTime);

          const formattedDate = inputDate.toLocaleTimeString("en-VN", options);

          const renderDisplayValue = ({ item }) => (
            <View>
              <View style={{ flexDirection: 'row'}}>
              <Image
                source={{
                  uri: profilePicture,
                }}
                style={{ borderRadius: 50, width: 40, height: 40 }}
              />
              <View style={{ marginLeft: 10 }}>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("UserScreen");
                    }}
                  >
                    <BoldText text={username} />
                  </TouchableOpacity>
                </View>
                <RegularText text={formattedDate} fontSize={12} />
              </View>
              </View>

              <View
                style={{
                  borderRadius: 20,
                  borderWidth: 1,
                  marginVertical: 10,
                  borderColor: colors.lightGrey,
                  width: 350,
                  paddingVertical: 10,
                  paddingStart: 20,
                }}
              >
                <RegularText text={item} fontSize={14} />
              </View>
            </View>
          );

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
                      <BoldText text="All comments" font={14} />
                      <View style={styles.userStyle}>
                        <View style={{ flex: 1 }}>
                          <FlatList
                            style={{ marginTop: 20 }}
                            data={displayValues}
                            renderItem={renderDisplayValue}
                            keyExtractor={(_, index) => index.toString()}
                          />
                        </View>
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
                        <TextInput
                          style={styles.inputStyle}
                          onChangeText={(text) => setInputValue(text)}
                          value={inputValue}
                        />
                        <TouchableOpacity onPress={handleButtonClick}>
                          <Feather name="send" size={24} color={colors.grey} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </BottomSheet>
                <View style={styles.userStyle}>
                  <Image
                    source={{
                      uri: item.user["profilePicture"],
                    }}
                    style={styles.userImage}
                  />
                  <View style={{ marginLeft: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("UserScreen", {
                            userId: item.user["_id"]
                          });
                        }}
                      >
                        <BoldText text={item.user["username"]} />
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
    </ScrollView>
  );
  // end all posts

  // following
  const SecondRoute = () => (
    <View style={styles.routeContainer}>
      <ScrollView>
        <View style={{ marginStart: 20 }}>
          <HeaderTitle text="All Following Posts" />
        </View>

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
                        <BoldText text="All comments" font={14} />
                        <View style={styles.userStyle}>
                          <Image
                            source={{
                              uri: item.user["profilePicture"],
                            }}
                            style={{ borderRadius: 50, width: 40, height: 40 }}
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
                        <View
                          style={{
                            borderRadius: 20,
                            borderWidth: 1,
                            marginVertical: 10,
                            borderColor: colors.lightGrey,
                            width: 350,
                            paddingVertical: 10,
                            paddingStart: 20,
                          }}
                        >
                          <RegularText text="Thanks so much" fontSize={14} />
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
                        uri: item.user["profilePicture"],
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
                          <BoldText text={item.user["username"]} />
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
      </ScrollView>
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "All posts" },
    { key: "second", title: "Following" },
  ]);

  // Item Slide
  const Slide = ({ slide }) => (
    <Image source={{ uri: slide }} style={styles.slideStyle} />
  );
  // end item slide

  // item top post
  const TopPost = ({ image, category, title, name, time, reactions }) => (
    <View style={styles.topPost}>
      <View style={{ flexDirection: "row" }}>
        <Image source={{ uri: image }} style={styles.imageTopPostStyle} />
        <View style={{ flexDirection: "column", marginLeft: 10 }}>
          <View>
            <BoldText text={title} />
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ marginRight: 10 }}>
              <BoldText text={name} />
            </View>
            <IconItem label={reactions} iconName="heart" color={colors.pink} />
          </View>
          <RegularText text={time} fontSize={12} />
        </View>
      </View>
    </View>
  );
  // end top post

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      m
      indicatorStyle={{ backgroundColor: "white", width: 100, marginStart: 30 }}
      style={{
        backgroundColor: colors.lightPink,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 15,
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Input placeholder="Search" color="white" />
        <View style={{ position: "absolute", marginStart: 280 }}>
          <Feather name="search" size={24} color="black" />
        </View>
        <UserImageCircle
          width={40}
          height={40}
          heightContainer={45}
          widthContainer={45}
          image={profilePicture}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View>
            <FlatList
              data={slideData}
              horizontal
              style={{ marginVertical: 10, marginStart: 20 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <Slide slide={item.slide} />}
              keyExtractor={(item) => item.id}
            />
          </View>
          <TabView
            style={styles.tabView}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
        </View>
      </ScrollView>
      <View style={{ position: "absolute", marginTop: 680, marginStart: 230 }}>
        <TouchableOpacity
          style={styles.addButtonStyle}
          onPress={() => {
            navigation.navigate("CreateScreen");
          }}
        >
          <BoldText text="Add post" font={16} color="white" />
          <View style={{ marginLeft: 5 }}>
            <Feather name="plus-square" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

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
    paddingStart: 20,
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
    height: 5000,
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
    paddingVertical: 30,
  },
});

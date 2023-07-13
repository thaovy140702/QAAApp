import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import BoldText from "../../../components/text/BoldText";
import colors from "../../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../../utils/actions/postActions";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../../components/button/BackButton";
import RegularText from "../../../components/text/RegularText";
import HeaderTitle from "../../../components/text/HeaderTitle";
import { useState } from "react";

const FollowingScreen = () => {

  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // const { id, username, profilePicture } = useSelector((state) => state.auth);
  // const { posts, messageLike } = useSelector((state) => state.post);
  // console.log(posts);

  useEffect(() => {
    dispatch(getAllPosts());
    // dispatch(getUser(id));
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          paddingTop: "8%",
          paddingHorizontal: 20,
          alignItems: "center",
    
        }}
      >
        <BackButton />
        <View style={{ marginStart: 90}}>
          <BoldText text="Followings" font={18} />
        </View>
      </View>

      <View style={{ marginStart: 20 }}>
        <HeaderTitle text="All (20)" />
      </View>

      <ScrollView
        style={{ marginBottom: 40, marginTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* {posts.map((item) => {
        
          return ( */}
            <View style={{ marginStart: 20, flexDirection: "row"}}>
                <Image
                    source={require("../../../assets/images/userimage.jpg")}
                    style={{ borderRadius: 50, width: 50, height: 50}}
                  />
                  <View style={{ marginStart: 20, alignItems: "center", justifyContent: 'center'}}>
                  <RegularText text="Thaovy" />
                  </View>
                  <TouchableOpacity
              style={{
                marginStart:20,
                backgroundColor: colors.lightPink,
                borderRadius: 15,
                alignItems: "center",
                width: 100,
                paddingHorizontal: 5,
                paddingVertical: 10,
              }}
              onPress={ ()=> {setLiked(!liked)} }
            >
              {}
              <RegularText text={liked ? "Follow" : "Unfollow"} fontSize={14} color="white" />
            </TouchableOpacity>
                  
            </View>
          {/* )
        })} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FollowingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexGrow: 1,
  }
});

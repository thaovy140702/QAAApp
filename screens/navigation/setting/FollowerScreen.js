import {
  Image,
  ScrollView,
  StyleSheet,
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

const FollowerScreen = () => {
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
          <BoldText text="Followers" font={18} />
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
                  
            </View>
          {/* )
        })} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FollowerScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexGrow: 1,
  }
});

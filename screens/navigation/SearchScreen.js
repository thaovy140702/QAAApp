import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import Input from "../../components/Input";
import BoldText from "../../components/text/BoldText";
import RegularText from "../../components/text/RegularText";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllTopic } from "../../utils/actions/topicActions";
import colors from "../../constants/colors";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: "1",
    image:
      "https://i.pinimg.com/474x/f9/71/b9/f971b9ba330a1782d6fc0da34c4ef738.jpg",
    title: "IT",
  },
  {
    id: "2",
    image:
      "https://i.pinimg.com/564x/99/f0/5f/99f05f0ebd5028b3a20c0873c2162e90.jpg",
    title: "History",
  },
  {
    id: "3",
    image:
      "https://i.pinimg.com/564x/99/f0/5f/99f05f0ebd5028b3a20c0873c2162e90.jpg",
    title: "Foreign language",
  },
  {
    id: "4",
    image:
      "https://i.pinimg.com/474x/68/40/89/684089ad625d16a90139231f60aac159.jpg",
    title: "Philosophy",
  },
  {
    id: "5",
    image:
      "https://i.pinimg.com/474x/ee/b8/1b/eeb81b836bc008f09ece3ac86ae36ba7.jpg",
    title: "Photography",
  },
  {
    id: "6",
    image:
      "https://i.pinimg.com/564x/d1/96/b7/d196b76776235659b859a55dbdc6b2f3.jpg",
    title: "Book reviews",
  },
  {
    id: "7",
    image:
      "https://i.pinimg.com/474x/cd/06/0a/cd060a5263c6e8be23b224649d1a7e33.jpg",
    title: "Art",
  },
  {
    id: "8",
    image:
      "https://i.pinimg.com/474x/02/3a/fd/023afd17b4436f3f4b23bfac04d2b467.jpg",
    title: "Life",
  },
];

const SearchScreen = () => {

  const [filterData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation()
  let { topic } = useSelector((state) => state.topic);
  
  useEffect(() => {
    dispatch(getAllTopic());
    setfilterData(topic);
    setmasterData(topic);
  }, [dispatch]);

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.topicname
          ? item.topicname.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterData(newData);
      setSearch(text);
    } else {
      setfilterData(masterData);
      setSearch(text);
    }
  };

  const SearchItem = ({ image, title }) => (
    <TouchableOpacity onPress={() => {
      navigation.navigate("PostScreen")
    }}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.searchItemStyle}
        borderRadius={20}
      >
        <BoldText text={title} font={14} color="white" />
      </ImageBackground>
    </TouchableOpacity>
  );
  console.log(filterData)
  return (
    <SafeAreaView style={styles.container}>
      {/* header start */}
      <View style={styles.header}>
        <View style={styles.searchInput}>
          <TextInput
            value={search}
            style={styles.textInputSearch}
            placeholder="Search"
            selectionColor={colors.pink}
            onChangeText={(text) => searchFilter(text)}
          />
          <Feather
            style={styles.iconSearch}
            name="search"
            size={24}
            color="white"
          />
        </View>
       
      </View>
      {/* header end */}
{/* 
      <TouchableOpacity style={styles.buttonStyle}>
          <RegularText text="Add" color="white" />
        </TouchableOpacity> */}
       
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchStyle}>
          {filterData.map((item) => {
            return (
              <View key={item._id}>
                <SearchItem image={item.picture} title={item.topicname} />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchItemStyle: {
    width: 160,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 5,
  },
  searchStyle: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    backgroundColor: "#64A587",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 20,
  },
  textInputSearch: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderRadius: 20,
    paddingStart: 65,
    backgroundColor: "white",
    borderColor: "pink",
    color: colors.textColorBlack,
    fontFamily: "medium",
  },
  searchInput: {
    position: "relative",
    marginTop: "5%",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: "2%",
  },
  iconSearch: {
    position: "absolute",
    backgroundColor: "rgba(255, 159, 159, 1)",
    borderRadius: 20,
    padding: 16
  },
});

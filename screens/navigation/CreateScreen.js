import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Indicator from "../../components/Indicator";
import { useDispatch, useSelector } from "react-redux";
import { useReducer } from "react";
import { reducer } from "../../utils/reducers/formReducers";
import BackButton from "../../components/button/BackButton";
import colors from "../../constants/colors";
import MyStyles from "../../constants/MyStyles";
import { validateInput } from "../../utils/actions/formActions";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { LogBox } from "react-native";
import ContentInput from "../../components/ContentInput";
import { Image } from "react-native";
import RegularText from "../../components/text/RegularText";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { addPost, saveFormValue } from "../../utils/actions/postActions";
LogBox.ignoreLogs([
  'Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead',
]);

const { width, height } = Dimensions.get("window");
const initialState = {
  inputValues: {
    title: "",
    content: "",
    topic: "",
  },
  inputValidities: {},
};
const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const CreateScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { topic } = useSelector((state) => state.topic);
  const { id } = useSelector((state) => state.auth);
  const { formDataValue } = useSelector((state) => state.post);
  console.log(formDataValue);

  // const { messAddPost, error } = useSelector((state) => state.post);
  // console.log("mess", messAddPost, error)

  const [image, setImage] = useState();
  const [value, setValue] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

    const uriParts = result.assets[0].uri.split(".");
    const fileType = uriParts[uriParts.length - 1];

    const myForm = new FormData();
    myForm.append("image", {
      uri: result.assets[0].uri,
      type: `image/${fileType}`,
      name: `image.${fileType}`,
    });
    myForm.append("user", id);
    myForm.append("title", formState.inputValues.title);
    myForm.append("content", formState.inputValues.content);
    myForm.append("topic", value);

    dispatch(saveFormValue(myForm));
  };

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const handleAddPost = () => {
    // console.log("test",formState.inputValues.title,
    //   formState.inputValues.content, value)
  };

  return (
    <SafeAreaView style={{ width, height, backgroundColor: "white" }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          style={{ flex: 1, paddingHorizontal: 20 }}
        >
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
            <Text style={[MyStyles.text_xxl, { start: 0 }]}>
              Create new post
            </Text>
            <TouchableOpacity
              onPress={() => {
                // dispatch(addPost(formDataValue))
                navigation.navigate("Home")
              }}
            >
              <MaterialIcons name="fact-check" size={24} color={colors.pink} />
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "height" : undefined}
            keyboardVerticalOffset={100}
          >
            <Indicator
              id="title"
              placeholder="Title"
              title="Title"
              onInputChanged={inputChangedHandler}
              initialValue={formState.inputValues.title}
              numberOfLines={3}
              maxLength={50}
            />
            <Text style={[MyStyles.text_md_grey, { width: "30%" }]}>
              Content
            </Text>
            <View style={{ marginVertical: 20 }}>
              <ContentInput
                id="content"
                placeholder=""
                borderColor={colors.lightGrey}
                onInputChanged={inputChangedHandler}
                initialValue={formState.inputValues.content}
              />
            </View>
            <Text style={[MyStyles.text_md_grey, { width: "30%" }]}>
              Add Image
            </Text>

            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={topic}
              search
              maxHeight={300}
              labelField="topicname"
              valueField="topicname"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={value}
              onChange={(item) => {
                setValue(item.topicname);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color="black"
                  name="Safety"
                  size={20}
                />
              )}
            />
            <Text style={[MyStyles.text_md_grey, { width: "30%" }]}>Topic</Text>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={pickImage}
                style={{
                  backgroundColor: colors.pink,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 20,
                }}
              >
                <RegularText text="Pick image" fontSize={14} color="white" />
              </TouchableOpacity>
              {image && (
                <Image style={styles.userImage} source={{ uri: image }} />
              )}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  userImage: {
    width: 200,
    height: 200,
    marginVertical: 20,
    borderRadius: 15,
  },
  camera: {
    backgroundColor: " rgba(255, 255, 255, 0.72)",
    borderRadius: 5,
    padding: 2,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: "regular",
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: "regular",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    fontFamily: "regular",
  },
});

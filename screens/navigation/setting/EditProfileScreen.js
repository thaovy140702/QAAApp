import {
    View,
    Dimensions,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Text,
  } from "react-native";
  import React, { useCallback } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
  import Indicator from "../../../components/Indicator";
  import { useDispatch, useSelector } from "react-redux";
  import { useReducer } from "react";
  import { reducer } from "../../../utils/reducers/formReducers";
  import BackButton from "../../../components/button/BackButton";
  import colors from "../../../constants/colors";
  import MyStyles from "../../../constants/MyStyles";
  import { validateInput } from "../../../utils/actions/formActions";
  import { useNavigation } from "@react-navigation/native";
  import { useState } from "react";
  import { LogBox } from "react-native";
  import RegularText from '../../../components/text/RegularText'
  
  LogBox.ignoreLogs([
    'Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead',
  ]);
  
  const { width, height } = Dimensions.get("window");
  const initialState = {
    inputValues: {
      description: "",
      username: "",
      email: "",
      gender: "",
      age: "",
      phone: "",
      character: "",
      appearance: "",
    },
    inputValidities: {
      username: false,
    },
  };
  
  const EditProfileScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();


    // const loading = useMessage(navigation, dispatch, "EditProfile");
  
    const { userinfo } = useSelector((state) => state.user);
  
    const [image, setImage] = useState(userinfo.profilePicture);
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0].uri)
      }
      
    //   const uriParts = result.assets[0].uri.split(".");
    //   const fileType = uriParts[uriParts.length - 1];
  
    //   const myForm = new FormData();
    //   myForm.append("image", {
    //     uri: result.assets[0].uri,
    //     type: `image/${fileType}`,
    //     name: `image.${fileType}`,
    //   });
    //   console.log(myForm._parts)
    //   dispatch(uploadImage(myProfile._id, myForm));
    };

    // const { id } = useSelector((state) => state.user);
    // const { message, messUploadImage } = useSelector((state) => state.other);
    // console.log(messUploadImage);
    const [formState, dispatchFormState] = useReducer(reducer, initialState);
  
    const inputChangedHandler = useCallback(
      (inputId, inputValue) => {
        const result = validateInput(inputId, inputValue);
        dispatchFormState({ inputId, validationResult: result, inputValue });
      },
      [dispatchFormState]
    );
  
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
              <Text style={[MyStyles.text_xxl, { start: 0 }]}>Edit Profile</Text>
              <TouchableOpacity onPress={() => handlerEditProfile()}>
                <MaterialIcons name="fact-check" size={24} color={colors.pink} />
              </TouchableOpacity>
            </View>
  
            <View style={{ marginTop: "5%", alignItems: "center" }}>
              <View style={{ position: "relative", padding: 1 }}>
                {image && (
                  <Image
                    style={styles.userImage}
                    source={{
                      uri: !userinfo.profilePicture
                        ? "https://i.pinimg.com/originals/bc/5c/9c/bc5c9cdf9939a91ca091c544cb7cf4f8.jpg"
                        : userinfo.profilePicture,
                    }}
                  />
                )}
                <TouchableOpacity
                  style={{ position: "absolute", bottom: 0, right: 0 }}
                  onPress={pickImage}
                >
                  <MaterialCommunityIcons
                    style={styles.camera}
                    name="camera-flip-outline"
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
            </View>
  
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "height" : undefined}
              keyboardVerticalOffset={100}
            >
              <Indicator
                id="description"
                placeholder={userinfo.description}
                title="Describe"
                onInputChanged={inputChangedHandler}
                initialValue={formState.inputValues.description}
                numberOfLines={2}
                maxLength={50}
              />
              <Indicator
                id="username"
                placeholder={userinfo.username}
                title="Username"
                onInputChanged={inputChangedHandler}
                initialValue={formState.inputValues.username}
              />
              <Indicator
                title="Email"
                placeholder={userinfo.email}
                editable={false}
                selectTextOnFocus={false}
              />
              <View style={{ marginStart: 40, marginTop: 250}}>
              <RegularText text={`Joined on` + ` ` + userinfo.createdAt} />
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };
  
  export default EditProfileScreen;
  
  const styles = StyleSheet.create({
    userImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    camera: {
      backgroundColor: " rgba(255, 255, 255, 0.72)",
      borderRadius: 5,
      padding: 2,
    },
  });
  
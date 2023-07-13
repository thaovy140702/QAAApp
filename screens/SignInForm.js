import React, { useCallback, useReducer, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import imageBackground from "../assets/images/test.png";
import BigButton from "../components/button/BigButton";
import Input from "../components/Input";
import RegularText from "../components/text/RegularText";
import Separator from "../components/Separator";
import colors from "../constants/colors";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducers";
import { SafeAreaView } from "react-native-safe-area-context";
import MyStyles from "../constants/MyStyles";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from '@expo/vector-icons';
import { useMessageAndErrorUser } from "../utils/hooks";
import { login } from "../utils/actions/authActions";

const { width, height } = Dimensions.get("window");

const initialState = {
  inputValues: {
    email: "",
    password: "",
  },
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignInForm = () => {

  // const [username, setUsername] = useState("")
  // const [password, setPassword] = useState("")
  
  const [isSecureEntry, setIsSecureEntry] = useState(true)
  

  const dispatch = useDispatch()
  const navigation = useNavigation();
  const loading = useMessageAndErrorUser(navigation, dispatch, "Navigation")
  const {message, accessToken, isAuthenticated} = useSelector((state) => state.auth);
  console.log(message, accessToken,isAuthenticated)
  const submitHandler = () => {
    console.log(formState.inputValues.email, formState.inputValues.password)
    dispatch(login(formState.inputValues.email, formState.inputValues.password))
    // navigation.navigate("Navigation")
  }
  
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  return (
    <ImageBackground source={imageBackground} style={styles.image}>
      <SafeAreaView style={{ width, height }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "height" : undefined}
          keyboardVerticalOffset={100}
        >
          <View style={{ flex: 0.25 }}>
            {/* <Title text="Hi!" /> */}
            <Text style={[MyStyles.text_lg, { marginStart: "8%", top: 8 }]}>
              Welcome !
            </Text>
            <Text style={[MyStyles.text_md, { marginStart: "8%" }]}>
              Sign in to continue
            </Text>
          </View>

          <View style={[styles.container]}>
            <View>
              <View style={styles.button}>
                <BigButton text="Continue with Google" />
              </View>

              <View style={[styles.separator, { alignItems: "center" }]}>
                <Separator width={115} />
                <RegularText text="Or" color="grey" />
                <Separator width={112} />
              </View>

              <Input
                id="email"
                placeholder="Email"
                onInputChanged={inputChangedHandler}
                borderColor={colors.lightGrey}
                errorText={formState.inputValidities["email"]}
                initialValue={formState.inputValues.email}
              />
              <View>
                <View style={{ marginTop: 20}}>
                <Input
                  id="password"
                  placeholder="Password"
                  secureTextEntry={isSecureEntry}
                  borderColor={colors.lightGrey}
                  onInputChanged={inputChangedHandler}
                  initialValue={formState.inputValues.username}
                  errorText={formState.inputValidities["password"]}
                />
                </View>
                <TouchableOpacity 
                  style={styles.iconHide}
                  onPress={() => setIsSecureEntry((prev => !prev))}>
                  <Feather name={isSecureEntry ? "eye" : "eye-off"} size={20} color={colors.grey} />
                </TouchableOpacity>

              </View>
                      

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Forgotpassword");
                }}
              >
                <View style={styles.textForgot}>
                  {/* <BoldText text="Forgot password?" /> */}
                  <Text style={[MyStyles.text_sm, { fontFamily: "bold" }]}>
                    Forgot password ?
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flex: 0.25,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
           { loading ?
           <ActivityIndicator size='large' color={colors.pink} style={{marginTop: 20}}/> :
           <View style={styles.button}>
              <BigButton
                text="Get Started"
                disabled={!formState.formIsValid}
                onPress={() => {
                  submitHandler()
                }}
              />
            </View>}

            <View style={styles.separator}>
              {/* <BoldText text="Didn't have an account?" /> */}
              <Text style={[MyStyles.text_sm, { fontFamily: "bold" }]}>
                Didn't have an account ?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                {/* <BoldText text=" Sign Up" color={colors.pink} /> */}
                <Text
                  style={[
                    MyStyles.text_sm,
                    { fontFamily: "bold", color: '#64A587' },
                  ]}
                >
                  {" "}
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    flex: 0.8,
    // position:'relative',
    paddingHorizontal: "8%",
    justifyContent: "space-evenly",
    alignSelf: "center",
    // alignContent: 'center',
  },
  image: {
    flex: 0.23,
    padding: 0,
    margin: 0,
    height: 200,
    resizeMode: "cover",
  },
  separator: {
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    // marginTop: '18%',
    alignItems: "center",
  },
  checkbox: {
    // marginStart: '9%',
    width: 300,
    marginTop: "5%",
    flexDirection: "row",
  },

  textForgot: {
    marginTop: "5%",
    flexDirection: "row-reverse",
  },
  iconHide: {
    position: 'absolute', 
    marginTop: 35, 
    marginStart: 260
  }
});

export default SignInForm;

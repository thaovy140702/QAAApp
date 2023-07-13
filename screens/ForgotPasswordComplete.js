import React, {
  useCallback,
  useReducer,
  useState,
  useRef,
} from "react";
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
  TextInput,
  Keyboard,
} from "react-native";
import imageBackground from "../assets/images/test.png";
import BigButton from "../components/button/BigButton";
import Input from "../components/Input";
import RegularText from "../components/text/RegularText";
import colors from "../constants/colors";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducers";
import { SafeAreaView } from "react-native-safe-area-context";
import MyStyles from "../constants/MyStyles";
import { useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";

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

const ForgotPasswordComplete = () => {
  // set state OTP Textinput
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const [otp6, setOtp6] = useState("");

  let otp2Ref = useRef(null);
  let otp3Ref = useRef(null);
  let otp4Ref = useRef(null);
  let otp5Ref = useRef(null);
  let otp6Ref = useRef(null);

  const fullOTP = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
  

  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const loading = useMessageAndErrorUser(navigation, dispatch, "Navigation");

  // funtion handler reset password
  // const submitHandler = () => {
  //   console.log(formState.inputValues.email, formState.inputValues.password, fullOTP);
  //   dispatch(newPassword(formState.inputValues.email, formState.inputValues.password, fullOTP))
  //   navigation.navigate("Signin")
  // };

  // const {mess} = useSelector((state) => state.other)
  //   console.log(mess)

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  // funtion handler change text input
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
            <Text style={[MyStyles.text_lg, { marginStart: "8%", top: 8 }]}>
              Forgot password !
            </Text>
            <Text
              style={[MyStyles.text_md, { marginStart: "8%", marginTop: 15 }]}
            >
              Please enter your new password
            </Text>
          </View>

          {/* OTP text input */}
          <View style={styles.otpTextinputcontainer}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(text) => {
                setOtp1(text);
                if (text.length > 0) {
                  otp2Ref.focus();
                }
              }}
              value={otp1}
              autoFocus={true}
              blurOnSubmit={false}
              onSubmitEditing={() => otp2Ref.focus()}
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(text) => {
                setOtp2(text);
                if (text.length > 0) {
                  otp3Ref.focus();
                }
              }}
              value={otp2}
              ref={(ref) => {
                otp2Ref = ref;
              }}
              blurOnSubmit={false}
              onSubmitEditing={() => otp3Ref.focus()}
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(text) => {
                setOtp3(text);
                if (text.length > 0) {
                  otp4Ref.focus();
                }
              }}
              value={otp3}
              ref={(ref) => {
                otp3Ref = ref;
              }}
              blurOnSubmit={false}
              onSubmitEditing={() => otp4Ref.focus()}
            />

            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(text) => {
                setOtp4(text);
                if (text.length > 0) {
                  otp5Ref.focus();
                }
              }}
              value={otp4}
              ref={(ref) => {
                otp4Ref = ref;
              }}
              blurOnSubmit={false}
              onSubmitEditing={() => otp5Ref.focus()}
            />

            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(text) => {
                setOtp5(text);
                if (text.length > 0) {
                  otp6Ref.focus();
                }
              }}
              value={otp5}
              ref={(ref) => {
                otp5Ref = ref;
              }}
              blurOnSubmit={false}
              onSubmitEditing={() => otp6Ref.focus()}
            />

            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(text) => {
                setOtp6(text);
              }}
              value={otp6}
              ref={(ref) => {
                otp6Ref = ref;
              }}
              blurOnSubmit={false}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          </View>

          <View style={[styles.container]}>
            <View>
              <View style={{marginStart: 6}}>
                <RegularText
                  text="Enter the OTP code that was sent via mail."
                  fontSize={12}
                />
              </View>
              <Input
                id="email"
                placeholder="email"
                onInputChanged={inputChangedHandler}
                borderColor={colors.lightGrey}
                errorText={formState.inputValidities["email"]}
                initialValue={formState.inputValues.email}
              />
              <View>
                <View>
                  <Input
                    id="password"
                    placeholder="Password"
                    secureTextEntry={isSecureEntry}
                    borderColor={colors.lightGrey}
                    onInputChanged={inputChangedHandler}
                    initialValue={formState.inputValues.password}
                    errorText={formState.inputValidities["password"]}
                  />
                </View>
                <TouchableOpacity
                  style={styles.iconHide}
                  onPress={() => setIsSecureEntry((prev) => !prev)}
                >
                  <Feather
                    name={isSecureEntry ? "eye" : "eye-off"}
                    size={20}
                    color={colors.grey}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 0.25,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            {loading ? (
              <ActivityIndicator
                size="large"
                color={colors.pink}
                style={{ marginTop: 20 }}
              />
            ) : (
              <View style={styles.button}>
                <BigButton
                  text="Confirm new pass word"
                  disabled={!formState.formIsValid}
                  onPress={() => {
                    // submitHandler();
                  }}
                />
              </View>
            )}

            <View style={styles.separator}>
              <Text style={[MyStyles.text_sm, { fontFamily: "bold" }]}>
                Didn't have an account ?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text
                  style={[
                    MyStyles.text_sm,
                    { fontFamily: "bold", color: colors.pink },
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
    flex: 0.8,
    paddingHorizontal: "8%",
    alignSelf: "center",
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
    alignItems: "center",
  },
  checkbox: {
    width: 300,
    marginTop: "5%",
    flexDirection: "row",
  },
  textForgot: {
    marginTop: "5%",
    flexDirection: "row-reverse",
  },
  iconHide: {
    position: "absolute",
    marginTop: 35,
    marginStart: 260,
  },
  otpTextinputcontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    marginBottom: 20,
  },
  input: {
    height: 42,
    width: 42,
    marginHorizontal: 3,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.lightPink,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "regular",
  },
});

export default ForgotPasswordComplete;

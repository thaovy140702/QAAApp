import React, { useCallback, useReducer } from "react";
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
import colors from "../constants/colors";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducers";
import { SafeAreaView } from "react-native-safe-area-context";
import MyStyles from "../constants/MyStyles";
import { useDispatch } from "react-redux";

const { width, height } = Dimensions.get("window");

const initialState = {
  inputValues: {
    email: ""
  },
  inputValidities: {
    email: false
  },
  formIsValid: false,
};

const ForgotPassword = () => {


  const dispatch = useDispatch()
  const navigation = useNavigation();
  // const loading = useMessageAndErrorUser(navigation, dispatch, "Navigation")
  
  // const submitHandler = () => {
  //   console.log(formState.inputValues.email)
  //   dispatch(resetPassword(formState.inputValues.email))
  //   navigation.navigate("ForgotpasswordComplete")
  // }
  // const {message} = useSelector((state) => state.other)
  //   console.log(message)
    
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
              Forgot password !
            </Text>
            <Text style={[MyStyles.text_md, { marginStart: "8%", marginTop: 15 }]}>
              Please enter your email
            </Text>
          </View>

          <View style={[styles.container]}>
            <View style={{marginTop: 50}}>
              <Input
                id="email"
                placeholder="email"
                onInputChanged={inputChangedHandler}
                borderColor={colors.lightGrey}
                errorText={formState.inputValidities["email"]}
                initialValue={formState.inputValues.email}
              />
                    
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
                text="Send Email"
                disabled={!formState.formIsValid}
                onPress={() => {
                  submitHandler()
                }}
              />
            </View>}

            <View style={styles.separator}>
              {/* <BoldText text="Didn't have an account?" /> */}
              <Text style={[MyStyles.text_sm, { fontFamily: "bold" }]}>
                Already have an account ?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
                {/* <BoldText text=" Sign Up" color={colors.pink} /> */}
                <Text
                  style={[
                    MyStyles.text_sm,
                    { fontFamily: "bold", color: colors.pink },
                  ]}
                >
                  {" "}
                  Sign In
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
    alignContent: 'center'
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

export default ForgotPassword;

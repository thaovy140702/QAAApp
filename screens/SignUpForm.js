import React, { useCallback, useReducer } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import imageBackground from "../assets/images/test.png";
import BigButton from "../components/button/BigButton";
import Input from "../components/Input";
import RegularText from "../components/text/RegularText";
import colors from "../constants/colors";
import Checkbox from "expo-checkbox";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducers";
import { SafeAreaView } from "react-native-safe-area-context";
import MyStyles from "../constants/MyStyles";
import { useDispatch } from "react-redux";

const { width, height } = Dimensions.get("window");

const initialState = {
  inputValidities: {
    email: false,
    username: false,
    password: false,
  },
  formIsValid: false,
};

const SignUpForm = (props) => {

  const dispatch = useDispatch()
  // const {loading, message, error, isAuthenticated} = useSelector((state) => state.user)
  const loading = true
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);

  // check state of sign up form and validate input
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   if(message){
  //     console.log(message)
  //     Toast.show({
  //       type: 'success',
  //       text1: message
  //     });
  //     dispatch({
  //       type: "clearMessage"
  //     })
  //   }

  //   if(error){
  //     console.log(error)
  //     Toast.show({
  //       type: 'error',
  //       text1: error
  //     });
  //     dispatch({
  //       type: "clearError"
  //     });
  //   }

  // }, [error, message, dispatch]);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  // const submitHandler = () => {

  //   dispatch(register(formState.inputValues.email, formState.inputValues.username, formState.inputValues.password))
  //   console.log(formState.inputValues.email, formState.inputValues.username, formState.inputValues.password, isAuthenticated)

  // }
  

  return (
    <ImageBackground source={imageBackground} style={styles.image}>
      <SafeAreaView style={{ width, height}}>
        <KeyboardAvoidingView
          style={{ flex: 1}}
          behavior={Platform.OS === "ios" ? "height" : undefined}
          keyboardVerticalOffset={100}
        >
          <View style={{flex:.25}}>
          {/* <Title text="Hi!" /> */}
          <Text style={[MyStyles.text_lg,{marginStart:'8%', top:8}]}>Hi !</Text>
          <Text style={[MyStyles.text_md,{marginStart:'8%'}]}>Create new account</Text>
          </View>

          <View style={[styles.container]} >

            <View >
              <Input
                id="email"
                placeholder="Email"
                keyboardType="email-address"
                borderColor={colors.lightGrey}
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities["email"]}
              />

              <Input
                id="username"
                placeholder="Username"
                borderColor={colors.lightGrey}
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities["username"]}
              
              />

              <Input
                id="password"
                placeholder="Password"
                secureTextEntry={true}
                autoCapitalize="none"
                borderColor={colors.lightGrey}
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities["password"]}
                
              />
            </View>

            <View>
              <View style={[styles.checkbox]}>
                <Checkbox
                  color={colors.pink}
                  value={isChecked}
                  onValueChange={setChecked}
                />
                <RegularText text="  I agree to the " color={colors.grey} />
                <RegularText text="Terms of Service " color={colors.pink} />
                <RegularText text="and " color={colors.grey} />
              </View>

              <View style={{ marginStart: "9%" }}>
                <RegularText text="Privacy Policy" color={colors.pink} />
              </View>
            </View>
          </View>

          {/* submit button */}
          <View
            style={{
              // backgroundColor:'blue',
              flex: .25,
              justifyContent: 'center',
              alignSelf: "center",
            }}
          >
            { loading ?
           <ActivityIndicator size='large' color={colors.pink} style={{marginTop: 20}}/> :
            <View style={styles.button}>
              <BigButton text="Get Started" disabled={!formState.formIsValid} onPress={() => {
                  // submitHandler()
                }}/>
            </View>
          }

            <View style={styles.separator}>
              <Text style={[MyStyles.text_sm,{fontFamily:'bold'}]}>Already have an account ?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
                {/* <BoldText text=" Sign Up" color={colors.pink} /> */}
              <Text style={[MyStyles.text_sm,{fontFamily:'bold', color:colors.pink}]}> Sign In</Text>
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
    // backgroundColor: 'green',
    flex: .8,
    position:'relative',
    paddingHorizontal: "8%",
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    alignContent: 'center',
  },
  image: {
    flex: .23,
    // padding: 0,
    // margin: 0,
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
});

export default SignUpForm;

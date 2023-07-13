import React, { useCallback, useReducer, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  ImageBackground,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";
import imageBackground from "../assets/images/test.png";
import BigButton from "../components/button/BigButton";
import Input from "../components/Input";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducers";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors";
import MyStyles from "../constants/MyStyles";

const { width, height } = Dimensions.get("window");

const initialState = {
  inputValidities: {
    password: false,
    repeatPassword: false,
  },
  formIsValid: false,
};

const ChangePassword = () => {
  const navigation = useNavigation();

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result });
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
              Forgot password
            </Text>
            <Text style={[MyStyles.text_md, { marginStart: "8%" }]}>
              Please enter your email
            </Text>
          </View>

          <View style={styles.container}>
            <Input
              id="password"
              placeholder="New Password"
              secureTextEntry={true}
              autoCapitalize="none"
              borderColor={colors.lightGrey}
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities["password"]}
            />

            <Input
              id="repeatPassword"
              placeholder="Confirm Password"
              secureTextEntry={true}
              autoCapitalize="none"
              borderColor={colors.lightGrey}
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities["repeatPassword"]}
            />
          </View>

          <View
            style={{
              flex: 0.25,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <View style={styles.button}>
              <BigButton
                text="Change password"
                onPress={() => navigation.navigate("ChangePassword")}
                disabled={!formState.formIsValid}
              />
            </View>

            <View style={styles.separator}>
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
    flex: 0.7,
    // position: "relative",
    paddingHorizontal: "8%",
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
  },
  image: {
    flex: 0.25,
    padding: 0,
    margin: 0,
    height: 200,
    resizeMode: "cover",
  },
  separator: {
    marginTop: "3%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    // marginTop: '65%',
    alignItems: "center",
  },
});

export default ChangePassword;

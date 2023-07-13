import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import rectangleWelcome from "../assets/images/rectangleWelcome.png";
import welcome from "../assets/images/Heart-hello.png";
import RegularText from "../components/text/RegularText";
import Title from "../components/text/Title";
import SmallButton from "../components/button/SmallButton";
import colors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import MyStyles from "../constants/MyStyles";

const width = Dimensions.get('window')

const WelcomePage = () => {
  const navigation = useNavigation();

  return (
    <View style={[MyStyles.container,{backgroundColor:'white'}]}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 0.4, justifyContent:'center', alignSelf:'center' }}>
          <Image source={welcome} style={styles.image} />
          <Text style={styles.text}>Find your lover</Text>
        </View>

        <View style={{ flex: 0.6 }}>
          <ImageBackground source={rectangleWelcome} style={styles.recWelcome}>
            <View style={styles.welcomeBottom}>

                <Title text="Hello !" />
                <RegularText text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
                />

            <View style={{flex:1, justifyContent: 'flex-end', paddingBottom: '15%'}}>
              <View style={{ flexDirection: "row"}}>
                <SmallButton
                  text="SIGN IN"
                  backgroundColor={colors.pink}
                  color={colors.textColorWhite}
                  page="Signin"
                />
                <SmallButton
                  text="SIGN UP"
                  backgroundColor={"white"}
                  color={colors.textColorBlack}
                  page="Signup"
                />
              </View>
              </View>

            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  image: {
    // marginTop: '10%',
    // top: 10,
    // alignSelf: "center",
    width: 200,
    height: 200,
  },
  text: {
    // alignSelf: "center",
    marginTop: 5,
    fontSize: 16,
    fontFamily: "regularIrishGrover",
    letterSpacing: 7,
  },
  recWelcome: {
    // width: '100%',
    height: "100%",
    resizeMode: "stretch",
  },
  welcomeBottom: {
    flex:1,
    // backgroundColor:'red',
    // padding: "8%",
    paddingHorizontal: '5%',
    marginTop: "20%",
    alignItems: "center",
    alignSelf:'center'
  },
});

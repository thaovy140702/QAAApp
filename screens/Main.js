import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInForm from "./SignInForm";
import AnimTab1 from "./navigation/MainNavigation";
import WelcomePage from "./WelcomePage";
import SignUpForm from "./SignUpForm";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./ChangePassword";
import NotificationScreen from "./navigation/NotificationScreen";
import HomeScreen from "./navigation/HomeScreen";
import SearchScreen from "./navigation/SearchScreen";
import ChatListScreen from "./navigation/chat/ChatListScreen";
import ChatScreen from "./navigation/chat/ChatScreen";
import ProfileScreen from "./navigation/setting/ProfileScreen";
import EditProfileScreen from "./navigation/setting/EditProfileScreen";
import { useDispatch, useSelector } from "react-redux";
import ForgotPasswordComplete from "./ForgotPasswordComplete";
import CreateScreen from "./navigation/CreateScreen";
import FollowerScreen from "./navigation/setting/FollowerScreen";
import FollowingScreen from "./navigation/setting/FollowingScreen";
import TabViewExample from "./Test";
import UserScreen from "./navigation/UserScreen";
import PostScreen from "./navigation/PostScreen";
import MyPostScreen from "./navigation/MyPostScreen";
import EditPostScreen from "./navigation/EditPost";

const Main = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);
    console.log(isAuthenticated)
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarHidden: true,
          navigationBarHidden: true,
        }}
      >
        {/* <Stack.Screen name="Test" component={TabViewExample} /> */}
        { isAuthenticated && <Stack.Screen name="Navigation" component={AnimTab1} />}
        <Stack.Screen name="Signin" component={SignInForm} />
        {/* <Stack.Screen name="Signin" component={SignInForm} /> */}
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="Signup" component={SignUpForm} />

        <Stack.Screen name="Forgotpassword" component={ForgotPassword} />
        <Stack.Screen name="ForgotpasswordComplete" component={ForgotPasswordComplete}/>
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen}
        />
        
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Create" component={CreateScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen name="PostScreen" component={PostScreen} />
        <Stack.Screen name="MyPostScreen" component={MyPostScreen} />
        <Stack.Screen name="CreateScreen" component={CreateScreen} />
        <Stack.Screen name="EditPostScreen" component={EditPostScreen} />

       
        <Stack.Screen name="Chat" component={ChatListScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />

        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Follower" component={FollowerScreen} />
        <Stack.Screen name="Following" component={FollowingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({});

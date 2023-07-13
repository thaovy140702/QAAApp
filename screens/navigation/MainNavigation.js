import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Animatable from "react-native-animatable";
import React, { useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Feather } from "@expo/vector-icons";
import colors from "../../constants/colors";

import HomeScreen from "./HomeScreen";
import SearchScreen from "./SearchScreen";
import ChatListScreen from "./chat/ChatListScreen";
import ProfileScreen from "./setting/ProfileScreen";
import { useDispatch } from "react-redux";

const TabArr = [
  { route: "Home", label: "Home", component: HomeScreen, iconName: "home" },
  { route: "Discover", label: "Discover", component: SearchScreen, iconName: "search" },
  { route: "Chat", label: "My Chat", component: ChatListScreen, iconName: "message-square" },
  { route: "Profile", label: "My profile", component: ProfileScreen, iconName: "user" },
];

const Tab = createBottomTabNavigator();

const animate1 = {
  0: { scale: 0.5, translateY: 7 },
  0.92: { translateY: -34 },
  1: { scale: 1.2, translateY: -24 },
};
const animate2 = {
  0: { scale: 1.2, translateY: -24 },
  1: { scale: 1, translateY: 7 },
};

const circle1 = {
  0: { scale: 0 },
  0.3: { scale: 0.9 },
  0.5: { scale: 0.2 },
  0.8: { scale: 0.7 },
  1: { scale: 1 },
};
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } };

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}
    >
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View ref={circleRef} style={styles.circle} />
          <Feather
            name={item.iconName}
            size={24}
            color={focused ? "white" : colors.grey}
          />
        </View>

        <Animatable.Text ref={textRef} style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function AnimTab1() {
  const dispatch = useDispatch();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    height: 75,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: "white",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginStart: "5%",
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightPink,
    borderRadius: 25,
  },
  text: {
    fontSize: 9,
    textAlign: "center",
    color: colors.darkPink,
    fontFamily: "regular",
  },
});

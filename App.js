import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Toast from "react-native-toast-message";
import Main from "./screens/Main";
import ToastConfig from "./constants/ToastConfig";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// AsyncStorage.clear()

export default function App() {
  
  const [fontsLoaded] = useFonts({
    regularIrishGrover: require("./assets/fonts/IrishGrover-Regular.ttf"),
    black: require("./assets/fonts/Poppins-Black.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    semiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    thin: require("./assets/fonts/Poppins-Thin.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  let persistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
      <Toast config={ToastConfig} />
    </Provider>
  );
}

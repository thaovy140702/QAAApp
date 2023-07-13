import { BaseToast, ErrorToast } from "react-native-toast-message";

const ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 13,
        fontFamily: "regular",
        fontWeight: "400",
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "red" }}
      text1Style={{
        fontSize: 13,
        fontFamily: "regular",
        fontWeight: "400",
      }}
    />
  ),
};

export default ToastConfig;

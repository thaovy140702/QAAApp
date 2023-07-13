import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthReducer } from "../utils/reducers/AuthReducer";
import { PostReducer } from "../utils/reducers/PostReducer";
import { TopicReducer } from "../utils/reducers/TopicReducer";
import { UserReducer } from "../utils/reducers/UserReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ['auth']
};

let rootReducer = combineReducers({
  auth: AuthReducer,
  post: PostReducer,
  topic: TopicReducer,
  user: UserReducer
});

// export const store = configureStore({
//   reducer: {
//     user: UserReducer,
//     partner: PartnerReducer
//   }
// })

let persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
});

export const server = "http://192.168.43.227:3000/api";

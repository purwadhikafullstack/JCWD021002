import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducer/authReducer";
import storage from "redux-persist/lib/storage";
import addressReducer from "./reducer/addressReducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
} from 'redux-persist'

const persistConfig = {
  key: `root`,
  storage,
}
const persistedReducer = persistReducer(persistConfig, addressReducer)

export const store = configureStore({
  reducer: {
    AuthReducer: AuthReducer,
    addressReducer: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE],
      },
    }),
});

export const persistor = persistStore(store)
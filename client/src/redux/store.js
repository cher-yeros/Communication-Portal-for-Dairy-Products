import { configureStore, combineReducers } from "@reduxjs/toolkit";
import locationReducer from "./locationSlice";
import authReducer from "./authSlice";
import notificationReducer from "./notificationSlice";
import productReducer from "./productSlice";
import adminReducer from "./adminSlice";
import sellerReducer from "./sellerSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  location: locationReducer,
  auth: authReducer,
  notification: notificationReducer,
  product: productReducer,
  admin: adminReducer,
  seller: sellerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

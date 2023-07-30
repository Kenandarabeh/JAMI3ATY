import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"], // only persist the user slice
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        user: persistedReducer,
    },
  devTools:false
});

export const persistor = persistStore(store);

import { combineReducers } from "@reduxjs/toolkit";
import articlesReducer from "./Articles";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  articles: articlesReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["articles"],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

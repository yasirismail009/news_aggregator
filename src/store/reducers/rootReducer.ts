import { combineReducers } from "@reduxjs/toolkit";
import articlesReducer from "./Articles";

const rootReducer = combineReducers({
  articles: articlesReducer,
});

export default rootReducer;

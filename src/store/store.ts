import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./reducers/Articles";

const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { createSlice, PayloadAction, PayloadActionCreator } from "@reduxjs/toolkit";

interface ArticleState {
  articles: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ArticleState = {
  articles: [],
  loading: false,
  error: null,
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    fetchArticlesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchArticlesSuccess(state, action: PayloadAction<any[]>) {
      state.articles = action.payload;
      state.loading = false;
    },
    fetchArticlesFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchArticlesStart,
  fetchArticlesSuccess,
  fetchArticlesFailure,
} = articlesSlice.actions;

export default articlesSlice.reducer;

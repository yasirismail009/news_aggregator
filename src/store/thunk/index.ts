import { fetchArticlesFailure, fetchArticlesStart, fetchArticlesSuccess } from "../reducers/Articles";
import { AppDispatch } from "../store";
import axios from "axios";

const API_KEYS = {
  newsAPI: "6c4b523de1d044f1ac95fa95917a4a41",
  guardianAPI: "3708e86b-abaa-4519-b9a1-6356928d8b79",
  nytAPI: "gnJGYE8hIG4DAdd5uMVHAdjdkqrbRPBQ",
};

export const fetchArticles = (filters: any) => async (dispatch: AppDispatch) => {
  dispatch(fetchArticlesStart());

  try {
    console.log("filters",filters)
    const { keyword, source} = filters;
    let newsApiRes, guardianApiRes, nytApiRes;

    // Make API call based on selected source
    if (source === "newsAPI") {
      newsApiRes = await axios.get(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${API_KEYS.newsAPI}`);
    } else if (source === "guardianAPI") {
      guardianApiRes = await axios.get(`https://content.guardianapis.com/search?q=${keyword}&api-key=${API_KEYS.guardianAPI}`);
    } else if (source === "nytAPI") {
      nytApiRes = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&api-key=${API_KEYS.nytAPI}`);
    } else {
      // If no source selected, call all APIs
      const results = await Promise.all([
        axios.get(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${API_KEYS.newsAPI}`),
        axios.get(`https://content.guardianapis.com/search?q=${keyword}&api-key=${API_KEYS.guardianAPI}`),
        axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&api-key=${API_KEYS.nytAPI}`)
      ]);

      // Combine all responses if no source filter is applied
      newsApiRes = results[0];
      guardianApiRes = results[1];
      nytApiRes = results[2];
    }
   
    let combinedResults: any[] = [];
    if (source === "newsAPI") {
      combinedResults = newsApiRes ? newsApiRes.data.articles : [];
    } else if (source === "guardianAPI") {
      combinedResults = guardianApiRes ? guardianApiRes.data.response.results : [];
    } else if (source === "nytAPI") {
      combinedResults = nytApiRes ? nytApiRes.data.response.docs : [];
    } else {
      // If no specific source, merge all sources
      combinedResults = [
        ...(newsApiRes ? newsApiRes.data.articles : []),
        ...(guardianApiRes ? guardianApiRes.data.response.results : []),
        ...(nytApiRes ? nytApiRes.data.response.docs : [])
      ];
    }


    dispatch(fetchArticlesSuccess(combinedResults));
  } catch (error: any) {
    dispatch(fetchArticlesFailure(error.message));
  }
};

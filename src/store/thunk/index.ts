import { fetchArticlesFailure, fetchArticlesStart, fetchArticlesSuccess } from "../reducers/Articles";
import { AppDispatch } from "../store";
import axios from "axios";

const API_KEYS = {
  newsAPI: process.env.REACT_APP_NEWS_API,
  guardianAPI: process.env.REACT_APP_GUARDIAN_API,
  nytAPI: process.env.REACT_APP_NYT_API,
};

export const fetchArticles = (filters: any) => async (dispatch: AppDispatch) => {
  dispatch(fetchArticlesStart());

  try {
    console.log("filters",filters)
    const { keyword, source} = filters;
    let newsApiRes, guardianApiRes, nytApiRes;

     // Helper function to handle requests
     const safeApiCall = async (url: string) => {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error(`Error fetching from ${url}:`, error);
        return null; // Return null if the request fails
      }
    };

    // Make API call based on selected source
    if (source === "newsAPI") {
      newsApiRes = await safeApiCall(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${API_KEYS.newsAPI}`);
    } else if (source === "guardianAPI") {
      guardianApiRes = await safeApiCall(`https://content.guardianapis.com/search?q=${keyword}&api-key=${API_KEYS.guardianAPI}`);
    } else if (source === "nytAPI") {
      nytApiRes = await safeApiCall(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&api-key=${API_KEYS.nytAPI}`);
    } else {
      // If no source selected, call all APIs
      const results = await Promise.all([
        safeApiCall(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${API_KEYS.newsAPI}`),
        safeApiCall(`https://content.guardianapis.com/search?q=${keyword}&api-key=${API_KEYS.guardianAPI}`),
        safeApiCall(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&api-key=${API_KEYS.nytAPI}`)
      ]);

      newsApiRes = results[0];
      guardianApiRes = results[1];
      nytApiRes = results[2];
    }

    // Merge results, ignoring failed requests (null responses)
    let combinedResults: any[] = [];
    if (source === "newsAPI") {
      combinedResults = newsApiRes ? newsApiRes.articles : [];
    } else if (source === "guardianAPI") {
      combinedResults = guardianApiRes ? guardianApiRes.response.results : [];
    } else if (source === "nytAPI") {
      combinedResults = nytApiRes ? nytApiRes.response.docs : [];
    } else {
      // Merge results from all sources
      combinedResults = [
        ...(newsApiRes ? newsApiRes.articles : []),
        ...(guardianApiRes ? guardianApiRes.response.results : []),
        ...(nytApiRes ? nytApiRes.response.docs : [])
      ];
    }



    dispatch(fetchArticlesSuccess(combinedResults));
  } catch (error: any) {
    dispatch(fetchArticlesFailure(error.message));
  }
};

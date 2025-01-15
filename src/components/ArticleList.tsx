import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../store/store";
import { Box, Grid2, Typography } from "@mui/material";
import ArticleCard from "./ArticleCard";
import dayjs, { Dayjs } from "dayjs";

interface ArticleListProps {
  articles: any[]; // Replace with the proper article type if available
  loading: boolean;
  search: string;
  selectedSource: string;
  selectedCategory: string;
  selectedDate: Dayjs | null;
}
const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  loading,
  search,
  selectedSource,
  selectedCategory,
  selectedDate,
}) => {
  console.log(articles);
  const [filteredArticles, setFilteredArticles] = useState<any>([]);
  const parseDate = (date: string | undefined) => {
    if (!date) return null;
    return dayjs(date);
  };

  // Filter function
  const filterArticles = () => {
    let filtered = articles;

    // Date Filtering based on selectedDate
    if (selectedDate) {
      filtered = filtered.filter((article) => {
        const articleDate =
          parseDate(article.webPublicationDate) ||
          parseDate(article.pub_date) ||
          parseDate(article.publishedAt);

        // If no valid date, exclude the article
        if (!articleDate) return false;

        // Only include articles that match the selected date
        return articleDate.isAfter(selectedDate, "day");
      });
    }

    // Search Filtering based on the search term
    if (search) {
      filtered = filtered.filter(
        (article) =>
          (article.title &&
            article.title.toLowerCase().includes(search.toLowerCase())) ||
          (article.news_desk &&
            article.news_desk.toLowerCase().includes(search.toLowerCase())) ||
          (article.sectionName &&
            article.sectionName.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Update filtered articles state
    setFilteredArticles(filtered);
  };
  useEffect(() => {
    filterArticles();
  }, [articles, selectedDate, search]);
  return (
    <Box sx={{ padding: "20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "10px",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <Typography sx={{ fontSize: "12px" }}>
          Showing <b>{filteredArticles.length}</b> from{" "}
          <b>{selectedCategory ? 1 : 3} Sources</b>
        </Typography>
      </Box>
      <Grid2 container spacing={2}>
        {filteredArticles?.length > 0 ? (
          filteredArticles.map((article: any, index: number) => (
            <Grid2 key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <ArticleCard article={article} />
            </Grid2>
          ))
        ) : (
          <Box>
            <Typography>No News Available</Typography>
          </Box>
        )}
      </Grid2>
    </Box>
  );
};
const mapStateToProps = (state: RootState) => ({
  articles: state.articles.articles,
  loading: state.articles.loading,
});

// Connect to the Redux store
export default connect(mapStateToProps, null)(ArticleList);

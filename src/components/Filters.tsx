import React, { useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { connect } from "react-redux";
import { fetchArticles } from "../store/thunk";
import { AppDispatch } from "../store/store";

interface FilterPanelProps {
  fetchArticlesAction: (payload: { keyword: any; source: any }) => void;
  selectedDate: Dayjs | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedSource: string;
  setSelectedSource: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleResetFilters: () => void;
}
const FilterPanel: React.FC<FilterPanelProps> = ({
  fetchArticlesAction,
  selectedDate,
  setSelectedDate,
  selectedCategory,
  setSelectedCategory,
  selectedSource,
  setSelectedSource,
  search,
  setSearch,
  handleResetFilters,
}) => {
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value as string);
  };

  const handleSourceChange = (value: string) => {
    setSelectedSource(value as string);
  };

  useEffect(() => {
    const filters = {
      keyword: selectedCategory ? selectedCategory : null,
      source: selectedSource ? selectedSource : null,
    }; // Replace "technology" with the desired keyword.
    fetchArticlesAction(filters);
  }, [fetchArticlesAction, selectedCategory, selectedSource]);
  return (
    <Paper sx={{ padding: "15px" }}>
      <Grid2 container spacing={2} alignItems={"center"}>
        {/* Search Field */}
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            sx={{ width: "100%" }}
            label="Search"
            id="outlined-size-small"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
          {/* Date Picker */}
          <DatePicker
            sx={{ width: "100%" }}
            label="Select Date"
            value={selectedDate}
            slotProps={{ textField: { size: "small" } }}
            onChange={(newValue) => setSelectedDate(newValue)}
          />
        </Grid2>
        {/* Category Filter */}
        <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
          <FormControl sx={{ width: "100%" }} size="small">
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              label="Category"
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Technology">Technology</MenuItem>
              <MenuItem value="Sports">Sports</MenuItem>
              <MenuItem value="Politics">Politics</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        {/* Source Filter */}
        <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
          <FormControl sx={{ width: "100%" }} size="small">
            <InputLabel id="source-select-label">Source</InputLabel>
            <Select
              labelId="source-select-label"
              id="source-select"
              value={selectedSource}
              label="Source"
              onChange={(e) => handleSourceChange(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="newsAPI">News</MenuItem>
              <MenuItem value="nytAPI">NY Times</MenuItem>
              <MenuItem value="guardianAPI">The Guardian</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <Button
              sx={{ width: "100%" }}
              variant="contained"
              onClick={handleResetFilters}
            >
              Reset Filter
            </Button>
          </Box>
        </Grid2>
      </Grid2>
    </Paper>
  );
};

// Typing for mapDispatchToProps
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchArticlesAction: (payload: any) => dispatch(fetchArticles(payload)),
});

// Connect to the Redux store
export default connect(null, mapDispatchToProps)(FilterPanel);

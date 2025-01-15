import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ArticleList from './components/ArticleList';
import Filters from './components/Filters';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs';

function App() {
   const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedSource, setSelectedSource] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const handleResetFilters = () => {
      setSelectedDate(null);          // Reset selectedDate to null
      setSelectedCategory('');       // Reset selectedCategory to an empty string
      setSelectedSource('');         // Reset selectedSource to an empty string
      setSearch('');                 // Reset search to an empty string
    };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

    <div className="App">
       <Header />
      <main>
        {/* Routes or Components */}
        <Filters
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSource={selectedSource}
            setSelectedSource={setSelectedSource}
            search={search}
            setSearch={setSearch}
            handleResetFilters={handleResetFilters}
          />
          
          {/* Pass only state values to ArticleList */}
          <ArticleList 
            selectedDate={selectedDate} 
            selectedCategory={selectedCategory} 
            selectedSource={selectedSource} 
            search={search} 
          />
      </main>
      <Footer />
    </div>
    </LocalizationProvider>
  );
}

export default App;

import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log(`Searching for: ${query}`);
  };

  return (
    <div className="SearchBar">
      <input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;

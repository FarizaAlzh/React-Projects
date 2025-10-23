import React from 'react';
import '../styles/SearchBar.css';  

const SearchBar = ({ query, setQuery, clearSearch }) => {

  const handleInputChange = (e) => {
    setQuery(e.target.value);  
  };

  const handleClearClick = () => {
    clearSearch();  
  };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        value={query} 
        onChange={handleInputChange} 
        placeholder="Search products..." 
        className="search-input" 
      />
      <button 
        onClick={handleClearClick} 
        className="clear-button"
      >
        Clear
      </button>
    </div>
  );
};

export default SearchBar;

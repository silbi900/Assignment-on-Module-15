import React from 'react';
import { Camera, Sun, Moon, Search, Filter, Heart, Sparkles } from 'lucide-react';

export default function Header({
  searchTerm,
  setSearchTerm,
  selectedAlbum,
  setSelectedAlbum,
  albums,
  darkMode,
  setDarkMode,
  favoriteCount,
  showFavoritesOnly,
  setShowFavoritesOnly,
  totalPhotos
}) {
  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand / Logo */}
        <div className="brand-container">
          <div className="logo-badge">
            <Camera className="logo-icon" size={24} />
          </div>
          <div>
            <h1 className="brand-title">
              Pixel<span className="brand-highlight">Craft</span>
            </h1>
            <p className="brand-subtitle">
              <Sparkles size={12} className="inline-icon" /> Photo Gallery & Explorer
            </p>
          </div>
        </div>

        {/* Controls Container */}
        <div className="header-controls">
          {/* Search Box */}
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by title or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button 
                className="clear-search-btn" 
                onClick={() => setSearchTerm('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Album Filter Dropdown */}
          <div className="filter-box">
            <Filter size={16} className="filter-icon" />
            <select
              value={selectedAlbum}
              onChange={(e) => setSelectedAlbum(e.target.value)}
              className="album-select"
            >
              <option value="all">All Albums (100 Photos)</option>
              {albums.map((albumId) => (
                <option key={albumId} value={albumId}>
                  Album #{albumId}
                </option>
              ))}
            </select>
          </div>

          {/* Favorites Filter Toggle */}
          <button
            className={`fav-toggle-btn ${showFavoritesOnly ? 'active' : ''}`}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            title={showFavoritesOnly ? "Show All Photos" : "Show Favorited Photos"}
          >
            <Heart size={18} className={showFavoritesOnly ? 'fill-current' : ''} />
            <span className="fav-count-badge">{favoriteCount}</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            className="theme-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} className="sun-icon" /> : <Moon size={20} className="moon-icon" />}
          </button>
        </div>
      </div>
    </header>
  );
}

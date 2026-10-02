import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import PhotoGallery from './components/PhotoGallery';
import Footer from './components/Footer';
import PhotoModal from './components/PhotoModal';
import './App.css';

export default function App() {
  // State management
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI state & filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Dark Mode state (persisted in localStorage or default dark)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('pixelcraft_dark_mode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Favorites state (persisted in localStorage)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('pixelcraft_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Effect to toggle dark mode class on <html> / document body
  useEffect(() => {
    localStorage.setItem('pixelcraft_dark_mode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    }
  }, [darkMode]);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem('pixelcraft_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Fetch photos using native fetch() & useEffect()
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Native fetch() call to API as required
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        
        if (!response.ok) {
          throw new Error(`Failed to load photos. Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Requirement: API থেকে পাওয়া data-এর মধ্যে প্রথম 100টি photo UI-তে দেখাবেন।
        const first100Photos = data.slice(0, 100);
        setPhotos(first100Photos);
      } catch (err) {
        console.error('Error fetching photo data:', err);
        setError(err.message || 'Failed to fetch photos from API');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  // Toggle favorite photo by ID
  const handleToggleFavorite = (photoId) => {
    setFavorites((prev) =>
      prev.includes(photoId)
        ? prev.filter((id) => id !== photoId)
        : [...prev, photoId]
    );
  };

  // Extract unique album IDs for the filter dropdown
  const albums = useMemo(() => {
    const albumIds = new Set(photos.map((p) => p.albumId));
    return Array.from(albumIds).sort((a, b) => a - b);
  }, [photos]);

  // Filtered photos based on search term, selected album, and favorites toggle
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      // Album filter
      if (selectedAlbum !== 'all' && photo.albumId !== Number(selectedAlbum)) {
        return false;
      }

      // Favorites filter
      if (showFavoritesOnly && !favorites.includes(photo.id)) {
        return false;
      }

      // Search term filter (matches Title or Photo ID or Album ID)
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase().trim();
        const matchesTitle = photo.title.toLowerCase().includes(query);
        const matchesId = photo.id.toString() === query;
        const matchesAlbum = `album ${photo.albumId}`.includes(query);
        return matchesTitle || matchesId || matchesAlbum;
      }

      return true;
    });
  }, [photos, selectedAlbum, showFavoritesOnly, favorites, searchTerm]);

  // Reset all filters back to default
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedAlbum('all');
    setShowFavoritesOnly(false);
  };

  return (
    <div className="app-root">
      {/* Header Component */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedAlbum={selectedAlbum}
        setSelectedAlbum={setSelectedAlbum}
        albums={albums}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        favoriteCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
        totalPhotos={photos.length}
      />

      {/* Main Content Area */}
      <main className="main-content">
        <PhotoGallery
          photos={filteredPhotos}
          loading={loading}
          error={error}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectPhoto={setSelectedPhoto}
          onResetFilters={handleResetFilters}
          searchTerm={searchTerm}
          selectedAlbum={selectedAlbum}
          showFavoritesOnly={showFavoritesOnly}
        />
      </main>

      {/* Footer Component */}
      <Footer totalCount={photos.length} />

      {/* Modal for View Details feature */}
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          isFavorite={favorites.includes(selectedPhoto.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  );
}

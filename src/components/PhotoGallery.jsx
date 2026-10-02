import React from 'react';
import PhotoCard from './PhotoCard';
import { ImageOff, Loader2, RefreshCw } from 'lucide-react';

export default function PhotoGallery({
  photos,
  loading,
  error,
  favorites,
  onToggleFavorite,
  onSelectPhoto,
  onResetFilters,
  searchTerm,
  selectedAlbum,
  showFavoritesOnly
}) {
  if (loading) {
    return (
      <div className="gallery-status-container">
        <div className="loader-wrapper">
          <Loader2 className="spinner-icon" size={40} />
          <p className="loading-text">Fetching photos from API...</p>
        </div>
        <div className="photo-grid">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="skeleton-card">
              <div className="skeleton-img"></div>
              <div className="skeleton-text line-1"></div>
              <div className="skeleton-text line-2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gallery-status-container error-state">
        <div className="error-card">
          <h2>Oops! Failed to load photos</h2>
          <p>{error}</p>
          <button className="retry-btn" onClick={() => window.location.reload()}>
            <RefreshCw size={16} /> Retry Fetching
          </button>
        </div>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="gallery-status-container empty-state">
        <ImageOff size={56} className="empty-icon" />
        <h3>No photos found</h3>
        <p>
          {showFavoritesOnly
            ? "You haven't bookmarked any photos yet. Click the heart icon on any card to save favorites!"
            : "No photos match your current search or album filter criteria."}
        </p>
        {(searchTerm || selectedAlbum !== 'all' || showFavoritesOnly) && (
          <button className="reset-filter-btn" onClick={onResetFilters}>
            Reset Filters & View All 100 Photos
          </button>
        )}
      </div>
    );
  }

  return (
    <section className="photo-gallery-section">
      <div className="gallery-header">
        <div className="gallery-info">
          <h2>
            {showFavoritesOnly ? 'Favorite Photos' : 'Photo Collection'}
          </h2>
          <span className="photo-count-pill">
            Showing {photos.length} photo{photos.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* map() method used to render 100 photos */}
      <div className="photo-grid">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onSelectPhoto={onSelectPhoto}
            isFavorite={favorites.includes(photo.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}

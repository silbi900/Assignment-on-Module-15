import React, { useState } from 'react';
import { Heart, Maximize2, Hash, Folder } from 'lucide-react';

export default function PhotoCard({ photo, onSelectPhoto, isFavorite, onToggleFavorite }) {
  const { id, albumId, title, thumbnailUrl, url } = photo;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Fallback image using Unsplash / Picsum if via.placeholder is blocked/slow
  const displayImageSrc = imageError
    ? `https://picsum.photos/seed/photo-${id}/400/400`
    : thumbnailUrl || url;

  return (
    <div className="photo-card" onClick={() => onSelectPhoto(photo)}>
      <div className="card-image-wrapper">
        {!imageLoaded && !imageError && (
          <div className="card-skeleton"></div>
        )}
        <img
          src={displayImageSrc}
          alt={title}
          className={`card-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          loading="lazy"
        />

        {/* Overlay with Quick View button */}
        <div className="card-overlay">
          <button 
            className="quick-view-btn"
            onClick={(e) => {
              e.stopPropagation();
              onSelectPhoto(photo);
            }}
            title="View details"
          >
            <Maximize2 size={18} />
            <span>View</span>
          </button>
        </div>

        {/* Favorite Heart Button */}
        <button
          className={`favorite-btn ${isFavorite ? 'is-fav' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(id);
          }}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={18} className={isFavorite ? 'filled-heart' : ''} />
        </button>

        {/* Photo ID Badge on Image */}
        <div className="photo-id-badge">
          <Hash size={12} /> {id}
        </div>
      </div>

      <div className="card-content">
        <div className="card-meta">
          <span className="album-badge">
            <Folder size={12} /> Album #{albumId}
          </span>
          <span className="id-tag">ID: {id}</span>
        </div>

        <h3 className="card-title" title={title}>
          {title}
        </h3>
      </div>
    </div>
  );
}

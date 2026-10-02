import React, { useEffect, useState } from 'react';
import { X, Heart, ExternalLink, Copy, Check, Hash, Folder, Layers } from 'lucide-react';

export default function PhotoModal({ photo, onClose, isFavorite, onToggleFavorite }) {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!photo) return null;

  const { id, albumId, title, url } = photo;
  const fullImageSrc = imageError ? `https://picsum.photos/seed/photo-${id}/800/800` : url;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullImageSrc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-body">
          {/* Image Display */}
          <div className="modal-image-container">
            <img
              src={fullImageSrc}
              alt={title}
              className="modal-full-img"
              onError={() => setImageError(true)}
            />
          </div>

          {/* Details Panel */}
          <div className="modal-details font-sans">
            <div className="modal-header">
              <span className="modal-tag">
                <Folder size={14} /> Album #{albumId}
              </span>
              <span className="modal-tag id">
                <Hash size={14} /> Photo ID: {id}
              </span>
            </div>

            <h2 className="modal-title">{title}</h2>

            <div className="modal-info-grid">
              <div className="info-item">
                <span className="info-label">Photo ID</span>
                <span className="info-value">#{id}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Album ID</span>
                <span className="info-value">Album #{albumId}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Dimensions</span>
                <span className="info-value">600 &times; 600 px</span>
              </div>

              <div className="info-item">
                <span className="info-label">Format</span>
                <span className="info-value">PNG / JPG</span>
              </div>
            </div>

            {/* Actions */}
            <div className="modal-actions">
              <button
                className={`modal-fav-btn ${isFavorite ? 'active' : ''}`}
                onClick={() => onToggleFavorite(id)}
              >
                <Heart size={18} className={isFavorite ? 'filled-heart' : ''} />
                <span>{isFavorite ? 'Favorited' : 'Add to Favorites'}</span>
              </button>

              <button className="modal-copy-btn" onClick={handleCopyLink}>
                {copied ? <Check size={18} /> : <Copy size={18} />}
                <span>{copied ? 'Copied Link!' : 'Copy Link'}</span>
              </button>

              <a
                href={fullImageSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-external-btn"
              >
                <ExternalLink size={18} />
                <span>Open Full</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

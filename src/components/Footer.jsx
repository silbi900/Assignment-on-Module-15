import React from 'react';
import { Heart, ExternalLink, Code2, Sparkles } from 'lucide-react';

export default function Footer({ totalCount }) {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <Sparkles size={20} />
            <span>PixelCraft Gallery</span>
          </div>
          <p className="footer-desc">
            A responsive React + Vite photo gallery application fetching live data from JSONPlaceholder API.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Tech Stack</h4>
            <ul>
              <li><Code2 size={14} /> React 18</li>
              <li><Code2 size={14} /> Vite</li>
              <li><Code2 size={14} /> Native fetch() API</li>
              <li><Code2 size={14} /> CSS Grid & Flexbox</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>API Source</h4>
            <a
              href="https://jsonplaceholder.typicode.com/photos"
              target="_blank"
              rel="noopener noreferrer"
              className="api-link"
            >
              JSONPlaceholder Photos API <ExternalLink size={14} />
            </a>
            <span className="api-badge">Displaying top {totalCount || 100} items</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} PixelCraft Gallery. Built with <Heart size={14} className="heart-inline" /> for Ostad React Assignment.
        </p>
      </div>
    </footer>
  );
}

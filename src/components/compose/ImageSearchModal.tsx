"use client";

import React, { useState, useCallback } from "react";
import { Modal } from "../ui/modal";

// Unsplash API Configuration
const UNSPLASH_ACCESS_KEY = "bVKCJqrMrklBq1Cxr2Mk3x_4E5j4DOJ4TBGHRzed8Hs";

export interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
    thumb: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
}

interface ImageSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageSelect: (image: UnsplashImage) => void;
}

const ImageSearchModal: React.FC<ImageSearchModalProps> = ({
  isOpen,
  onClose,
  onImageSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UnsplashImage[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchImages = useCallback(async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setHasSearched(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          searchQuery
        )}&per_page=20&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Error searching images:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchImages();
    }
  };

  const handleImageClick = (image: UnsplashImage) => {
    onImageSelect(image);
    handleClose();
  };

  const handleClose = () => {
    setSearchQuery("");
    setSearchResults([]);
    setHasSearched(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-2xl w-full mx-4 p-0 overflow-hidden"
    >
      <div className="p-6">
        {/* Modal Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Search Images
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Find the perfect image for your post
          </p>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for images..."
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 pl-12 text-sm text-gray-700 dark:text-gray-300 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            onClick={searchImages}
            disabled={isSearching || !searchQuery.trim()}
            className="px-6 py-3 bg-brand-500 text-white rounded-xl font-medium hover:bg-brand-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Results Area */}
        <div className="min-h-[300px] max-h-[400px] overflow-y-auto custom-scrollbar">
          {/* Loading State */}
          {isSearching && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-500"></div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Searching images...
              </p>
            </div>
          )}

          {/* Results Grid */}
          {!isSearching && searchResults.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {searchResults.map((image) => (
                <button
                  key={image.id}
                  onClick={() => handleImageClick(image)}
                  className="relative group rounded-xl overflow-hidden aspect-square focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all hover:scale-[1.02]"
                >
                  <img
                    src={image.urls.small}
                    alt={image.alt_description || "Image"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-gray-800"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs text-white truncate">
                      by {image.user.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Empty State - No Search */}
          {!isSearching && !hasSearched && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Enter a search term to find images
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                Powered by Unsplash
              </p>
            </div>
          )}

          {/* Empty State - No Results */}
          {!isSearching && hasSearched && searchResults.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No images found for &quot;{searchQuery}&quot;
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                Try a different search term
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ImageSearchModal;

"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

const SEARCH_BAR_TITLE = "Search Posts....";

const SearchBar = ({ posts, onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      onSearchResults(posts);
      return;
    }

    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    onSearchResults(filtered);
  }, [searchQuery, posts, onSearchResults]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="relative mb-8 max-w-2xl mx-auto">
      <div className="relative">
        <Search
          className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${
            isFocused ? "text-blue-500" : "text-gray-400"
          } transition-colors`}
        />
        <Input
          type="text"
          placeholder={SEARCH_BAR_TITLE}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pl-10 pr-10 py-6 text-base rounded-full shadow-sm border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

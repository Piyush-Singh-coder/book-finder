import { useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import { Filter } from "lucide-react";

const HomePage = () => {
  const [query, setQuery] = useState(""); // stores the search input
  const [books, setBooks] = useState([]); // stores books fetched from API
  const [loading, setLoading] = useState(false); // loading state for spinner
  const [searched, setSearched] = useState(false); // whether user has searched
  const [limit, setLimit] = useState(25); // max number of results to show

   // Filters
  const [selectedLanguage, setSelectedLanguage] = useState("all"); // language filter
  const [sortBy, setSortBy] = useState("default"); // sorting filter

  // Fetches books from OpenLibrary API based on search query
  // Applies the limit of results selected by the user
  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await axios.get(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const results = res.data.docs.slice(0, limit); // limit 
      setBooks(results);
    } catch (err) {
      console.error("Error fetching books:", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };


  // Apply Filters to books
  // 1. Language filter
  // 2. Sorting (year ascending/descending or edition count)
  const filteredBooks = books
    .filter((book) => {
      if (selectedLanguage === "all") return true;
      return (
        book.language &&
        book.language.some((lang) => lang.toLowerCase() === selectedLanguage)
      );
    })
    .sort((a, b) => {
      if (sortBy === "yearAsc") {
        return (a.first_publish_year || 0) - (b.first_publish_year || 0);
      }
      if (sortBy === "yearDesc") {
        return (b.first_publish_year || 0) - (a.first_publish_year || 0);
      }
      if (sortBy === "editions") {
        return (b.edition_count || 0) - (a.edition_count || 0);
      }
      return 0; // default order
    });

  return (
    <div className="p-6 min-h-screen bg-base-200">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 max-w-3xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a book..."
          className="input input-bordered w-full"
        />
        <button
          onClick={handleSearch}
          className="btn btn-primary w-full md:w-auto"
        >
          Search
        </button>

        {/* Filter Dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-outline gap-2">
            <Filter size={18} /> Limit: {limit}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
          >
            {[10, 25, 50, 100].map((num) => (
              <li key={num}>
                <button onClick={() => setLimit(num)}>{num} Books</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      

      {/* Filters */}
      {books.length > 0 && (
        <div className="flex flex-wrap items-center gap-4 mb-6 max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filters:</span>
          </div>

          {/* Language Filter */}
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="select select-bordered select-sm"
          >
            <option value="all">All Languages</option>
            <option value="eng">English</option>
            <option value="hin">Hindi</option>
            <option value="fre">French</option>
            <option value="ger">German</option>
            <option value="spa">Spanish</option>
          </select>

          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered select-sm"
          >
            <option value="default">Default</option>
            <option value="yearAsc">Year ↑</option>
            <option value="yearDesc">Year ↓</option>
            <option value="editions">Most Editions</option>
          </select>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center mt-10">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {/* Books Grid */}
      {!loading && filteredBooks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book, idx) => (
            <BookCard
              key={idx}
              title={book.title}
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                  : "https://st2.depositphotos.com/2619903/6028/v/450/depositphotos_60287151-stock-illustration-no-image-signs-for-web.jpg"
              }
              author={book.author_name ? book.author_name.join(", ") : "N/A"}
              published={book.first_publish_year || "Unknown"}
              edition_count={book.edition_count}
              language={book.language}
            />
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && searched && filteredBooks.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          ❌ No books found for "<span className="font-semibold">{query}</span>"
        </div>
      )}

      {/* Initial Empty State */}
      {!loading && !searched && (
        <div className="text-center text-gray-500 mt-10">
          🔍 Start by searching for a book above.
        </div>
      )}
    </div>
  );
};

export default HomePage;

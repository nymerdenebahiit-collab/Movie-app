"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Moviecard from "../_components/Moviecard";
import Search from "../_icons/SearchIcon";

export default function MovieSearch() {
  const { query: initialQuery } = useParams();
  const [query, setQuery] = useState(initialQuery || "");
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const fetchMovies = async (searchValue) => {
    if (!searchValue.trim()) {
      setMovieData([]);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `/api/tmdb/search?q=${encodeURIComponent(searchValue)}`
      );

      const data = await res.json();
      setMovieData(data.results || []);
    } catch (err) {
      console.error("Кино татахад алдаа гарлаа:", err);
      setMovieData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchMovies(query);
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Хайлт оруулах хэсэг */}
      <div className="w-[379px] h-[36px] px-3 gap-[10px] rounded-lg border border-solid border-gray-200 flex items-center bg-white">
        <Search />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
          placeholder="Search movies..."
          className="flex-1 outline-none px-3 bg-transparent"
        />
      </div>

      {/* Хайлтын үр дүн (dropdown) */}
      {showResults && (
        <div className="absolute top-[42px] left-0 w-[488px] bg-white border border-gray-200 rounded-lg shadow-md z-50 max-h-[400px] overflow-y-auto">
          {loading ? (
            <p className="p-4 text-center text-gray-500">Уншиж байна...</p>
          ) : movieData.length > 0 ? (
            <>
              <button type="button" className="w-full text-left">
                {movieData.slice(0, 5).map((movie) => (
                  <div
                    onClick={() => router.push(`/movie/${movie.id}`)}
                    key={movie.id}
                    className="flex items-center justify-between p-3 border-b hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        className="w-[45px] h-[65px] rounded object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {movie.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          ⭐ {movie.vote_average?.toFixed(1) || "–"} /10
                        </p>
                        <p className="text-sm text-gray-400">
                          {movie.release_date?.split("-")[0] || "—"}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-sm text-blue-600 font-medium"
                    >
                      See more →
                    </button>
                  </div>
                ))}
              </button>

              <div className="p-3 text-center text-sm text-blue-600 font-medium cursor-pointer hover:bg-gray-50">
                See all results for “{query}”
              </div>
            </>
          ) : (
            <p className="p-4 text-center text-gray-500">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
}


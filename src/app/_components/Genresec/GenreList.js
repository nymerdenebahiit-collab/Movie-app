"use client";

import { Badge } from "@/components/ui/badge";
import ChevronRightIcon from "@/app/_icons/Chevronright";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function GenreList() {
  const [genreData, setGenreData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getGenres() {
      try {
        const res = await fetch(`${BASE_URL}/genre/movie/list?language=en-US`, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        });
        const data = await res.json();
        setGenreData(data.genres || []);
      } catch (err) {
        console.error("Жанрын мэдээлэл татахад алдаа гарлаа:", err);
      }
    }
    getGenres();
  }, []);

  const handleGenreClick = (genreName) => {
    const slug = genreName.toLowerCase().replace(/\s+/g, "-");
    router.push(`/movies/genre/${slug}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-[18px] font-semibold text-gray-900">Genres</h2>
        <p className="text-sm text-gray-500 mt-1">
          See lists of movies by genre
        </p>
      </div>

      {genreData.length === 0 ? (
        <p className="text-gray-400 text-xs">Loading...</p>
      ) : (
        <div className="flex flex-wrap w-[537px]   gap-4 rotate-0 opacity-100">
          {genreData.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreClick(genre.name)}
              className="focus:outline-none"
            >
              <Badge className="text-[rgba(9,9,11,1)] bg-white border border-gray-200 font-inter font-semibold text-[12px] leading-[16px] tracking-[0]">
                {genre.name}
                <ChevronRightIcon />
              </Badge>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

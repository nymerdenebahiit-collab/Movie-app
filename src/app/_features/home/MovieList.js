"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Moviecard from "@/app/_components/Moviecard";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export const MovieList = ({ type }) => {
  const router = useRouter();
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/${type}?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        const data = await res.json();
        setMovieData(data.results || []);
      } catch (err) {
        console.error("Error fetching:", err);
      }
    }
    getData();
  }, [type]);

  return (
    <div className="flex flex-col gap-8 px-20">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{type.toUpperCase()}</h2>
        {movieData.length > 10 && (
          <button
            onClick={() => router.push(`/movies/${type}`)}
            className="bg-gray-200 px-4 py-2 rounded-md"
          >
            See more
          </button>
        )}
      </div>

      <div className="grid grid-cols-5 gap-8">
        {movieData.slice(0, 10).map((movie) => (
          <Moviecard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            rating={movie.vote_average}
            image={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
};

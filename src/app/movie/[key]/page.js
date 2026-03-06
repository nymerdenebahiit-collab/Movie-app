"use client";
import StarIcon from "@/app/_icons/StarIcon";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/_features/Header";
import Footer from "@/app/_features/Footer";
import Trailer from "@/app/_components/Genresec/Trailer";
import { useRouter } from "next/navigation";
const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function MoviePage() {
  const router = useRouter();
  const { key } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [teamDetails, setTeamDetails] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const res = await fetch(`${BASE_URL}/movie/${key}?language=en-US`, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        });
        const data = await res.json();
        setMovieDetails(data);
      } catch (err) {
        console.error("Киноны мэдээлэл татахад алдаа гарлаа:", err);
      }
    }
    if (key) fetchMovieDetails();
  }, [key]);

  useEffect(() => {
    async function fetchTeamDetails() {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/${key}/credits?language=en-US`,
          {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
          }
        );
        const data = await res.json();
        setTeamDetails(data);
      } catch (err) {
        console.error("Багийн мэдээлэл татахад алдаа гарлаа:", err);
      }
    }
    if (key) fetchTeamDetails();
  }, [key]);

  useEffect(() => {
    async function fetchSimilarMovies() {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/${key}/similar?language=en-US&page=1`,
          {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
          }
        );
        const data = await res.json();
        setSimilarMovies(data.results || []);
      } catch (err) {
        console.error("Төстэй кинонууд татахад алдаа гарлаа:", err);
      }
    }
    if (key) fetchSimilarMovies();
  }, [key]);

  if (!movieDetails || !teamDetails) {
    return (
      <div className="flex items-center justify-center h-screen font-inter text-lg text-gray-700">
        Уншиж байна...
      </div>
    );
  }
  const img_url = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`;
  const poster_url = `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`;
  const releaseDate = movieDetails.release_date
    ? movieDetails.release_date.replaceAll("-", ".")
    : "—";

  const parentalRating = movieDetails.adult ? "R" : "PG";
  const runtime = `${Math.floor(movieDetails.runtime / 60)}h ${
    movieDetails.runtime % 60
  }m`;

  const stars =
    teamDetails.cast
      ?.sort((a, b) => b.popularity - a.popularity)
      .slice(0, 3)
      .map((m) => m.name)
      .join(" · ") || "—";

  const Writers =
    teamDetails.crew
      ?.sort((a, b) => b.popularity - a.popularity)
      .slice(0, 3)
      .map((m) => m.name)
      .join(" · ") || "—";

  const Directors =
    teamDetails.crew
      ?.filter((m) => m.job === "Director")
      .map((m) => m.name)
      .join(" · ") || "—";

  console.log("Similar Movies:", similarMovies);
  return (
    <div className="flex flex-col items-center gap-8">
      <Header />

      <div className="w-[1080px] h-[524px] gap-6">
        <div className="flex w-full h-[72px] justify-between pr-2">
          <div className="flex flex-col gap-1">
            <h1 className="font-inter font-extrabold text-[36px] leading-[40px] tracking-[-0.025em]">
              {movieDetails.title}
            </h1>
            <p className="font-inter text-[18px] leading-[28px]">
              {releaseDate} · {parentalRating} · {runtime}
            </p>
          </div>
        </div>

        <div className="flex w-full h-[428px] gap-8">
          <img
            src={poster_url}
            alt={movieDetails.title}
            className="w-[290px] h-[428px] rounded-lg object-cover"
          />
          <img
            src={img_url}
            alt={movieDetails.title}
            className="w-[760px] h-[428px] object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="w-[1080px] flex flex-col gap-2">
        <p className="font-inter text-[16px] leading-[24px] text-gray-800">
          {movieDetails.overview}
        </p>
        <div className="flex gap-2">
          <p className="font-inter font-bold w-[80px]">Director:</p>
          <p>{Directors}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-inter font-bold w-[80px]">Writers:</p>
          <p>{Writers}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-inter font-bold w-[80px]">Stars:</p>
          <p>{stars}</p>
        </div>
      </div>
      <div className="w-[1080px] flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h3 className="font-inter font-semibold text-[24px] text-blue-950 leading-[32px] tracking-[-0.025em]">
            More like this
          </h3>
          <button
            className="text-blue-950"
            onClick={() => router.push(`/movies/similar/${key}`)}
          >
            See all
          </button>
        </div>

        <button className="flex gap-8 overflow-x-auto">
          {similarMovies.length > 0 ? (
            similarMovies.slice(0, 5).map((movie) => (
              <div
                key={movie.id}
                className="flex-shrink-0 w-[190px]"
                onClick={() => router.push(`/movie/${movie.id}`)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-lg w-full h-[282px] object-cover"
                />
                <div className="flex flex-row items-center rotate-0 opacity-100 pt-1 pr-2 pb-1 pl-2">
                  <StarIcon />
                  {movie.vote_average.toFixed(1)}/10
                </div>
                <div className="w-[190px] items-start justify-start rotate-0 opacity-100 pt-1 pr-2 pb-1 pl-2 font-inter font-medium text-[16px] leading-[24px] text-gray-800">
                  {movie.title}
                </div>
              </div>
            ))
          ) : (
            <p>Төстэй кино олдсонгүй.</p>
          )}
        </button>
      </div>

      <Footer />
    </div>
  );
}

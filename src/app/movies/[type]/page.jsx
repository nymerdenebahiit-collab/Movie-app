"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Moviecard from "@/app/_components/Moviecard";
import Header from "@/app/_features/Header";
import Footer from "@/app/_features/Footer";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function MovieCategoryPage() {
  const { type } = useParams();
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const getMovies = async (page = 1) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${BASE_URL}/movie/${type}?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies(pageNumber);
  }, [type, pageNumber]);

  return (
    <>
      <Header />
      <div className="p-10">
        <h1 className="text-2xl font-semibold mb-5 capitalize">
          {type} movies
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">...LOADING...</p>
        ) : (
          <div className="grid grid-cols-5 gap-6">
            {movies.map((movie) => (
              <Moviecard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                rating={movie.vote_average}
                image={movie.poster_path}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center my-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
                disabled={pageNumber === 1}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;

              if (
                page === 1 ||
                page === totalPages ||
                (page >= pageNumber - 1 && page <= pageNumber + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === pageNumber}
                      onClick={() => setPageNumber(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (page === pageNumber - 2 || page === pageNumber + 2) {
                return <PaginationEllipsis key={`ellipsis-${page}`} />;
              }
              return null;
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setPageNumber((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={pageNumber === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <Footer />
    </>
  );
}

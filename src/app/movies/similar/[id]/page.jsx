"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/_features/Header";
import Footer from "@/app/_features/Footer";
import Moviecard from "@/app/_components/Moviecard";
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

export default function SimilarMoviesPage() {
  const { id } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSimilar() {
      if (!id) return;
      try {
        setLoading(true);
        const res = await fetch(
          `${BASE_URL}/movie/${id}/similar?language=en-US&page=${pageNumber}`,
          {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
          }
        );
        const data = await res.json();
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        console.error("Failed fetching similar movies:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSimilar();
  }, [id, pageNumber]);

  return (
    <>
      <Header />

      <div className="p-10">
        <h1 className="text-2xl font-semibold mb-6">Similar movies</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-5 gap-6">
            {movies.map((m) => (
              <Moviecard
                key={m.id}
                id={m.id}
                title={m.title}
                rating={m.vote_average}
                image={m.poster_path}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No similar movies found.</p>
        )}
      </div>

      {/* Pagination хэсэг */}
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

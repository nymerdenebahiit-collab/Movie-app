"use client";

import Header from "./_features/Header";
import Footer from "./_features/Footer";
import HeroSection from "./_features/home/HeroSection";
import { MovieList } from "./_features/home/MovieList";

export default function Home() {
  return (
    <div className="flex flex-col w-full gap-[52px] justify-center">
      {/* Container: center + max width */}
      <div className="w-full max-w-[1440px] mx-auto px-4">
        <Header />
        <HeroSection />

        <div className="flex flex-col w-full gap-[52px] relative">
          <MovieList type="popular" />
          <MovieList type="upcoming" />
          <MovieList type="top_rated" />
        </div>

        <Footer />
      </div>
    </div>
  );
}

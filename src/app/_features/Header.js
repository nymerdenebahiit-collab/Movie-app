"use client";

import Vector from "../_icons/VectorIcon";
import Search from "../_icons/SearchIcon";
import Moon from "../_icons/MoonIcon";
import Genre from "../_components/Genresec/Genre";
import React from "react";
import MovieSearch from "../_components/Moviesearch";

function Header() {
  return (
    <div className="w-[1440px] h-[59px] top-[80px] flex border-b border-gray-200 items-center justify-center bg-white">
      <div className="w-[1280px] h-[36px] max-w-[1280px] flex justify-between items-center">
        <button
          className="w-[92px] h-[20px] flex gap-2"
          onClick={() => (window.location.href = "/")}
        >
          <Vector />
        </button>

        <div className="w-[488px] h-[36px] flex gap-3 relative">
          <Genre />

          <MovieSearch />
        </div>

        <div className="w-[36px] h-[36px] flex justify-center items-center border rounded-md border-gray-200">
          <Moon />
        </div>
      </div>
    </div>
  );
}

export default Header;

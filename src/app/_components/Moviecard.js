"use client";
import StarIcon from "../_icons/StarIcon";
import { useRouter } from "next/navigation";

function Moviecard({ id, title, rating, image, className }) {
  const router = useRouter();

  const imageUrl = image
    ? `https://image.tmdb.org/t/p/original${image}`
    : "/placeholder.jpg";

  return (
    <button
      className={`${className}`}
      onClick={() => router.push(`/movie/${id}`)}
    >
      <div className="w-[229.73px] h-[340px]">
        <img
          src={imageUrl}
          alt={title}
          className="w-fit h-full object-cover rounded-t-lg"
        />
      </div>
      <div className="p-2">
        <div className="flex items-center gap-1">
          <StarIcon />
          <span className="text-sm">
            {rating ? rating.toFixed(1) : "N/A"}/10
          </span>
        </div>
        <p className="text-[18px] leading-[28px] justify-start w-max-[56px]">
          {title}
        </p>
      </div>
    </button>
  );
}

export default Moviecard;

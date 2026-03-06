import { useGenres } from "./useGenres";

export function MovieGenres({ genreIds }) {
  const genres = useGenres();

  return (
    <div className="flex flex-wrap gap-2">
      {genreIds.map((id) => (
        <span
          key={id}
          className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-sm"
        >
          {genres[id] || "Unknown"}
        </span>
      ))}
    </div>
  );
}

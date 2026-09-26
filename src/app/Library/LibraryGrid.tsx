"use client";
import { useState, useMemo } from "react";
import { Search, ChevronDown } from "lucide-react";
import LibraryCard from "./LibraryCard";
import { Workout } from "../types/type";

type SortOption = "duration" | "calories" | "rating";

const sortLabels: Record<SortOption, string> = {
  duration: "Sort By: Duration",
  calories: "Sort By: Calories",
  rating: "Sort By: Rating",
};

const LibraryGrid = ({ workouts }: { workouts: Workout[] }) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredAndSorted = useMemo(() => {
    let result = workouts;

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(query) ||
          w.muscleGroups.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    result = [...result].sort((a, b) => {
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "calories") return a.caloriesBurned - b.caloriesBurned;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

    return result;
  }, [workouts, search, sortBy]);

  return (
    <section id="library" className="container mx-auto px-4 sm:px-6 py-16">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white !font-oswald uppercase">
            The Library
          </h2>
          <p className="text-neutral-400 mt-1 !font-inter">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-64">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or tag"
              className="w-full bg-neutral-900 border rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#C3F901]"
              style={{ borderColor: "#1D1F27" }}
            />
          </div>

          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-full sm:w-auto border rounded-lg px-4 py-2 text-sm font-medium text-[#C3F901] whitespace-nowrap flex items-center justify-between gap-2"
              style={{ borderColor: "#C3F901" }}
            >
              {sortLabels[sortBy]}
              <ChevronDown
                size={16}
                className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                />
                <ul
                  className="absolute right-0 sm:right-auto left-0 sm:left-0 mt-2 w-full sm:w-48 bg-neutral-900 rounded-lg overflow-hidden z-20 shadow-lg"
                  style={{ border: "1px solid #1D1F27" }}
                >
                  {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                    <li key={option}>
                      <button
                        onClick={() => {
                          setSortBy(option);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm ${
                          sortBy === option
                            ? "bg-neutral-800 text-white font-semibold"
                            : "text-neutral-300 hover:bg-neutral-800"
                        }`}
                      >
                        {sortLabels[option]}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      {filteredAndSorted.length === 0 ? (
        <div
          className="rounded-xl border border-dashed py-16 px-4 text-center"
          style={{ borderColor: "#1D1F27" }}
        >
          <p className="text-neutral-400">No workouts match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSorted.map((workout) => (
            <LibraryCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
};

export default LibraryGrid;
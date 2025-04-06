// src/pages/Leaderboard.tsx
import { useState } from "react";

const categories = ["Top Reporters", "Most Upvotes", "Worst Offenders"];

export default function Leaderboard() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="text-white text-center mt-10">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

      <div className="inline-flex rounded-md shadow-sm mb-6" role="group">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm font-medium text-white border border-gray-700
              ${selectedCategory === category ? "bg-[hsl(294,100%,60%)]" : "bg-zinc-800 hover:bg-zinc-700"}
              first:rounded-l-lg last:rounded-r-lg`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="text-sm mt-4">
        <p>{selectedCategory} data coming soon...</p>
      </div>
    </div>
  );
}
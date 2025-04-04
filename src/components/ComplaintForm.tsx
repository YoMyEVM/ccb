// src/components/ComplaintForm.tsx
import React from "react";

export function ComplaintForm() {
  return (
    <form className="w-full flex flex-col space-y-3">
      {/* Subject */}
      <input
        type="text"
        placeholder="Subject"
        className="p-2 rounded bg-zinc-800 text-white border border-zinc-700"
      />

      {/* Accused Party */}
      <input
        type="text"
        placeholder="Accused Party"
        className="p-2 rounded bg-zinc-800 text-white border border-zinc-700"
      />

      {/* Contract Address */}
      <input
        type="text"
        placeholder="Contract Address (optional)"
        className="p-2 rounded bg-zinc-800 text-white border border-zinc-700"
      />

      {/* Chain */}
      <input
        type="text"
        placeholder="Chain (e.g. Ethereum, Polygon)"
        className="p-2 rounded bg-zinc-800 text-white border border-zinc-700"
      />

      {/* Evidence URL */}
      <input
        type="text"
        placeholder="Evidence URL (image, tweet, tx hash, etc.)"
        className="p-2 rounded bg-zinc-800 text-white border border-zinc-700"
      />

      {/* Description */}
      <textarea
        rows={4}
        placeholder="Describe the issue in detail"
        className="p-2 rounded bg-zinc-800 text-white border border-zinc-700"
      />

      {/* Image File Upload */}
      <input
        type="file"
        accept="image/*"
        className="p-2 rounded bg-zinc-800 text-white border border-zinc-700"
      />

    </form>
  );
}

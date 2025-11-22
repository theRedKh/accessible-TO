"use client"
import React from "react";

export default function Recommed({ image, title, description }) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      {image ? (
        <img src={image} alt={title || "Recommendation image"} className="w-full h-40 object-cover" />
      ) : (
        <div className="w-full h-40 bg-[#2596be] flex items-center justify-center">
          <span className="text-white font-semibold">Image coming soon</span>
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
        {description ? <p className="mt-2 text-sm text-zinc-600">{description}</p> : null}
      </div>
    </article>
  );
}

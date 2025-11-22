"use client"
import React, { useEffect, useState } from "react";

export default function Home() {
  const slides = [1, 2, 3];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white font-sans">
      <header className="w-full bg-white">
        <nav className="max-w-6xl mx-auto flex items-center gap-6 py-4 px-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-600 rounded flex items-center justify-center text-white font-bold">A</div>

            <div className="flex items-center rounded-full bg-zinc-100 p-1 shadow-sm cursor-pointer">
              <label htmlFor="search-text" className="sr-only">Search</label>
              <input
                id="search-text"
                placeholder="What are you looking for?"
                className="px-3 py-2 bg-transparent outline-none w-64 cursor-pointer"
              />

              <div className="border-l border-zinc-300 h-8 mx-2" />

              <label htmlFor="search-location" className="sr-only">Location</label>
              <input
                id="search-location"
                placeholder="Location"
                className="px-3 py-2 bg-transparent outline-none w-40 cursor-pointer"
              />

              <button className="ml-2 bg-blue-600 text-white px-3 py-2 rounded cursor-pointer">Search</button>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-6">
            <div className="hidden sm:flex gap-6">
              <a href="#" className="text-green-700 font-semibold cursor-pointer">label1</a>
              <a href="#" className="text-blue-600 font-semibold cursor-pointer">label2</a>
              <a href="#" className="text-green-700 font-semibold cursor-pointer">label3</a>
            </div>

            <div className="w-10 h-10 bg-zinc-200 rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-sm text-zinc-600">P</span>
            </div>
          </div>
        </nav>
      </header>

      <main className="w-full max-w-6xl mx-auto p-6">
        <section className="mb-12">
          <div className="relative">
            <div className="h-64 sm:h-80 md:h-96 w-full bg-white rounded-lg overflow-hidden border border-zinc-200 shadow">
              <div className="h-full flex items-center justify-center text-6xl font-bold text-zinc-400">
                {slides[index]}
              </div>
            </div>

            <button
              onClick={() => setIndex((index - 1 + slides.length) % slides.length)}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow cursor-pointer"
            >
              ‹
            </button>

            <button
              onClick={() => setIndex((index + 1) % slides.length)}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow cursor-pointer"
            >
              ›
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-3 h-3 rounded-full ${i === index ? "bg-blue-600" : "bg-zinc-300"} cursor-pointer`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white min-h-[400px]"></section>
      </main>
    </div>
  );
}

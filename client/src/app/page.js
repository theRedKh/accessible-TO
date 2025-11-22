"use client"
import React, { useEffect, useState } from "react";
import CategoryDropdown from "../components/CategoryDropdown";

export default function Home() {
  const slides = [1, 2, 3];
  const [index, setIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const categories = ["label1", "label2", "label3"];

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setMobileMenuOpen(false);
    }
    if (mobileMenuOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white font-sans">
      <header className="w-full bg-white">
        <nav className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 py-4 px-4 sm:px-6">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div
              tabIndex={0}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-[#73bb73] rounded flex items-center justify-center text-white font-bold hover:shadow-[0_6px_18px_rgba(115,187,115,0.2)] transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#73bb73] focus:ring-opacity-20 focus:rounded-[16px]"
            >
              A
            </div>

            {/* Profile moved left on md..2xl */}
            <div className="hidden md:flex 2xl:hidden items-center">
              <div className="w-9 h-9 bg-zinc-200 rounded-full flex items-center justify-center cursor-pointer mr-2">
                <span className="text-sm text-zinc-600">P</span>
              </div>
            </div>

            {/* Hamburger visible on mobile (below md / <768px) */}
            <button
              aria-controls="mobile-cats"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(true)}
              className="flex md:hidden items-center justify-center w-9 h-9 bg-zinc-100 rounded-md mr-2 cursor-pointer"
            >
              <svg className="w-5 h-5 text-zinc-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <div className="flex items-center rounded-full bg-zinc-100 p-1 shadow-sm w-full sm:w-auto">
              <label htmlFor="search-text" className="sr-only">Search</label>
              <input
                id="search-text"
                placeholder="What are you looking for?"
                className="px-3 py-2 bg-transparent outline-none w-full sm:w-64 md:w-48 lg:w-56 xl:w-64 text-zinc-600 placeholder:text-zinc-400 focus:text-black focus:ring-2 focus:ring-[#73bb73] focus:ring-opacity-20 focus:rounded-[16px] transition-all duration-200 ease-in-out"
              />

              <div className="hidden sm:block border-l border-zinc-300 h-8 mx-2" />

              <label htmlFor="search-location" className="sr-only">Location</label>
              <input
                id="search-location"
                placeholder="Location"
                className="px-3 py-2 bg-transparent outline-none w-28 sm:w-40 text-zinc-600 placeholder:text-zinc-400 focus:text-black focus:ring-2 focus:ring-[#73bb73] focus:ring-opacity-20 focus:rounded-[16px] transition-all duration-200 ease-in-out"
              />

              <button className="ml-2 bg-[#2596be] text-white px-4 py-2 rounded-[16px] cursor-pointer focus:ring-2 focus:ring-[#73bb73] focus:ring-opacity-20 focus:rounded-[16px] hover:shadow-[0_8px_24px_rgba(37,150,190,0.2)] transition-all duration-200 ease-in-out">Search</button>
            </div>
          </div>

          <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4">
            <div className="hidden sm:flex gap-6">
              {/* Category dropdown converted to component */}
              <CategoryDropdown items={["label1", "label2", "label3"]} />
            </div>

            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-zinc-200 rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-sm text-zinc-600">P</span>
            </div>
          </div>
        </nav>
        {/* Mobile full-screen categories overlay (slides up/down) */}
        <div
          id="mobile-cats"
          role="dialog"
          aria-modal="true"
          aria-hidden={!mobileMenuOpen}
          className={`fixed inset-0 z-50 bg-white overflow-auto p-6 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-y-0" : "translate-y-full"} ${mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#73bb73] rounded flex items-center justify-center text-white font-bold">A</div>
              <h2 className="text-lg font-semibold">Categories</h2>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="w-9 h-9 bg-zinc-100 rounded-md flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          <ul className="grid gap-3">
            {categories.map((c) => (
              <li key={c}>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-left px-4 py-3 rounded-md bg-zinc-50 hover:bg-zinc-100 text-lg"
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>
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

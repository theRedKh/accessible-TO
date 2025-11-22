"use client"
import React, { useEffect, useState } from "react";
import CategoryDropdown from "../components/CategoryDropdown";

export default function Home() {
  const slides = [1, 2, 3];
  const [index, setIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFullOpen, setSearchFullOpen] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const categories = ["Activites", "Events", "Health"];

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

  // show pill on screens narrower than 768px
  useEffect(() => {
    function onResize() {
      setIsNarrow(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    }
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // handle body scroll lock and escape for search overlay
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setSearchFullOpen(false);
    }
    if (searchFullOpen) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [searchFullOpen]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white font-sans text-zinc-800 items-center text-center">
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
              {!isNarrow ? (
                <>
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
                </>
              ) : (
                // Pill for very small screens: opens full-page search when clicked
                <button
                  onClick={() => {
                    setSearchFullOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 bg-white rounded-full shadow-sm text-zinc-600 flex items-center justify-between"
                >
                  <span className="truncate">What are you looking for?</span>
                  <svg className="w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </button>
              )}
            </div>

          </div>

          <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4">
            <div className="hidden xl:flex gap-6">
              {/* At large screens show three adjacent dropdowns */}
              <CategoryDropdown label={categories[0]} items={["element1", "element2", "element3"]} />
              <CategoryDropdown label={categories[1]} items={["element1", "element2", "element3"]} />
              <CategoryDropdown label={categories[2]} items={["element1", "element2", "element3"]} />
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
          onClick={(e) => { if (e.target === e.currentTarget) setMobileMenuOpen(false); }}
          className={`fixed inset-0 z-50 bg-white overflow-auto p-6 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-y-0" : "-translate-y-full"} ${mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#73bb73] rounded flex items-center justify-center text-white font-bold">A</div>
              <h2 className="text-lg font-semibold text-zinc-900">Categories</h2>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="w-9 h-9 bg-zinc-100 rounded-md flex items-center justify-center cursor-pointer text-black"
            >
              ✕
            </button>
          </div>

          <div className="grid gap-6">
            {categories.map((c) => (
              <section key={c} className="bg-white border border-zinc-100 rounded-md p-4">
                <h3 className="text-lg font-semibold text-[#73bb73] mb-3">{c}</h3>
                <div className="grid gap-2">
                  {['element1','element2','element3'].map((el) => (
                    <button
                      key={el}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-left px-3 py-2 rounded-md bg-transparent hover:bg-zinc-50 text-black"
                    >
                      {el}
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
        {/* Full-page search overlay for very narrow screens (<=430px) */}
        <div
          id="search-full"
          role="dialog"
          aria-modal="true"
          aria-hidden={!searchFullOpen}
          className={`fixed inset-0 z-60 bg-white p-4 transform transition-transform duration-300 ease-in-out ${searchFullOpen ? "translate-y-0" : "-translate-y-full"} ${searchFullOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setSearchFullOpen(false)}
              aria-label="Close search"
              className="w-9 h-9 bg-zinc-100 rounded-md flex items-center justify-center cursor-pointer text-black hover:bg-zinc-200 transition-colors"
            >
              ✕
            </button>

            <div className="flex-1">
              <label htmlFor="search-full-input" className="sr-only">Search</label>
              <input id="search-full-input" autoFocus placeholder="Search" className="w-full px-4 py-3 border border-zinc-200 rounded-md outline-none" />
            </div>
          </div>

          <div className="mt-2">
            {/* Search results area (empty for now) */}
            <div className="min-h-[300px] border border-dashed border-zinc-200 rounded-md p-4 text-zinc-500">Search results will appear here</div>
          </div>
        </div>
      </header>

      {/* Full-width carousel (edge-to-edge) with centered inner container */}
      <section className="mb-12 w-full">
        <div className="w-full">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
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
        </div>
      </section>

      <main className="w-full max-w-6xl mx-auto p-6">
        <section className="bg-white min-h-[400px]">
          <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
        </section>
      </main>
    </div>
  );
}

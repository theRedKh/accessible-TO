"use client"
import React, { useEffect, useState } from "react";
import CategoryDropdown from "../components/CategoryDropdown";
import NavBar from "../components/NavBar";
import Recommed from "../components/recommed";

export default function Home() {
  const slides = [
    "/images/Italy.jpg",
    "/images/farmermarket.jpg",
    "/images/christnbkm.jpg",
  ];
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
    <div className="flex min-h-screen min-h-1440-dvh w-full flex-col bg-white font-sans text-zinc-800">
      <header className="w-full bg-white">
        <NavBar
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          searchFullOpen={searchFullOpen}
          setSearchFullOpen={setSearchFullOpen}
          isNarrow={isNarrow}
          categories={categories}
        />
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

      {/* Full-bleed carousel focused on desktop (1440px). Images expand full page width. */}
      <section className="mb-12 w-full relative overflow-hidden">
        <div className="relative w-full">
          <div className="w-full h-[520px] bg-zinc-100 overflow-hidden">
            <img src={slides[index]} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </div>

          <button
            onClick={() => setIndex((index - 1 + slides.length) % slides.length)}
            aria-label="Previous"
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow cursor-pointer z-20"
          >
            ‹
          </button>

          <button
            onClick={() => setIndex((index + 1) % slides.length)}
            aria-label="Next"
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow cursor-pointer z-20"
          >
            ›
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
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

      <main className="w-full max-w-6xl mx-auto p-6">
        <section className="bg-white min-h-[400px]">
          <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            <Recommed
              image="/images/christnbkm.jpg"
              title="Distillery District"
              description="A Christmas tree lighting ceremony and seasonal festivities in the historic Distillery District."
            />

            <Recommed
              image="/images/farmermarket.jpg"
              title="Farmers Market"
              description="Local vendors, fresh produce and community stalls every weekend."
            />

            <Recommed
              image="/images/Italy.jpg"
              title="Italian Festival"
              description="An annual celebration of Italian culture with food, music and performances."
            />

            <Recommed
              image={null}
              title="this is another event coming soon"
              description=""
            />
          </div>
        </section>
      </main>
    </div>
  );
}

"use client"
import React from "react";
import CategoryDropdown from "./CategoryDropdown";

export default function NavBar({ mobileMenuOpen, setMobileMenuOpen, searchFullOpen, setSearchFullOpen, isNarrow, categories }) {
  return (
    <nav className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3 sm:gap-6 py-4 px-4 sm:px-6">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <a href="/" aria-label="AccessibleTOgether home" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#73bb73] rounded flex items-center justify-center text-white font-bold hover:shadow-[0_6px_18px_rgba(115,187,115,0.2)] transition-all duration-200 ease-in-out group-focus:ring-2 group-focus:ring-[#73bb73] group-focus:ring-opacity-20">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect width="24" height="24" rx="4" fill="#73bb73" />
              <text x="50%" y="54%" textAnchor="middle" fontWeight="700" fontSize="12" fill="white">A</text>
            </svg>
          </div>

          <span className="hidden sm:inline-block text-lg font-semibold text-zinc-900 group-hover:underline">AccessibleTOgether</span>
        </a>

        <div className="hidden md:flex 2xl:hidden items-center">
          <div className="w-9 h-9 bg-zinc-200 rounded-full flex items-center justify-center cursor-pointer mr-2">
            <span className="text-sm text-zinc-600">P</span>
          </div>
        </div>

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
          <CategoryDropdown label={categories[0]} items={["element1", "element2", "element3"]} />
          <CategoryDropdown label={categories[1]} items={["element1", "element2", "element3"]} />
          <CategoryDropdown label={categories[2]} items={["element1", "element2", "element3"]} />
        </div>

        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-zinc-200 rounded-full flex items-center justify-center cursor-pointer">
          <span className="text-sm text-zinc-600">P</span>
        </div>
      </div>
    </nav>
  );
}

"use client"
import React, { useState, useRef, useEffect } from "react";

export default function CategoryDropdown({ items = ["label1", "label2", "label3"] }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selected, setSelected] = useState(items[0] || null);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  useEffect(() => {
    if (!open) setActiveIndex(-1);
  }, [open]);

  function onKeyDown(e) {
    if (!open && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpen(true);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, items.length - 1));
      setOpen(true);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
      setOpen(true);
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      selectIndex(activeIndex);
    }
  }

  function selectIndex(i) {
    setSelected(items[i]);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        className="inline-flex items-center gap-2 text-green-700 font-semibold px-3 py-1.5 rounded-md hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#73bb73] focus:ring-opacity-20 transition-all duration-150"
      >
        {selected}
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div role="menu" aria-label="Categories" className="absolute right-0 mt-2 w-40 bg-white border border-zinc-200 rounded-md shadow-md z-10">
          <ul className="p-1">
            {items.map((it, i) => (
              <li key={it}>
                <button
                  role="menuitem"
                  onClick={() => selectIndex(i)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`w-full text-left px-3 py-2 rounded-md ${i === activeIndex ? "bg-zinc-100" : "hover:bg-zinc-50"}`}
                >
                  {it}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

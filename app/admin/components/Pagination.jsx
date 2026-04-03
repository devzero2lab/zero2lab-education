"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const delta = 1; // pages around current

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      pages.push(i);
    } else if (
      i === currentPage - delta - 1 ||
      i === currentPage + delta + 1
    ) {
      pages.push("...");
    }
  }

  // Deduplicate consecutive "..."
  const deduped = pages.filter(
    (p, i) => !(p === "..." && pages[i - 1] === "...")
  );

  return (
    <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
      <p className="text-xs text-slate-400">
        Page <span className="font-semibold text-slate-600">{currentPage}</span>{" "}
        of <span className="font-semibold text-slate-600">{totalPages}</span>
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>
        {deduped.map((page, i) =>
          page === "..." ? (
            <span key={`dots-${i}`} className="px-1 text-slate-400 text-sm select-none">
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-w-[30px] h-[30px] rounded-lg text-xs font-semibold transition-colors ${
                page === currentPage
                  ? "bg-[#090D24] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;

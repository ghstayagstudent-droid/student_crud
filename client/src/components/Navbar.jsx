import React from 'react';

export default function Navbar({ onRefresh, loading, totalCount }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
              Student Management System
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Full-stack CRUD powered by Vite React & Spring Boot
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs sm:text-sm font-medium bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200">
            Total Students: <span className="font-bold text-indigo-600">{totalCount}</span>
          </div>

          <button
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 active:bg-slate-100 transition shadow-sm disabled:opacity-50 cursor-pointer"
            title="Refresh list from backend"
          >
            {loading ? (
              <span className="flex items-center gap-1.5">
                <svg className="animate-spin h-4 w-4 text-slate-500" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Syncing...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Refresh
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

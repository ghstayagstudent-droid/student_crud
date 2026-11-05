import React from 'react';

export default function AlertBanner({ alert, onDismiss }) {
  if (!alert) return null;

  const isSuccess = alert.type === 'success';

  return (
    <div
      className={`p-4 rounded-xl border flex items-start justify-between gap-3 shadow-sm transition-all duration-200 ${
        isSuccess
          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
          : 'bg-rose-50 border-rose-200 text-rose-800'
      }`}
    >
      <div className="flex items-center gap-2.5">
        {isSuccess ? (
          <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        ) : (
          <svg className="w-5 h-5 text-rose-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        )}
        <p className="text-sm font-medium">{alert.message}</p>
      </div>

      <button
        onClick={onDismiss}
        className={`p-1 rounded-md transition cursor-pointer ${
          isSuccess
            ? 'hover:bg-emerald-100 text-emerald-700'
            : 'hover:bg-rose-100 text-rose-700'
        }`}
        aria-label="Dismiss alert"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  );
}

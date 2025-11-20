import React from "react";

export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent ${className}`}
      {...props}
    />
  );
}

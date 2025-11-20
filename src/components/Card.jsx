import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-card shadow-card p-5 md:p-6 text-slate-900 dark:text-slate-900 ${className}`}>
      {children}
    </div>
  );
}

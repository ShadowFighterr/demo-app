import React from "react";

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-1";

  const variants = {
    primary:
      "bg-brand text-white hover:bg-brand/90 shadow-md focus:ring-brand",
    secondary:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-300",
  };

  const classes = `${base} ${variants[variant] || variants.primary} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

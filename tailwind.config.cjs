/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#23A6F0",
        accent: "#40BB15",
        text: "#252B42",
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        card: "0 10px 30px rgba(15,23,42,0.08)",
      },
    },
  },
  plugins: [],
};

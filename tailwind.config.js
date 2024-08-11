/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        customGray: "#f9f8f8",
      },
      colors: {
        customGray1: "#969796",
      },
    },
  },
  plugins: [],
};

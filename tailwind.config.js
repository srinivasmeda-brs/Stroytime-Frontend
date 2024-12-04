/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blueBlack: "#1e293b", // Replace with your desired color code
        active: "#334155",   // Replace with your desired color code
      },
    },
  },
  plugins: [],
};

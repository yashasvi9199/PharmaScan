/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0f766e", // Teal 700
          light: "#14b8a6",   // Teal 500
          dark: "#0d9488",    // Teal 600
        },
        secondary: {
          DEFAULT: "#d97706", // Amber 600
          light: "#f59e0b",   // Amber 500
        },
        accent: {
          DEFAULT: "#0ea5e9", // Sky 500
        },
        surface: "#f0fdfa",   // Teal 50
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
};

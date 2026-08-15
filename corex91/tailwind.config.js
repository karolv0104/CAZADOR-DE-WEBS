/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B2E4F",
        cyan: "#3FC1C9",
        surface: "#F4F6F8",
        ink: "#1F2933",
        muted: "#6B7785",
        faint: "#8A97A3",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#4166FB",
          secondary: "#B668FA",
          accent: "#FF7F2F",
          cardBg: "#F8FAFC",
          stroke: "#E2E8F0",
        },
      },
    },
  },
  plugins: [],
};

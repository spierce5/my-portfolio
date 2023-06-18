/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      opt1: "#e88873",
      opt2: "#a37774",
      opt3: "#5c6d70",
      opt4: "#484a47",
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [require("@tailwindcss/typography")],
};

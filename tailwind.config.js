/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#024751",
        secondary: "#00D47E",
      },
    },
  },
  plugins: [],
};

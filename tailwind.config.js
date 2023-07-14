/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/*.tsx",
    "./src/*/*.tsx",
    "./src/*/*/*.tsx",
    "./src/*/*/*/*.tsx",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {},
  },
  plugins: [],
  darkMode: "class",
};

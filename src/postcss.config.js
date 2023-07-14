const purgecss = require("@fullhuman/postcss-purgecss")({
  content: [
    "./src/*.tsx",
    "./src/*/*.tsx",
    "./src/*/*/*.tsx",
    "./src/*/*/*/*.tsx",
  ],
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  plugins: [require("tailwindcss"), require("autoprefixer"), purgecss],
};

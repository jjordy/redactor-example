const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "pages/**/*.tsx",
    "shared/**/*.tsx",
    "hooks/**/*.tsx",
    "utils/**/*.tsx",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        sky: colors.sky,
        teal: colors.teal,
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dark-gray": "#27272A",
        "darker-gray": "#18181B",
      },
    },
  },
};

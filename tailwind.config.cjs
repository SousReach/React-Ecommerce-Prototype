/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#EB4C4C",   // Primary red
          800: "#FF7070",   // Hover coral
          300: "#FFA6A6",   // Soft pink accent
          50: "#FFEDC7",   // Cream background
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        xl: "14px",
      },
    },
  },
  plugins: [],
};

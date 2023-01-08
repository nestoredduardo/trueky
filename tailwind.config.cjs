/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#e64980",
          50: "#fdf2f6",
          100: "#fbe8f0",
          200: "#fad0e2",
          300: "#f6abc9",
          400: "#f076a4",
          500: "#e64980",
          600: "#d52d60",
          700: "#b91d48",
          800: "#991b3c",
          900: "#7f1c36",
        },
        secondary: {
          DEFAULT: "#fd7e14",
          50: "#fff8ed",
          100: "#ffefd4",
          200: "#ffdba9",
          300: "#ffc072",
          400: "#fe9b39",
          500: "#fd7e14",
          600: "#ee6108",
          700: "#c54909",
          800: "#9c3910",
          900: "#7e3110",
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

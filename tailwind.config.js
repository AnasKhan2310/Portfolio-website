/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Cera CY"', '"Cera CY Bold"', 'sans-serif'],
        body: ['"Cera CY"', 'sans-serif'],
        sans: ['"Cera CY"', 'sans-serif'],
        cera: ['"Cera CY"', '"Cera CY Bold"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

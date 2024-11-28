/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backg: "#EBEEF3",
        primary: "#334155",
        mygreen: "#389E0F",
        myred: "#F1B3B3",
        myredbg: "#FFF0F0",
        mygreenbg: "#F5FFED",
      },
    },
    plugins: [],
  },
};

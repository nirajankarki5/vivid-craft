/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Poppins"],
      },

      // For animation. Use "animate-fadeinup" in classname
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        "fade-in-down": {
          "0%": {
            opacity: 0,
            transform: "translate3d(0, -80%, 0)",
          },
          "100%": {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: 0,
            transform: "translate3d(0, 50%, 0)",
          },
          "100%": {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          },
        },
      },

      animation: {
        fadein: "fade-in 1s ease-in-out 0.25s 1",
        fadeindown: "fade-in-down 1s ease-in 0.25s 1",
        fadeinup: "fade-in-up 1s ease-in-out 0.25s 1",
      },
    },
  },
  plugins: [],
};

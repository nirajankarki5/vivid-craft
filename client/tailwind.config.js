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
        // For Loading component
        grow: {
          "0%, 100%": { transform: "scaleY(0.3)" },
          "50%": { transform: "scaleY(1)" },
        },

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
        grow1: "grow 1s ease-in-out -0.45s infinite",
        grow2: "grow 1s ease-in-out -0.3s infinite",
        grow3: "grow 1s ease-in-out -0.15s infinite",
        grow4: "grow 1s ease-in-out 0s infinite",

        fadein: "fade-in 0.5s ease-in-out 0.25s 1",
        fadeindown: "fade-in-down 0.75s ease-in 0.25s 1",
        fadeinup: "fade-in-up 0.75s ease-in-out 0.25s 1",
      },
    },
  },
  plugins: [],
};

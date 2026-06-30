export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glass: "0 28px 80px rgba(15, 76, 129, 0.18)",
      },
      colors: {
        brand: "#0F4C81",
        gold: "#D4AF37",
        accent: "#5DADE2",
        navy: "#09152d",
      },
      backgroundImage: {
        "stars-glow": "radial-gradient(circle at 20% 20%, rgba(212, 175, 55, 0.18), transparent 30%), radial-gradient(circle at 80% 32%, rgba(93, 173, 226, 0.12), transparent 22%), radial-gradient(circle at 50% 80%, rgba(255, 255, 255, 0.08), transparent 35%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

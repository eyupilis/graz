import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "576px",
        md: "768px",
        lg: "1200px",
        xl: "1400px",
      },
    },
    extend: {
      colors: {
        background: "#FFFFFF",
        secondary: "#F5F5F5",
        text: "#1A1F2C",
        accent: "#9b87f5",
        vibrant: {
          purple: "#9b87f5", // Primary purple from logo
          pink: "#D946EF",   // Magenta pink
          secondary: "#7E69AB", // Secondary purple
          tertiary: "#6E59A5", // Tertiary purple
        },
        soft: {
          purple: "#D6BCFA", // Light purple
          pink: "#FFDEE2",   // Soft pink
          peach: "#FDE1D3",
          blue: "#E5DEFF",   // Soft purple
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "zoom-in": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-down": "slide-down 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "fade-in": "fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "zoom-in": "zoom-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        float: "float 3s ease-in-out infinite",
        pulse: "pulse 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-diagonal': 'linear-gradient(45deg, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

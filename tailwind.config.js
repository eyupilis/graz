/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        // Ana renkler
        primary: {
          DEFAULT: '#8B5CF6', // Mor
          light: '#A78BFA',
          dark: '#7C3AED',
        },
        secondary: {
          DEFAULT: '#EC4899', // Pembe
          light: '#F472B6',
          dark: '#DB2777',
        },
        accent: {
          DEFAULT: '#06B6D4', // Turkuaz
          light: '#22D3EE',
          dark: '#0891B2',
        },
        // Nötr renkler
        background: {
          DEFAULT: '#0F172A', // Koyu lacivert
          light: '#1E293B',
          dark: '#020617',
        },
        surface: {
          DEFAULT: '#1E293B',
          light: '#334155',
          dark: '#0F172A',
        },
        // Metin renkleri
        text: {
          primary: '#F8FAFC',
          secondary: '#CBD5E1',
          muted: '#64748B',
        },
        // Gradyan renkler
        gradient: {
          start: '#8B5CF6',
          middle: '#EC4899',
          end: '#06B6D4',
        },
        // Durum renkleri
        success: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#F87171',
          dark: '#DC2626',
        },
        info: {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
          dark: '#2563EB',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'scroll': 'scroll 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px #8B5CF6' },
          'to': { boxShadow: '0 0 20px #EC4899, 0 0 30px #06B6D4' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(to right, var(--primary), var(--secondary))',
        'gradient-accent': 'linear-gradient(to right, var(--accent), var(--primary))',
      },
      boxShadow: {
        'glow-primary': '0 0 15px rgba(139, 92, 246, 0.5)',
        'glow-secondary': '0 0 15px rgba(236, 72, 153, 0.5)',
        'glow-accent': '0 0 15px rgba(6, 182, 212, 0.5)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 
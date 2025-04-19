/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#1a1a1a',
        container: '#2a2a2a',
        primary: '#ff69b4',
        'primary-hover': '#ff1493',
        accent: '#ff8c00',
        'text-primary': '#ffffff',
        'text-secondary': '#cccccc',
        error: '#ff4040',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        custom: '0 4px 12px rgba(255, 105, 180, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #ff69b4 0%, #ff8c00 100%)',
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};
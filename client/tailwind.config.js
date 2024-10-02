/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 20s linear infinite',
       
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        
      },
      colors:{
        'mine-shaft': {
        '50': '#f6f6f6',
        '100': '#e7e7e7',
        '200': '#d1d1d1',
        '300': '#b0b0b0',
        '400': '#888888',
        '500': '#6d6d6d',
        '600': '#5d5d5d',
        '700': '#4f4f4f',
        '800': '#454545',
        '900': '#3d3d3d',
        '950': '#2d2d2d',
    },
    
    'cyan-/-aqua': {
        '50': '#ecfffe',
        '100': '#cefffd',
        '200': '#a3fefd',
        '300': '#46fbfb',
        '400': '#1eeff2',
        '500': '#02d2d8',
        '600': '#05a7b5',
        '700': '#0c8592',
        '800': '#136b77',
        '900': '#155864',
        '950': '#073a45',
    },
    
      }
    },
  },
  plugins: [],
}


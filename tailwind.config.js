/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      // Colores oficiales de la Fundación PRO-21
      colors: {
        primary: {
          DEFAULT: '#ffc500',   // amarillo — identidad de la fundación
          50:  '#fffbeb',
          100: '#fff3c4',
          200: '#ffe680',
          500: '#ffc500',
          600: '#e6b000',
          700: '#cc9c00',
          900: '#7a5e00',
        },
        secondary: {
          DEFAULT: '#229cc2',   // azul — confianza, profesionalismo
          50:  '#e8f7fb',
          100: '#bde9f5',
          500: '#229cc2',
          600: '#1b85a6',
          700: '#166e8a',
        },
        accent: {
          DEFAULT: '#8c3cbd',   // morado — creatividad, inclusión
          50:  '#f5edfb',
          100: '#e6cff5',
          500: '#8c3cbd',
          600: '#7a33a6',
          700: '#66298f',
        },
      },

      // Tipografía — TODO: confirmar con la fundación
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },

      // Contenedor centralizado
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
      },

      // Animaciones suaves para componentes
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },

  plugins: [],
}

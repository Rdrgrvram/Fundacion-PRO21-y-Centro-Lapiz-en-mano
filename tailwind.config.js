/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      // Colores del proyecto — provisionales, confirmar con la fundación
      colors: {
        primary: {
          DEFAULT: '#f97316',   // naranja — energía, inclusión
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          500: '#f97316',
          600: '#ea6a10',
          700: '#c2540a',
          900: '#7c2d12',
        },
        secondary: {
          DEFAULT: '#22c55e',   // verde — crecimiento, esperanza
          50:  '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        accent: {
          DEFAULT: '#3b82f6',   // azul — confianza, profesionalismo
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

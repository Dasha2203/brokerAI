const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'selector',
  content: [
    './src/app/**/*.tsx',
    './src/screens/**/*.tsx',
    './src/components/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
      },
      letterSpacing: {
        tighter: '-.04em',
        tight: '-.02em',
        normal: '0',
        wide: '.02em',
        wider: '.04em',
      },
      screens: {
        xs: '480px',
        sm: '640px',
        md: '720px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      colors: {
        violet: {
          900: '#0D0B21', // dark1
          300: '#464366', // dark5
          400: '#1E1C3A', // dark4
          500: '#1C1A33', // dark3
          600: '#7526D9', // primary light
          700: '#6418C3', // primary dark
          800: '#15132B', // dark2
        },
        gray: {
          100: '#F5F5F5', 
          200: '#C2C2C2',
          300: '#A5A5A5'
        },
        black: '202020',
        yellow: '#FFAB2D',
        ['yellow-soft']: '#FFEBCC',
        red: '#FF4A55',
        green: '#38E25D',
        ['green-soft']: '#D8FFE0'
      },
    },
    boxShadow: {
      sm: '0 1px 2px rgba(0,0,0,0.24)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, .1), 0 10px 10px -5px rgba(0, 0, 0, .04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, .25)',
    },
    dropShadow: {
      sm: '0 1px 1px rgb(0 0 0 / 0.1)',
      DEFAULT: ['0 1px 2px rgb(0 0 0 / 0.1)', '0 1px 1px rgb(0 0 0 / 0.06)'],
      md: ['0 3px 4px rgb(0 0 0 / 0.07)', '0 2px 2px rgb(0 0 0 / 0.06)'],
      lg: ['0 8px 10px rgb(0 0 0 / 0.1)', '0 4px 3px rgb(0 0 0 / 0.1)'],
      xl: ['0 12px 20px rgb(0 0 0 / 0.1)', '0 6px 5px rgb(0 0 0 / 0.08)'],
      '2xl': ['0 16px 24px rgb(0 0 0 / 0.1)', '0 6px 5px rgb(0 0 0 / 0.08)'],
    },
    keyframes: {
      fadeInUp: {
        '0%': {
          transform: 'translateY(20px)',
          opacity: 0
        },
        '100%': {
          transform: 'translateY(0)',
          opacity: 1
        }
      }
    },
    animation: {
      'fadeInUp': 'fadeInUp 250ms ease-in'
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

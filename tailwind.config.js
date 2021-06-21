// module.exports = {
//   purge: [],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {},
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// }
/* eslint @typescript-eslint/no-var-requires: "off" */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
//   mode: 'jit',
  purge: ['./storage/framework/views/*.php', './resources/views/**/*.blade.php', './resources/js/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        // '2xl': '1536px',
        // '2xl': '1365px',
        'fhd': '1920px',
        '2k': '2048px',

    },
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans]
      },
      spacing: {
        '15': '3.75rem',
        '17': '4.25rem',
        '18': '4.5rem'
      }
    }
  },

  variants: {
    extend: {
        fontSize: ['hover'],
        transitionProperty: ['hover']
    }
  },

//   plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography')]
}

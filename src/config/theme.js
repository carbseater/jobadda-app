const {extendTheme} = require('native-base');

export const lightTheme = extendTheme({
  components: {
    Heading: {
      baseStyle: () => {
        return {
          _light: {color: 'red.300'},
          _dark: {color: 'blue.300'},
        };
      },
    },
  },
  colors: {
    // Add new color

    primary: {
      50: '#ff8787',
      100: '#ff6464',
      200: '#fc4444',
      300: '#f62727',
      400: '#f00a0a',
      500: '#d60f0f',
      600: '#bd1313',
      700: '#a51616',
      800: '#8e1818',
      900: '#791919',
    },

    // Redefining only one shade, rest of the color will remain same.
    amber: {
      400: '#d97706',
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'dark',
  },
});

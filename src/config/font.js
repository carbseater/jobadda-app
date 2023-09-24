import {configureFonts, MD3LightTheme} from 'react-native-paper';

export const fontConfig = {
  ios: {
    regular: {
      fontFamily: 'Poppins-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Poppins-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Poppins-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Poppins-Thin',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'Poppins-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Poppins-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Poppins-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Poppins-Thin',
      fontWeight: 'normal',
    },
  },
};

const baseFont = {
  fontFamily: 'Poppins-Regular',
};

const baseVariants = configureFonts({config: baseFont});
export const customVariants = {
  // Customize individual base variants:
  displayMedium: {
    ...baseVariants.displayMedium,
    fontFamily: 'Poppins-Bold',
  },

  // Add own tokens if required:
  bold: {
    ...baseVariants.bodyMedium,
    fontFamily: 'Poppins-Bold',
  },
  italic: {
    ...baseVariants.bodyMedium,
    fontFamily: 'Poppins-Italic',
  },
  boldItalic: {
    ...baseVariants.bodyMedium,
    fontFamily: 'Poppins-BoldItalic',
  },
};
export const fonts = configureFonts({
  config: {
    ...baseVariants,
    ...customVariants,
  },
});

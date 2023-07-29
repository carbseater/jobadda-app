module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
          screens: './src/screens',
          assets: './src/assets',
          constants: './src/constants',
          customHooks: './src/customHooks',
          navigation: './src/navigation',
          components: './src/components',
          formComponents: './src/formComponents',
          localization: './src/localization',
          utils: './src/utils',
          store: './src/store',
        },
      },
    ],
  ],
};

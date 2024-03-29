import { extendTheme } from "native-base";

export const THEME = extendTheme(
  {
    colors: {
      blue: {
        400: '#647AC7',
        800: '#364D9D',
      },
      gray: {
        700: '#F7F7F8',
        600: '#EDECEE',
        500: '#D9D8DA',
        400: '#9F9BA1',
        300: '#5F5B62',
        200: '#3E3A40',
        100: '#1A181B'
      },
      red: {
        400: '#EE7979'
      },
      primary: { 600: "#647AC7"}
    },
    fonts: {
      heading: 'Karla_700Bold',
      body: 'Karla_400Regular',
    },
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
    },
  }
);
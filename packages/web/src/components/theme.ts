import { extendTheme } from "@chakra-ui/react";

export const prittyFont = {
  fontFamily: `"Zen Maru Gothic",-apple-system,sans-serif`,
};

const customTheme = extendTheme({
  fonts: {
    heading: `"Zen Maru Gothic",-apple-system,sans-serif`,
    // body: `"Zen Maru Gothic",-apple-system,sans-serif`,
    // mono: `"Zen Maru Gothic",monospace`,
  },
  fontSizes: {
    // "2xl": "20px",
    // xl: "18px",
    // lg: "16px",
    // md: "14px",
    // sm: "11px",
    // xs: "9px",
  },
  colors: {
    brand: {
      50: "#E8EFF6",
      100: "#DDE6F4",
      200: "#D1DDF1",
      300: "#B9CBEC",
      400: "#A1B9E7",
      500: "#89A6E2",
      600: "#7D97CD",
      700: "#7289BA",
      800: "#687DA9",
      900: "#5F729A",
    },
    primary: {
      50: "#94A9EE",
      100: "#89A0EC",
      200: "#7791E9",
      300: "#6582E6",
      400: "#5373E3",
      500: "#4164E0",
      600: "#3B5BCC",
      700: "#3653B9",
      800: "#314BA8",
      900: "#2D4499",
    },
    danger: {
      50: "#FCF6F8",
      100: "#F7D4DE",
      200: "#F4C3D1",
      300: "#F1B2C4",
      400: "#EB90AA",
      500: "#E56D90",
      600: "#D06383",
      700: "#BD5A77",
      800: "#AC526C",
      900: "#9C4B62",
    },
  },
});

export default customTheme;

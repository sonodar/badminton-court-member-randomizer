import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
    fonts: {
        heading: `"Zen Maru Gothic",-apple-system,sans-serif`,
        body: `"Zen Maru Gothic",-apple-system,sans-serif`,
        mono: `"Zen Maru Gothic",monospace`,
    },
    colors: {
        brand: {
            50: "#D1E3F5",
            100: "#CCE0F4",
            200: "#ACCEEF",
            300: "#99C3EB",
            400: "#85B7E6",
            500: "#71ABE1",
            600: "#5C9DDB",
            700: "#4790D5",
            800: "#4183C2",
            900: "#3B77B0",
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
    },
});

export default customTheme;

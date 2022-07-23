// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    debian: {
      500: "#8e738d",
      600: "#7f677f",
    },
  },
});

export default theme;

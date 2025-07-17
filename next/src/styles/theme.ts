import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: { main: "#060D71" }, // 深ネイビー
    secondary: { main: "#777F8C" }, // スレートグレー
    info: { main: "#D8D8E1" }, // 明るいグレー
    background: { default: "#F5F5F7" }, // 淡いグレー背景
    error: { main: red.A400 },
  },
});

export default theme;

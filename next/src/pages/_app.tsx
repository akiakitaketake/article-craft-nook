import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import * as React from "react";

import createEmotionCache from "@/styles/createEmotionCache";
import Theme from "@/styles/theme";

const clientSideEmotionCache = createEmotionCache();

interface MyappProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function Myapp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyappProps): React.JSX.Element {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

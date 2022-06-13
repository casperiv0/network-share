import type * as React from "react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import "../styles/global.scss";

const toastStyles: React.CSSProperties = {
  maxWidth: "95%",
  padding: "0.5em 0.8em",
  fontSize: "1rem",

  background: "rgba(55, 65, 81, 1)",
  color: "white",
};

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: toastStyles,
          error: {
            style: { fontWeight: 500 },
          },
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default App;

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import Layout from "../components/layout";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

// import * as gtag from "../lib/gtag";
import { AnimatePresence } from "framer-motion";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const toastOptions = {
  position: "bottom-center",
  draggable: false,
  hideProgressBar: true,
  className: "w-full md:max-w-xl",
  toastClassName: "bg-ecru-white rounded-lg text-black px-3 shadow-md",
};

const theme = createTheme({
  typography: {
    fontFamily: ['"Lora"', "serif"].join(","),
  },
  palette: {
    primary: {
      main: "#424242",
    },
    secondary: {
      main: "#424242",
    },
    tertiary: {
      main: "#ffffff",
    },
  },
});

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    // const handleRouteChange = (url) => {
    //   gtag.pageview(url);
    // };
    // router.events.on("routeChangeComplete", handleRouteChange);
    // return () => {
    //   router.events.off("routeChangeComplete", handleRouteChange);
    // };
  }, [router.events]);

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <ThemeProvider theme={theme}>
        <AnimatePresence initial={false} mode="wait">
          {getLayout(<Component {...pageProps} key={router.route} />)}
        </AnimatePresence>
        <ToastContainer {...toastOptions} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;

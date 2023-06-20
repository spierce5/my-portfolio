import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Work_Sans, Bilbo } from "@next/font/google";
import { AnimatePresence } from "framer-motion";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Analytics } from "@vercel/analytics/react";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const bilbo = Bilbo({ subsets: ["latin"], weight: "400" });

const toastOptions = {
  position: "bottom-center",
  draggable: false,
  hideProgressBar: true,
  className: "w-full md:max-w-xl",
  toastClassName: "bg-ecru-white rounded-lg text-black px-3 shadow-md",
}; //s

const theme = createTheme({
  typography: {
    fontFamily: [workSans].join(","),
  },
  palette: {
    primary: {
      main: "#424242",
    },
    secondary: {
      main: "#a1a1aa",
    },
    tertiary: {
      main: "#ffffff",
    },
    neutral: {
      main: "#f4b266",
    },
    opt1: {
      main: "#00447b",
    },
    opt2: {
      main: "#06d6a0",
    },
    opt3: {
      main: "#697ca3",
    },
    opt4: {
      main: "#a9ddd6",
    },
    opt5: {
      main: "#8a89c0",
    },
    opt6: {
      main: "#3e2f5b",
    },
  },
});

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {}, [router.events]);

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <main className={workSans.className}>
        <ThemeProvider theme={theme}>
          <AnimatePresence initial={false} mode="wait">
            {getLayout(<Component {...pageProps} key={router.route} />)}
            <Analytics />
          </AnimatePresence>
          <ToastContainer {...toastOptions} />
        </ThemeProvider>
      </main>
    </>
  );
}

export default MyApp;

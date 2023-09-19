import AppBar from "./AppBar";
import Header from "./Header";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { Container } from "@mui/material";

const motions = {
  default: {
    initial: { opacity: 0, scale: 0.5, y: 0 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: {
      duration: 1,
      delay: 0.3,
      ease: [0, 0.71, 0.2, 1.01],
    },
  },
  resume: {
    initial: { opacity: 1, scale: 1, y: 1000 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: {
      duration: 1,
      delay: 0.3,
      ease: [0, 0.71, 0.2, 1.01],
    },
  },
};

const handler = {
  get: function (target, name) {
    return target.hasOwnProperty(name) ? target[name] : target["default"];
  },
};

const motionProps = new Proxy(motions, handler);

export default function Layout({ metas, children }) {
  const route = children.props.route.replace("/", "");
  return (
    <>
      <main style={{ width: "100vw" }}>
        <Container
          maxWidth={false}
          sx={{
            backgroundColor: "opt1.main",
            paddingTop: ".8rem",
            paddingBottom: ".8rem",
            position: "fixed",
            height: "100vh",
            width: "100vw",
          }}
          disableGutters={false}
        >
          <div
            style={{
              backgroundColor: "white",
              height: "100%",
              width: "100%",
            }}
            className="rounded-lg p-1"
          >
            <motion.div
              style={{
                overflowY: "auto",
                height: "100%",
                width: "100%",
              }}
              initial={{
                opacity: motionProps[route].initial.opacity,
                scale: motionProps[route].initial.opacity,
                y: motionProps[route].initial.y,
              }}
              animate={{
                opacity: motionProps[route].animate.opacity,
                scale: motionProps[route].animate.opacity,
                y: motionProps[route].animate.y,
              }}
              transition={{
                duration: motionProps[route].transition.duration,
                delay: motionProps[route].transition.delay,
                ease: motionProps[route].transition.ease,
              }}
            >
              <Header />
              {children}
            </motion.div>
          </div>
        </Container>
      </main>
    </>
  );
}

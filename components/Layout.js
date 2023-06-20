import AppBar from "./AppBar";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "@mui/material";

export default function Layout({ metas, children }) {
  return (
    <>
      <main>
        <Header />
        <Container disableGutters={false}>
          <div
            className="w-full h-full min-h-screen pt-16"
            style={{
              borderLeft: "solid 5px rgba(0, 33, 99, 0.59)",
              borderRight: "solid 5px rgba(0, 33, 99, 0.59)",
            }}
          >
            {children}
          </div>
        </Container>
      </main>
    </>
  );
}

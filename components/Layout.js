import AppBar from "./AppBar";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "@mui/material";

export default function Layout({ metas, children }) {
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
            <div
              style={{
                overflowY: "scroll",
                height: "100%",
                width: "100%",
              }}
            >
              <Header />
              {children}
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}

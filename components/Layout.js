import AppBar from "./AppBar";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "@mui/material";

export default function Layout({ metas, children }) {
  return (
    <>
      <main>
        <Header />
        <Container className="mt-16" disableGutters={false}>
          {children}
        </Container>
      </main>
    </>
  );
}

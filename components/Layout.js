import AppBar from "./AppBar";
import Footer from "./Footer";

export default function Layout({ metas, children }) {
  return (
    <>
      <AppBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

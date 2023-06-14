import AppBar from "./AppBar";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ metas, children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

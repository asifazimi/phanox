import Navbar from "./MainHeader";
import Footer from "./MainFooter";

const Layout = (props) => {
  return (
    <>
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;

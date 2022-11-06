import Navbar from "./MainHeader";

const Layout = (props) => {
  return (
    <>
      <Navbar />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;

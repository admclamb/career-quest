import { ReactNode } from "react";
import Footer from "./footer/Footer";
import Navbar from "./navbar/navbar";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <header>
        <Navbar />
      </header>
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

import { ReactNode } from "react";
import Footer from "../footer/Footer";

type Props = {
  children?: ReactNode;
};

const LayoutLanding = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutLanding;

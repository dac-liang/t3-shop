import type { FC, ReactNode } from "react";
import Header from "./Header";
// import Footer from './footer';

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

type BaseLayoutProps = {
  children?: ReactNode;
};

export default BaseLayout;

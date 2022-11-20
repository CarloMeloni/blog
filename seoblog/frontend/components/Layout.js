import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="layout-background">
      <div>
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;

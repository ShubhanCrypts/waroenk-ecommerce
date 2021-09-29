import React from "react";
import Navbar from "./NavBar";

function Layout({ children }) {
  return (
    <div className="container">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;

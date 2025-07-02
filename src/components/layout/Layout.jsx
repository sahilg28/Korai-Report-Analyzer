import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-[#F5F3F0]">
    <Header />
    <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
    <Footer />
  </div>
);

export default Layout; 
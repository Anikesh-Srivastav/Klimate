import type { PropsWithChildren } from "react";
import Footer from "./sections/Footer";
import Header from "./sections/Header";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-[#dfdff0] dark:bg-gradient-to-br dark:from-background dark:to-muted">
      <Header />
      <div className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;

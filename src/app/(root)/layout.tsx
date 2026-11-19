import Footer from "@/app/components/shared/Footer";
import Navbar from "@/app/components/shared/Navbar";

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <>
      <main className="flex-1">
        <Navbar />
        {children}
        <Footer />
      </main>
    </>
  );
};

export default RootLayout;

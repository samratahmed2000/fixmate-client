import Navbar from "@/app/components/shared/Navbar";

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <>
      <Navbar />
      <div className="flex-1">{children}</div>
    </>
  );
};

export default RootLayout;

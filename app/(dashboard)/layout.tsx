// import { Header } from "@/components/header";

import Navbar from "@/components/Navbar";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <>
      {/* <Header /> */}
      <Navbar />
      <main 
        // className="px-3 lg:px-14"
      >{children}</main>
    </>
  );
}

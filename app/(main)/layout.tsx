import ModibleHeader from "@/components/ModibleHeader";
import { Sidebar } from "@/components/sidebar";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <ModibleHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px] h-full  lg:pt-0">
        <div className="bg-red-500 h-full">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;

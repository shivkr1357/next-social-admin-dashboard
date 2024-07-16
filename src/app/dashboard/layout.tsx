// import MiniDrawer from "@/components/CustomDrawer/CustomDrawer";
import MiniDrawer from "@/components/Topbar/Topbar";

export default function Layout({ children }: any) {
   return (
      <main>
         <MiniDrawer />
         {children}
      </main>
   );
}

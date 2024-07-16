import MiniDrawer from "@/components/Topbar/Topbar";

export default function Layout({ children }: any) {
   return (
      <>
         <MiniDrawer />
         <main>{children}</main>
      </>
   );
}

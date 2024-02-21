import LoginComponent from "@/components/Login/LoginComponent";
import styles from "./page.module.css";
import MiniDrawer from "@/components/CustomDrawer/CustomDrawer";

export default function Home() {
   return (
      <main className={styles.container}>
         <LoginComponent />
      </main>
   );
}

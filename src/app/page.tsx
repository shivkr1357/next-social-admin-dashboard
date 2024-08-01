"use client";
import LoginComponent from "@/components/Login/LoginComponent";
import styles from "./page.module.css";

export default function Home() {
   return (
      <>
         <main className={styles.container}>
            <LoginComponent />
         </main>
      </>
   );
}

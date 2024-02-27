import LoginComponent from "@/components/Login/LoginComponent";
import styles from "./page.module.css";
import CustomTypography from "@/components/CustomTypography/CustomTypography";

export default function Home() {
   return (
      <main className={styles.container}>
         <CustomTypography
            title='Admin Login'
            fontSize={30}
            color='#fff'
            weight='bold'
         />
         <LoginComponent />
      </main>
   );
}

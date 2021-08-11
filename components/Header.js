import Image from "next/image";
// import { useRouter } from "next/router";
import styles from "./Header.module.css";
import logo from "../assets/logo.svg";

export const Header = () => {
  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <a href="https://www.career.taxi/">
          <Image src={logo} alt="Career Taxi Logo" />
        </a>
        <a href="mailto:rutvij.karkhanis@gmail.com">Email</a>
      </div>
    </div>
  );
};

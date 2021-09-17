import Image from "next/image";
import styles from "./Header.module.css";
import logo from "../public/logo/logo.png";

export const Header = () => {
  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <a href="https://www.career.taxi/">
          <Image src={logo} alt="career taxi logo" width="50px" height="50px" />
        </a>
        <a href="mailto:rutvij.karkhanis@gmail.com">Email</a>
      </div>
    </div>
  );
};

import { NavLink } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export const NotFoundPage = () => {
  return (
    <>
      <h1>Page Not found</h1>
      <NavLink to="/" className={styles.link}>
        Home
      </NavLink>
    </>
  );
};

export default NotFoundPage;

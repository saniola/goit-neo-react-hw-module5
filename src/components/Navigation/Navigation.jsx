import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
        end
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;

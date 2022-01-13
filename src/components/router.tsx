import { Route, Routes } from "react-router-dom";
import styles from "../styles/router.module.css";
import Search from "./search";

export default function Router() {
  return (
    <div className={styles.main}>
      <Routes>
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

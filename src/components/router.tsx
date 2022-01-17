import { Route, Routes } from "react-router-dom";
import Watch from "../routes/watch";
import styles from "../styles/router.module.css";
import Search from "../routes/search";

export default function Router() {
  return (
    <div className={styles.main}>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/watch" element={<Watch />} />
      </Routes>
    </div>
  );
}

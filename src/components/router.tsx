import { Route, Routes } from "react-router-dom";
import Watch from "../routes/watch";
import styles from "../styles/router.module.css";
import Search from "../routes/search";
import Home from "../routes/home";

export default function Router() {
  return (
    <div className={styles.main}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/watch" element={<Watch />} />
      </Routes>
    </div>
  );
}

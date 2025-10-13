import NavBar from "./composites/navBar/NavBar";
import styles from "./App.module.scss";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className={styles["App"]}>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
